using System;
using System.Collections.Generic;
using System.Text;

namespace Application.IServices.Users.Dtos
{
    public class PaginatorUserRequest
    {
        public int pageSize { get; set; }
        public int pageNumber { get; set; }
    }
}
