using Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Configurations
{
    class FileConfig : IEntityTypeConfiguration<file>
    {
        public void Configure(EntityTypeBuilder<file> builder)
        {
            builder.ToTable("UploadFiles");
            builder.HasKey(x => x.id);
            builder.Property(x => x.id).UseIdentityColumn();
            builder.Property(x => x.isUsed).IsRequired().HasDefaultValue(true);
            builder.Property(x => x.Data)
                .HasColumnType("varbinary(MAX)")
                .IsRequired(false);
            builder.HasOne(x => x.Users)
                .WithMany(s => s.Files)
                .HasForeignKey(g => g.userId);
        }
    }
}
