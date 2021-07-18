using Application.Exceptions;
using Application.IServices.Users;
using Application.IServices.Users.Dtos;
using Data.EF_DbContext;
using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services.Users
{
    public class UserService : IUserService
    {
        private readonly DemoDbContext _context;
        public UserService(DemoDbContext context)
        {
            _context = context;
        }

        public async Task<UsersView> Create(UsersView request)
        {
            var _user = new user();
            {
                _user.username = request.username;
                _user.password = request.password;
                _user.phone = request.phone;
                _user.email = request.email;
                _user.firt_name = request.firt_name;
                _user.last_name = request.last_name;
            };
            await _context.Users.AddAsync(_user);
            await _context.SaveChangesAsync();
            request.id = _user.id;
            return request;
        }

        public async Task<bool> Delete(int userId)
        {
            var _user = await _context.Users.FindAsync(userId);
            if (_user == null)
            {
                return false;
            }
            _context.Users.Remove(_user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<UsersView>> GetAll()
        {
            var _userAll = await _context.Users.ToListAsync();
            List<UsersView> result = new List<UsersView>();
            foreach (var item in _userAll)
            {
                var temp = new UsersView();
                temp.id = item.id;
                temp.username = item.username;
                temp.password = item.password;
                temp.phone = item.phone;
                temp.email = item.email;
                temp.firt_name = item.firt_name;
                temp.last_name = item.last_name;
                result.Add(temp);
            };
            return result;
        }

        public async Task<PaginatorUserView> GetPaginatorUser(PaginatorUserRequest request)
        {
            var _userAll = await _context.Users.ToListAsync();
            var badRequest = new PaginatorUserView()
            {
                pageTotal = -99999
            };
            if(request.pageSize < 1 || request.pageNumber < 1)
            {
                return badRequest;
            }
            var result = new PaginatorUserView()
            {
                pageNumber = request.pageNumber,
                pageSize = request.pageSize,
                pageTotal = (_userAll.Count + request.pageSize - 1) / request.pageSize,
                pageUsers = new List<UsersView>()
            };           
            if(result.pageNumber > result.pageTotal)
            {
                return badRequest;
            }
            List<UsersView> _usersViews = new List<UsersView>();
            foreach (var item in _userAll)
            {
                var temp = new UsersView();
                temp.id = item.id;
                temp.username = item.username;
                temp.password = item.password;
                temp.phone = item.phone;
                temp.email = item.email;
                temp.firt_name = item.firt_name;
                temp.last_name = item.last_name;
                _usersViews.Add(temp);
            };
            for (int i=(result.pageNumber-1) * result.pageSize; i < Math.Min(result.pageNumber * result.pageSize, _usersViews.Count); ++i)
            {
                result.pageUsers.Add(_usersViews[i]);
            }
            return result;          
        }

        public async Task<bool> UpdateUser(UsersView request)
        {
            user _user = await _context.Users.FindAsync(request.id);
            if(_user == null)
            {
                return false;
            }
            _user.username = request.username;
            _user.password = request.password;
            _user.email = request.email;
            _user.phone = request.phone;
            _user.firt_name = request.firt_name;
            _user.last_name = request.last_name;
            var result = _context.Users.Update(_user);
            await _context.SaveChangesAsync();
            if (result == null)
            {
                return false;
            }
            return true;
        }
    }
}
