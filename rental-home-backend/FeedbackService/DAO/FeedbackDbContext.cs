using Microsoft.EntityFrameworkCore;
using FeedbackServices.Models;


namespace FeedbackService.DAO
{
    public class FeedbackDbContext : DbContext
    {
        public FeedbackDbContext(DbContextOptions<FeedbackDbContext> options) : base(options) { }

        public DbSet<Feedback> Feedbacks { get; set; }
    }
}
