using AccountService.Models;
using Microsoft.EntityFrameworkCore;

namespace AccountService.DAO
{
    public class AccountDBContext : DbContext
    {
        public AccountDBContext(DbContextOptions<AccountDBContext> options) : base(options)
        {
        }
        public DbSet<UserModel> Users { get; set; }

    }
}
