using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Data.EF_DbContext
{
    public class DemoDbContextFactory : IDesignTimeDbContextFactory<DemoDbContext>
    {
        public DemoDbContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            var connectionString = configuration.GetConnectionString("THL_ONE_DEMO_DB");
            var optionsBuilder = new DbContextOptionsBuilder<DemoDbContext>();
            optionsBuilder.UseSqlServer(connectionString);
            return new DemoDbContext(optionsBuilder.Options);
        }
    }
}
