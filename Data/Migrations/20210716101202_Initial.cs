using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(maxLength: 50, nullable: false),
                    password = table.Column<string>(nullable: false),
                    email = table.Column<string>(nullable: false),
                    firt_name = table.Column<string>(nullable: true),
                    last_name = table.Column<string>(nullable: true),
                    phone = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "UploadFiles",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    userId = table.Column<int>(nullable: false),
                    fileName = table.Column<string>(nullable: true),
                    fileType = table.Column<string>(nullable: true),
                    data = table.Column<byte[]>(type: "varbinary(MAX)", nullable: true),
                    isUsed = table.Column<bool>(nullable: false, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UploadFiles", x => x.id);
                    table.ForeignKey(
                        name: "FK_UploadFiles_Users_userId",
                        column: x => x.userId,
                        principalTable: "Users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "id", "email", "firt_name", "last_name", "password", "phone", "username" },
                values: new object[] { 1, "admin@gmail.com", "Đỗ", "Minh Đức", "p@ssword", "0123456789", "admin" });

            migrationBuilder.CreateIndex(
                name: "IX_UploadFiles_userId",
                table: "UploadFiles",
                column: "userId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_email",
                table: "Users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Users_username",
                table: "Users",
                column: "username",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UploadFiles");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
