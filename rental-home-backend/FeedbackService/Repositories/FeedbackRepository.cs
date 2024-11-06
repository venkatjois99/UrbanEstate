using FeedbackService.DAO;
using FeedbackServices.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeedbackServices.Repositories
{
    // Define the IFeedbackRepository interface
    public interface IFeedbackRepository
    {
        Task<IEnumerable<Feedback>> GetAllFeedbacksAsync();
        Task<Feedback> GetFeedbackByIdAsync(string id);
        Task AddFeedbackAsync(Feedback feedback);
        Task SaveAsync();
    }

    // Implement the FeedbackRepository class
    public class FeedbackRepository : IFeedbackRepository
    {
        private readonly FeedbackDbContext _context;

        public FeedbackRepository(FeedbackDbContext context)
        {
            _context = context;
        }

        // Get all feedbacks
        public async Task<IEnumerable<Feedback>> GetAllFeedbacksAsync()
        {
            return await _context.Feedbacks.ToListAsync();
        }

        // Get a feedback by its ID
        public async Task<Feedback> GetFeedbackByIdAsync(string id)
        {
            return await _context.Feedbacks.FindAsync(id);
        }

        // Add new feedback
        public async Task AddFeedbackAsync(Feedback feedback)
        {
            await _context.Feedbacks.AddAsync(feedback);
        }

        // Save changes to the database
        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}