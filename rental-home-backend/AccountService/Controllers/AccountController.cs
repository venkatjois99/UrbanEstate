﻿using AccountService.Exceptions;
using AccountService.Models;
using AccountService.Models.ModelsDTO;
using AccountService.Repository;
using Microsoft.AspNetCore.Authorization;
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
        //[Authorize(Roles = "admin")]
        public async Task<ActionResult<IEnumerable<UserDTOModel>>> GetAllUsers()
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
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("Register")]
        public async Task<ActionResult> RegisterUser([FromBody] UserModel userModel)
        {
            if (userModel == null)
            {
                return BadRequest("User model is null.");
            }

            try
            {
                var (statusCode, message) = await _accountRepository.RegisterUserService(userModel);
                return Ok(message);
            }
            catch (EmailAlreadyExistsException ex)
            {
                return Unauthorized(new { message = ex.Message, errorCode = ex.ErrorCode });
            }
            catch (AccountServiceException ex)
            {
                return StatusCode(ex.StatusCode, new { message = ex.Message, errorCode = ex.ErrorCode });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<UserDTOModel>> GetUserById(string id)
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

        [HttpGet("GetRoleById/{id}")]
        public async Task<ActionResult<string>> GetRoleById(string id)
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

        [HttpDelete("{email}")]
        public async Task<ActionResult> DeleteUser(string email)
        {
            try
            {
                var (statusCode, message) = await _accountRepository.DeleteUserService(email);
                if (statusCode == 404)
                {
                    return NotFound(message);
                }

                return Ok(message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("Login")]
        public async Task<ActionResult> LoginUser([FromBody] UserLoginModel userLogin)
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
                   return Unauthorized(new { message = "Invalid username or password.", errorCode = "AUTH_001" });

                }

                return Ok(res);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPut]
         public async Task<ActionResult> UpdateUser([FromBody] UserDTOModel userModel)
        {
            if (userModel == null)
            {
                return BadRequest("User model is null.");
            }

            try
            {
                var (statusCode, message) = await _accountRepository.UpdateUserService(userModel);
                if (statusCode == 404)
                {
                    return NotFound(message);
                }

                return Ok(message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPut("updateOwnerRole/{id}")]
        public async Task<ActionResult> UpdateOwnerRole(string id)
        {
            try
            {
                var message = await _accountRepository.UpdateOwnerRoleService(id);
                if (message == "No user found")
                {
                    return NotFound(message);
                }

                return Ok(message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword(string Email)
        {
            // Call repository to send password reset email.
            var (statusCode, message) = await _accountRepository.ForgotPassword(Email);
            return StatusCode(statusCode, new { Message = message });
        }

        // Endpoint to reset a user's password.
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel resetPasswordDTO)
        {
            // Validate the model state to ensure all required fields are present.
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Call repository to reset the password with the provided DTO.
            var (statusCode, message) = await _accountRepository.ResetPassword(resetPasswordDTO);
            if (statusCode != 200)
            {
                // Return error if reset fails.
                return StatusCode(statusCode, new { Message = message });
            }
            // Return success message.
            return Ok(new { Message = message });
        }
    }
}