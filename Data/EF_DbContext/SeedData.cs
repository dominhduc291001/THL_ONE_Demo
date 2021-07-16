using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.EF_DbContext
{
    public static class SeedData
    {
        public static void Seed(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<user>().HasData(new user() { id = 1, username = "admin", password = "p@ssword", email = "admin@gmail.com", phone = "0123456789",firt_name = "Đỗ", last_name = "Minh Đức" });
        }
    }
}
