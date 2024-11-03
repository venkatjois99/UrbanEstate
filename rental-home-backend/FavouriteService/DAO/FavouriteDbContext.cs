using FavouriteService.Models;
using Microsoft.EntityFrameworkCore;

namespace FavouriteService.DAO
{
    public class FavouriteDbContext : DbContext
    {
        public FavouriteDbContext(DbContextOptions<FavouriteDbContext> options) : base(options) { }

        public DbSet<FavouriteProperty> FavouriteProperties { get; set; }


    }
}