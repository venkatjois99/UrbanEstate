using ChatService.DataAccess;
using ChatService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChatService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly ChatDbContext _context;

        public MessagesController(ChatDbContext context)
        {
            _context = context;
        }

        // POST: api/messages
        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] Message message)
        {
            if (message == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            // Return 201 Created with the message object
            return CreatedAtAction(nameof(GetMessageById), new { id = message.Id }, message);
        }

        // GET: api/messages/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Message>> GetMessageById(int id)
        {
            var message = await _context.Messages.FindAsync(id);

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }

        // GET: api/messages/property/{propertyId}/{user1}/{user2}
        [HttpGet("property/{propertyId}/{user1}/{user2}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages(int propertyId, string user1, string user2)
        {
            // Validate user IDs
            if (string.IsNullOrEmpty(user1) || string.IsNullOrEmpty(user2))
            {
                return BadRequest("User IDs cannot be null or empty.");
            }

            var messages = await _context.Messages
                .Where(m => m.PropertyId == propertyId &&
                            ((m.SenderId == user1 && m.ReceiverId == user2) ||
                             (m.SenderId == user2 && m.ReceiverId == user1)))
                .OrderBy(m => m.Timestamp)
                .ToListAsync();

            return Ok(messages);
        }
        // GET: api/messages/mychats/{userId}
        [HttpGet("mychats/{userId}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMyChats(string userId)
        {
            // Validate user ID
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User ID cannot be null or empty.");
            }

            var messages = await _context.Messages
                .Where(m => m.SenderId == userId || m.ReceiverId == userId)
                .OrderByDescending(m => m.Timestamp) // Sort by most recent
                .ToListAsync();

            return Ok(messages);
        }

    }
}
