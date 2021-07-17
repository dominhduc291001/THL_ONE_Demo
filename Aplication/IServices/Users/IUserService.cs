using Application.IServices.Users.Dtos;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.IServices.Users
{
    public interface IUserService
    {
        Task<UsersView> Create(UsersView request);
        Task<bool> UpdateUser(UsersView request);
        Task<bool> Delete(int userId);
        Task<List<UsersView>> GetAll();
    }
}
