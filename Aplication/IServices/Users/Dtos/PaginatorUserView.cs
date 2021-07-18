using System;
using System.Collections.Generic;
using System.Text;

namespace Application.IServices.Users.Dtos
{
    public class PaginatorUserView
    {
        public int pageSize { get; set; }
        public int pageNumber { get; set; }
        public int pageTotal {get;set; }
        public List<UsersView> pageUsers { get; set; }
    }
}
