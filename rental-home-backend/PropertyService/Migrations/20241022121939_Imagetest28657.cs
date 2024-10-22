using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PropertyService.Migrations
{
    /// <inheritdoc />
    public partial class Imagetest28657 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PropertyType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Rent = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    ImagesUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BHKType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Furnishing = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PgSharingType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PgLivingType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AvailableRooms = table.Column<int>(type: "int", nullable: true),
                    SharedBedrooms = table.Column<int>(type: "int", nullable: true),
                    PreferredFlatmate = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PostingDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Properties");
        }
    }
}
