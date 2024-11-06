using FeedbackServices.Models;
using FeedbackServices.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeedbackServices.Services
{
    // Define the IFeedbackService interface
    public interface IFeedbackService
    {
        Task<IEnumerable<Feedback>> GetAllFeedbacksAsync();
        Task<Feedback?> GetFeedbackByIdAsync(string id); // Use nullable Feedback type
        Task AddFeedbackAsync(Feedback feedback);
    }

    // Implement the FeedbackService class
    public class FeedbackService : IFeedbackService
    {
        private readonly IFeedbackRepository _repository;

        public FeedbackService(IFeedbackRepository repository)
        {
            _repository = repository ?? throw new ArgumentNullException(nameof(repository)); // Ensure repository is not null
        }

        public async Task<IEnumerable<Feedback>> GetAllFeedbacksAsync()
        {
            return await _repository.GetAllFeedbacksAsync();
        }

        public async Task<Feedback?> GetFeedbackByIdAsync(string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                throw new ArgumentException("ID cannot be null or empty", nameof(id));
            }

            // Safely call repository method, expecting id to be non-null here
            return await _repository.GetFeedbackByIdAsync(id);
        }

        public async Task AddFeedbackAsync(Feedback feedback)
        {
            if (feedback == null)
            {
                throw new ArgumentNullException(nameof(feedback), "Feedback cannot be null");
            }

            await _repository.AddFeedbackAsync(feedback);
            await _repository.SaveAsync();
        }
    }
}