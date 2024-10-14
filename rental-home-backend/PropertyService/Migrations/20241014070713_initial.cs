using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PropertyService.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
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
                    PropertyType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Rent = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Images = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BHKType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Furnishing = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PgType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AvailableRooms = table.Column<int>(type: "int", nullable: true),
                    Meals = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
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
