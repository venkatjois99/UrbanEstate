using FeedbackServices.Models;
using FeedbackServices.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FeedbackServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService _feedbackService;

        public FeedbackController(IFeedbackService feedbackService)
        {
            _feedbackService = feedbackService;
        }

        // GET: api/feedback
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> GetAllFeedbacks()
        {
            try
            {
                var feedbacks = await _feedbackService.GetAllFeedbacksAsync();
                return Ok(feedbacks);
            }
            catch (Exception ex)
            {
                // Log the exception (logging not implemented here for simplicity)
                return StatusCode(500, "An error occurred while fetching feedbacks. Please try again later.");
            }
        }

        // GET: api/feedback/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Feedback>> GetFeedbackById(String id) // Change Id type to match model
        {
            try
            {
                var feedback = await _feedbackService.GetFeedbackByIdAsync(id);
                if (feedback == null)
                {
                    return NotFound($"Feedback with Id = {id} was not found.");
                }
                return Ok(feedback);
            }
            catch (Exception ex)
            {
                // Log the exception (logging not implemented here for simplicity)
                return StatusCode(500, "An error occurred while fetching the feedback. Please try again later.");
            }
        }

        // POST: api/feedback
        [HttpPost]
        public async Task<ActionResult> AddFeedback([FromBody] Feedback feedback)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid feedback data.");
                }

                await _feedbackService.AddFeedbackAsync(feedback);
                return CreatedAtAction(nameof(GetFeedbackById), new { id = feedback.Id }, feedback);
            }
            catch (Exception ex)
            {
                // Log the exception (logging not implemented here for simplicity)
                return StatusCode(500, "An error occurred while adding feedback. Please try again later.");
            }
        }
    }
}
