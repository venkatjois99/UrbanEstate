﻿using AccountService.Models;
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
        [Authorize(Roles = "admin")]
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
        public async Task<(int,string)> RegisterUser([FromBody] UserModel userModel)
        {
            if (userModel == null)
            {
                return (400,"User model is null.");
            }

            try
            {
                var (statusCode, message) = await _accountRepository.RegisterUserService(userModel);
                if (statusCode == 400)
                {
                    return (statusCode,message);
                }
                else if (statusCode == 201)
                {
                    return (statusCode, message);
                }

                return (statusCode, message);
            }
            catch (Exception ex)
            {
                return (500, ex.Message);
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

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            try
            {
                var (statusCode, message) = await _accountRepository.DeleteUserService(id);
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
    }
}