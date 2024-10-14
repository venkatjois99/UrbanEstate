using AccountService.Models;
using AccountService.Models.ModelsDTO;
using AccountService.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AccountService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepository;

        public AccountController(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserModel>>> GetAllUsers()
        {
            try
            {
                var res = await _accountRepository.GetAllUsersService();

                if (res == null || !res.Any())
                {
                    return NotFound("No users found.");
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                // Log the error (you can use a logging framework here)
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost]
        public async Task<ActionResult> RegisterUser([FromBody] UserModel userModel)
        {
            if (userModel == null)
            {
                return BadRequest("User model is null.");
            }

            try
            {
                var res = await _accountRepository.RegisterUserService(userModel);
                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpGet("GetById")]
        public async Task<ActionResult<UserModel>> GetUserById(int id)
        {
            try
            {
                var res = await _accountRepository.GetByIdService(id);

                if (res == null)
                {
                    return NotFound($"User with id {id} not found.");
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpGet("GetRoleById")]
        public async Task<ActionResult<string>> GetRoleById(int id)
        {
            try
            {
                var res = await _accountRepository.GetRoleByIdService(id);

                if (res == null)
                {
                    return NotFound($"Role for user with id {id} not found.");
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpDelete]
        public async Task<ActionResult<UserModel>> DeleteUser(int id)
        {
            try
            {
                var res = await _accountRepository.DeleteUserService(id);

                if (res == null)
                {
                    return NotFound($"User with id {id} not found.");
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserModel>> LoginUser([FromBody] UserLoginModel userLogin)
        {
            if (userLogin == null)
            {
                return BadRequest("Login model is null.");
            }

            try
            {
                var res = await _accountRepository.LoginUserService(userLogin);

                if (res == null)
                {
                    return Unauthorized("Invalid username or password.");
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPut]
        public async Task<ActionResult<UserModel>> UpdateUser([FromBody] UserDTOModel userModel)
        {
            if (userModel == null)
            {
                return BadRequest("User model is null.");
            }

            try
            {
                var res = await _accountRepository.UpdateUserService(userModel);

                if (res == null)
                {
                    return NotFound($"User with id {userModel.UserId} not found.");
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPut("updateOwnerRole")]
        public async Task<ActionResult<UserModel>> UpdateOwnerRole(int id)
        {
            try
            {
                var res = await _accountRepository.UpdateOwnerRoleService(id);

                if (res == null)
                {
                    return NotFound($"User with id {id} not found.");
                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }

    }
}
