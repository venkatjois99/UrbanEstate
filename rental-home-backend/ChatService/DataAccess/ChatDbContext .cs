using ChatService.Models;
using Microsoft.EntityFrameworkCore;

namespace ChatService.DataAccess
{
    public class ChatDbContext:DbContext
    {
        public ChatDbContext(DbContextOptions<ChatDbContext> options) : base(options) { }

        public DbSet<Message> Messages { get; set; }
    }
}
