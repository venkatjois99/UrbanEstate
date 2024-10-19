using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AccountService.DAO;
using AccountService.Models;
using AccountService.Models.ModelsDTO;
using AccountService.Repository;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.AspNetCore.Identity;
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

        public AccountServices(AccountDBContext dbContext, IMapper mapper, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _configuration = configuration;
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
            // Check if the user already exists using UserManager
            var userExist = await _userManager.FindByEmailAsync(newUser.Email);
            if (userExist != null)
            {
                return (400, "User email id already exists"); // User already exists
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
                // Return the first error message if user creation fails
                return (500, string.Join(", ", createdUser.Errors.Select(e => e.Description)));
            }

            // Assign the role if it doesn't exist
            if (!await _roleManager.RoleExistsAsync(newUser.UserRole))
            {
                await _roleManager.CreateAsync(new IdentityRole(newUser.UserRole));
            }

            await _userManager.AddToRoleAsync(user, newUser.UserRole);

            // Add user to the database and save changes
            _dbContext.Add<UserModel>(newUser);
            await _dbContext.SaveChangesAsync();

            return (201, "User registered successfully");
        }

        public async Task<(int, string)> DeleteUserService(string id)
        {
            // Find the user in the database by their ID
            var deleteUser = await _userManager.FindByIdAsync(id);
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
                Expires = DateTime.UtcNow.AddMinutes(3),
                SigningCredentials = new SigningCredentials(authSignKey, SecurityAlgorithms.HmacSha256),
                Subject = new ClaimsIdentity(claims)
            };
            Console.WriteLine(tokenDescriptor);
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }


    }
}
