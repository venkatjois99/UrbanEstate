using AccountService.Models;
using AccountService.Models.ModelsDTO;

namespace AccountService.Repository
{
    public interface IAccountRepository
    {
        Task<IEnumerable<UserDTOModel>> GetAllUsersService();
        Task<UserDTOModel> GetByIdService(int id);

        Task<UserDTOModel> RegisterUserService(UserModel userModel);
        Task<UserDTOModel> LoginUserService(UserLoginModel userLoginModel);

        Task<UserDTOModel> DeleteUserService (int id);
        Task<UserDTOModel> UpdateUserService(UserDTOModel userModel);

        Task<string> UpdateOwnerRoleService(int id);

        Task<string> GetRoleByIdService(int id);

    }
}
