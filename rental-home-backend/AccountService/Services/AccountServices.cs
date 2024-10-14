using AccountService.DAO;
using AccountService.Models;
using AccountService.Models.ModelsDTO;
using AccountService.Repository;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Http.Metadata;
using Microsoft.EntityFrameworkCore;

namespace AccountService.Services
{
    public class AccountServices : IAccountRepository
    {
        private readonly AccountDBContext _dbContext;
        private readonly IMapper _mapper;

        public AccountServices(AccountDBContext dbContext, IMapper mappingProfile)
        {
            _dbContext = dbContext;
            _mapper = mappingProfile;
        }

        public async Task<IEnumerable<UserDTOModel>> GetAllUsersService()
        {
           var users = await _dbContext.Users.ToListAsync();
           var res = _mapper.Map<IEnumerable<UserDTOModel>>(users);
            return res;

        }

        public async Task<UserDTOModel> LoginUserService(UserLoginModel userLoginModel)
        {
            var validUser = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == userLoginModel.Email && x.Password == userLoginModel.Password);
            if (validUser == null)
            {
                return null;
            }
            var res = _mapper.Map<UserDTOModel>(validUser);
            return res;
        }

        public async Task<UserDTOModel> RegisterUserService(UserModel newUser)
        {
           
            _dbContext.Add<UserModel>(newUser);
            await _dbContext.SaveChangesAsync();
            var mappedUser = _mapper.Map<UserDTOModel>(newUser);

            return mappedUser;
         
        }
        public async Task<UserDTOModel> DeleteUserService(int id)
        {
            var user = _dbContext.Users.FirstOrDefault(x => x.UserId == id);
            if (user == null)
            {
                return null;
            }
            _dbContext.Remove(user);
            await _dbContext.SaveChangesAsync();
            var res = _mapper.Map<UserDTOModel>(user);
            return res;
        }



        public async Task<UserDTOModel> GetByIdService(int id)
        {
         var user= await _dbContext.Users.FirstOrDefaultAsync(x => x.UserId == id);
            return _mapper.Map<UserDTOModel>(user);
        }

        public async Task<string> GetRoleByIdService(int id)
        {
            var res = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserId == id);
            if (res == null)
            {
                return null;
            }

            else if (res.isAdmin)
            {
                return "Admin";
            }
            else if (res.isOwner)
            {
                return "Owner";
            }
            else
            {
                return "Tenant";
            }

        }



        public async Task<string> UpdateOwnerRoleService(int id)
        {
            var res = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserId == id);
            if (res == null)
            {
                return "no user found";
            }
            res.isOwner = true;
            await _dbContext.SaveChangesAsync();
            return "updated role";

        }

        public async Task<UserDTOModel> UpdateUserService(UserDTOModel updatedUser)
        {

            var existingUser = await _dbContext.Users.FirstOrDefaultAsync(x => x.UserId == updatedUser.UserId);


            if (existingUser == null)
            {
                return null;
            }


            existingUser.UserName = updatedUser.UserName;
            
            existingUser.Email = updatedUser.Email;
            existingUser.PhoneNumber = updatedUser.PhoneNumber;
            //existingUser.isAdmin = updatedUser.isAdmin;
            //existingUser.isOwner = updatedUser.isOwner;
            //existingUser.isTenant = updatedUser.isTenant;


            await _dbContext.SaveChangesAsync();
            


            return  _mapper.Map<UserDTOModel>(existingUser);
        }
    }
}
