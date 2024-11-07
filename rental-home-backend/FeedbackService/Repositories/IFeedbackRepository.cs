using FeedbackServices.Models;

namespace FeedbackService.Repositories
{
    public interface IFeedbackRepository
    {
        Task<Feedback> GetFeedbackByIdAsync(int id);
        Task<IEnumerable<Feedback>> GetAllFeedbacksAsync();
        Task<Feedback> AddFeedbackAsync(Feedback feedback);
        Task<Feedback> UpdateFeedbackAsync(Feedback feedback);
        Task DeleteFeedbackAsync(int id);
    }
}
