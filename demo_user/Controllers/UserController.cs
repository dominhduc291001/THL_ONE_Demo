using Application.IServices.Users;
using Application.IServices.Users.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace demo_user_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("UsersAll")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _userService.GetAll();
                    if (result != null)
                    {
                        return Ok(result);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return NotFound();
        }

        [HttpPost("GetPaginatorUser")]
        public async Task<IActionResult> GetPaginatorUser(PaginatorUserRequest request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _userService.GetPaginatorUser(request);
                    if(result.pageTotal == -99999)
                    {
                        return BadRequest("Paginator User not found");
                    }
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return NotFound();
        }

        [HttpPost("CreateUser")]

        public async Task<IActionResult> CreateUser(UsersView request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    UsersView result = await _userService.Create(request);
                    if (result != null)
                    {
                        return Created("", result);
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest(new { message = "User create is failed" });
        }

        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(UsersView request) {
            try
            {
                if (ModelState.IsValid)
                {
                    bool result = await _userService.UpdateUser(request);
                    if (result)
                    {
                        return Ok(new { message = "User update is success" });
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            return BadRequest(new { message = "User update  is failed" });
        }

        [HttpDelete("DeleteUser")]

        public async Task<IActionResult> DeleteUserById(int userId)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    bool result = await _userService.Delete(userId);
                    if (result)
                    {
                        return Ok(new { message = "User deleted successfully" });
                    }

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return BadRequest(new { message = "User deleted  is failed" });
        }
    }
}
