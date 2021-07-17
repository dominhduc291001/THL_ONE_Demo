using Application.IServices.Auth;
using Application.IServices.Auth.Dtos;
using Data.EF_DbContext;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Application.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly DemoDbContext _context;
        public IConfiguration _configuration;
        public AuthService(DemoDbContext context,IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public async Task<LoginView> Login(LoginRequest request)
        {
            LoginView badRequest = new LoginView();
            {
                badRequest.username = null;
            }
            if (request == null)
            {
                return badRequest;
            }
            var _allUser = await _context.Users.ToListAsync();
            var _user = new user();
            {
                _user.username = null;
            }
            foreach (var item in _allUser)
            {
                if(item.username == request.username)
                {
                    _user = item;
                }
            };
            if(_user.username == null)
            {
                return badRequest;
            }
            if(_user.password == request.password)
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub,_configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("username",_user.username),
                    new Claim("phone",_user.phone),
                    new Claim("email",_user.email)
                };
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);
                LoginView result = new LoginView();
                {
                    result.username = _user.username;
                    result.token = new JwtSecurityTokenHandler().WriteToken(token);
                };
                return result;
            }
            else
            {
                return badRequest;
            }
        }
    }
}
