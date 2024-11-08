using AccountService.Models;
using AccountService.Models.ModelsDTO;

namespace AccountService.Repository
{
    public interface IAccountRepository
    {
        Task<IEnumerable<UserDTOModel>> GetAllUsersService();
        Task<UserDTOModel> GetByIdService(string id);

        Task<(int, string)> RegisterUserService(UserModel userModel);
        Task<string> LoginUserService(UserLoginModel userLoginModel);

        Task<(int, string)> DeleteUserService (string email);
        Task<(int, string)> UpdateUserService(UserDTOModel userModel);

        Task<string> UpdateOwnerRoleService(string id);

        Task<string> GetRoleByIdService(string id);
        Task<(int, string)> ForgotPassword(string email);
        Task<(int, string)> ResetPassword(ResetPasswordModel resetPasswordDTO);

    }
}
