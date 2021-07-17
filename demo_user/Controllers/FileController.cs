using Application.IServices.Files;
using Application.IServices.Files.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace demo_user_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;
        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpGet("FilesAll")]
        public async Task<IActionResult> GetAllFiles()
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _fileService.GetAllFile();
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
            return NotFound();
        }

        [HttpGet("GetFilesByUserId")]
        public async Task<IActionResult> GetFilesByUserId(int request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _fileService.GetFilesByUser(request);
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
            return NotFound();
        }

        [HttpPost("CreateFile")]
        public async Task<IActionResult> CreateUser(FileView request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    FileView result = await _fileService.CreateFile(request);
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
            return BadRequest(new { message = "File create is failed" });
        }

    }
}
