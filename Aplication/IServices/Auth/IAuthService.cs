using Application.IServices.Auth.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.IServices.Auth
{
    public interface IAuthService
    {
        Task<LoginView> Login(LoginRequest request);
    }
}
