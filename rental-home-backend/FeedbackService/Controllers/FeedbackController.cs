using FeedbackServices.Models;
using FeedbackService.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeedbackServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackRepository _feedbackRepository;

        public FeedbackController(IFeedbackRepository feedbackRepository)
        {
            _feedbackRepository = feedbackRepository; // Fixing the constructor parameter
        }

        // GET: api/feedback
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks()
        {
            var feedbacks = await _feedbackRepository.GetAllFeedbacksAsync();
            return Ok(feedbacks);
        }

        // GET: api/feedback/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Feedback>> GetFeedback(int id)
        {
            var feedback = await _feedbackRepository.GetFeedbackByIdAsync(id);

            if (feedback == null)
            {
                return NotFound();
            }

            return Ok(feedback);
        }

        // POST: api/feedback
        [HttpPost]
        public async Task<ActionResult<Feedback>> CreateFeedback(Feedback feedback)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdFeedback = await _feedbackRepository.AddFeedbackAsync(feedback);

            return CreatedAtAction(nameof(GetFeedback), new { id = createdFeedback.Id }, createdFeedback);
        }

        // PUT: api/feedback/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Feedback>> UpdateFeedback(int id, Feedback feedback)
        {
            if (id != feedback.Id)
            {
                return BadRequest();
            }

            var existingFeedback = await _feedbackRepository.GetFeedbackByIdAsync(id);
            if (existingFeedback == null)
            {
                return NotFound();
            }

            var updatedFeedback = await _feedbackRepository.UpdateFeedbackAsync(feedback);
            return Ok(updatedFeedback);
        }

        // DELETE: api/feedback/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFeedback(int id)
        {
            var existingFeedback = await _feedbackRepository.GetFeedbackByIdAsync(id);
            if (existingFeedback == null)
            {
                return NotFound();
            }

            await _feedbackRepository.DeleteFeedbackAsync(id);
            return NoContent();
        }
    }
}
