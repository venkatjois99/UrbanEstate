using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PropertyService.Migrations
{
    /// <inheritdoc />
    public partial class LatLng : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MapCord",
                table: "Properties",
                newName: "LatLng");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LatLng",
                table: "Properties",
                newName: "MapCord");
        }
    }
}
