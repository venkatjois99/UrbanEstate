using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AccountService.DAO;
using AccountService.Exceptions;
using AccountService.Models;
using AccountService.Models.ModelsDTO;
using AccountService.Repository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace AccountService.Services
{
    public class AccountServices : IAccountRepository
    {
        private readonly AccountDBContext _dbContext;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailSender _emailSender;
        public AccountServices(AccountDBContext dbContext, IMapper mapper, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, IEmailSender emailSender)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _emailSender = emailSender;
        }

        public AccountServices(AccountDBContext context)
        {
            _dbContext = context;
        }
        public async Task<IEnumerable<UserDTOModel>> GetAllUsersService()
        {
            var users = await _dbContext.Users.ToListAsync();
            var res = _mapper.Map<IEnumerable<UserDTOModel>>(users);
            return res;
        }

        public async Task<string> LoginUserService(UserLoginModel userLoginModel)
        {
            var user = await _userManager.FindByEmailAsync(userLoginModel.Email);
            // Use SignInManager to validate user and sign in
            var result = await _signInManager.PasswordSignInAsync(user, userLoginModel.Password, isPersistent: false, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return null; // Invalid credentials
            }
            else
            {
                var authClaims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Email,user.Email),
                        new Claim(ClaimTypes.NameIdentifier, user.Id),
                        new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                    };
                var userRoles = await _userManager.GetRolesAsync(user);
                foreach (var role in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, role));
                }
                string token = GenerateToken(authClaims);
                return (token);
            }
        }

        public async Task<(int, string)> RegisterUserService(UserModel newUser)
        {
            var userExist = await _userManager.FindByEmailAsync(newUser.Email);
            if (userExist != null)
            {
                throw new EmailAlreadyExistsException("User email already exists");
            }

            // Create a new ApplicationUser and add to the UserManager
            ApplicationUser user = new ApplicationUser()
            {
                UserName = newUser.UserName,
                Email = newUser.Email,
                AppUserName = newUser.UserName,
                SecurityStamp = Guid.NewGuid().ToString(),
            };

            var createdUser = await _userManager.CreateAsync(user, newUser.Password);
            if (!createdUser.Succeeded)
            {
                throw new InternalServerErrorException("Error creating user: " + string.Join(", ", createdUser.Errors.Select(e => e.Description)));
            }

            // Assign the role
            if (!await _roleManager.RoleExistsAsync(newUser.UserRole))
            {
                await _roleManager.CreateAsync(new IdentityRole(newUser.UserRole));
            }

            await _userManager.AddToRoleAsync(user, newUser.UserRole);

            _dbContext.Add<UserModel>(newUser);
            await _dbContext.SaveChangesAsync();

            return (201, "User registered successfully");
        }

        public async Task<(int, string)> DeleteUserService(string email)
        {
            // Find the user in the database by their ID
            var deleteUser = await _userManager.FindByEmailAsync(email);
            if (deleteUser == null) 
            {
                return (404, "User not found"); // Return 404 if the user is not found
            }
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == deleteUser.Email);
           

            // Remove the user from the UserManager if they exist
            var applicationUser = await _userManager.FindByEmailAsync(user.Email);
            if (applicationUser != null)
            {
                var result = await _userManager.DeleteAsync(applicationUser);
                if (!result.Succeeded)
                {
                    return (500, "Error deleting user from UserManager"); // Return error if deletion fails
                }
            }

            // Remove the user from the database
            _dbContext.Remove(user);
            await _dbContext.SaveChangesAsync();

            return (200, "User deleted successfully"); // Return 200 when the user is deleted
        }
        public async Task<UserDTOModel> GetByIdService(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return null;
            }
            var res = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == user.Email);
            return _mapper.Map<UserDTOModel>(res);
        }

        public async Task<string> GetRoleByIdService(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return null; // User not found
            }

            var applicationUser = await _userManager.FindByEmailAsync(user.Email);
            if (applicationUser != null)
            {
                var roles = await _userManager.GetRolesAsync(applicationUser);
                return roles.FirstOrDefault(); // Assuming a single role
            }

            return null;
        }

        public async Task<string> UpdateOwnerRoleService(string id)
        {
            var email = await _userManager.FindByIdAsync(id);
            if (email == null)
            {
                return "No user found"; // User not found
            }
            var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email.Email);
           

            var applicationUser = await _userManager.FindByEmailAsync(user.Email);
            if (applicationUser != null)
            {
                // Remove current roles
                var currentRoles = await _userManager.GetRolesAsync(applicationUser);
                await _userManager.RemoveFromRolesAsync(applicationUser, currentRoles);

                // Assign the "owner" role
                if (!await _roleManager.RoleExistsAsync("owner"))
                {
                    await _roleManager.CreateAsync(new IdentityRole("owner"));
                }
                await _userManager.AddToRoleAsync(applicationUser, "owner");

                user.UserRole = "owner";
                await _dbContext.SaveChangesAsync();
            }

            return "Updated role";
        }

        public async Task<(int, string)> UpdateUserService(UserDTOModel updatedUser)
        {
            var existingUser = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserId == updatedUser.UserId);
            if (existingUser == null)
            {
                return (404, "User not found"); // Return 404 if the user is not found
            }

            // Update user details
            existingUser.UserName = updatedUser.UserName;
            existingUser.Email = updatedUser.Email;
            existingUser.PhoneNumber = updatedUser.PhoneNumber;

            // Save changes to the database
            await _dbContext.SaveChangesAsync();

            return (200, "User updated successfully"); // Return 200 when the update is successful
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var authSignKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:secret"]));
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration["JWT:validIssuer"],
                Audience = _configuration["JWT:validAudience"],
                Expires = DateTime.UtcNow.AddMinutes(20),
                SigningCredentials = new SigningCredentials(authSignKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };
            Console.WriteLine(tokenDescriptor);
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<(int, string)> ForgotPassword(string email)
        {
            // Find the user in the Identity system by their email address.
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return (404, "User not found.");
            }
            // Generate a password reset token for the user.
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            // Construct the reset link URL containing the token and email.
            var resetLink = $" http://localhost:5173/resetpassword?token={(token)}&email={email}";
            // Send an email with the reset link to the user's email address.
            await _emailSender.SendEmailAsync(email, "Password Reset Request",
                $"Please reset your password by clicking this link: <a href={resetLink}>Reset Password</a>");
            // Return a success response indicating that the reset link has been sent.
            return (200, ("Password reset link has been sent to your email."));
        }
        public async Task<(int, string)> ResetPassword(ResetPasswordModel resetPasswordDTO)
        {
            //step1: Find the user in Identity by their email to reset their Identity password.
            var user = await _userManager.FindByEmailAsync(resetPasswordDTO.Email);
            if (user == null)
            {
                return (404, "User not found.");
            }

            // Step 2: Find user in custom user table
            var customUser = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == resetPasswordDTO.Email);
            if (customUser == null)
            {
                return (404, "User not found in custom user table.");
            }

            // Step 3: Check if the new password is the same as the current one (no hashing for custom table)
            if (customUser.Password == resetPasswordDTO.NewPassword)
            {
                return (400, "New password cannot be the same as the current password.");
            }

            // Step 4: Reset password using the token in Identity Table
            var result = await _userManager.ResetPasswordAsync(user, resetPasswordDTO.Token, resetPasswordDTO.NewPassword);
            if (!result.Succeeded)
            {
                return (500, string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            // Update password in the custom user table (plain text)
            var customTableUpdateResult = await UpdateCustomUserPasswordAsync(customUser, resetPasswordDTO.NewPassword);
            if (!customTableUpdateResult)
            {
                return (500, "Error updating password in custom user table.");
            }
            // Return success message if all updates succeed.
            return (200, "Password has been successfully reset.");
        }


        public async Task<bool> UpdateCustomUserPasswordAsync(UserModel user, string newPassword)
        {
            //Assign the new password to the user.
            user.Password = newPassword;
            // Update the user record in the database with the new password and Save changes to the database.
            _dbContext.Users.Update(user);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}
