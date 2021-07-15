using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Configurations
{
    public class UserConfig :IEntityTypeConfiguration<user>
    {
        public void Configure(EntityTypeBuilder<user> builder)
        {
            builder.ToTable("Users");
            builder.HasKey(x => x.id);
            builder.Property(x => x.id).UseIdentityColumn();
            builder.Property(x => x.username)
                .IsRequired()
                .HasMaxLength(50);
            builder.HasIndex(x => x.username).IsUnique();
            builder.HasIndex(x => x.email).IsUnique();
            builder.Property(x => x.password).IsRequired();
            builder.Property(x => x.email).IsRequired();
            builder.HasMany<file>(s => s.Files)
                .WithOne(x => x.Users)
                .HasForeignKey(g => g.userId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
