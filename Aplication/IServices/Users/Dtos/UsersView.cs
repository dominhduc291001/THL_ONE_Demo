using System;
using System.Collections.Generic;
using System.Text;

namespace Application.IServices.Users.Dtos
{
    public class UsersView
    {
        public int id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public string firt_name { get; set; }
        public string last_name { get; set; }
        public string phone { get; set; }
    }
}
