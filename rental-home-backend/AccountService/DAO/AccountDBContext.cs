using AccountService.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AccountService.DAO
{
    public class AccountDBContext : IdentityDbContext<ApplicationUser>
    {
        public AccountDBContext(DbContextOptions<AccountDBContext> options) : base(options)
        {
        }
        public DbSet<UserModel> Users { get; set; }

    }
}
