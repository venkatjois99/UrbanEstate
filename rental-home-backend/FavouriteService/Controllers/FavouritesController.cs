using Azure.Core;
using Azure;
using System.ComponentModel.DataAnnotations;
using FavouriteService.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using static System.Reflection.Metadata.BlobBuilder;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace FavouriteService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavouritesController : ControllerBase
    {
        private readonly IFavouriteRepository _favouriteRepository;

        public FavouritesController(IFavouriteRepository favouriteRepository)
        {
            _favouriteRepository = favouriteRepository;
        }

        // GET: api/favourites/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<List<int>>> GetFavorites(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User ID cannot be null or empty.");
            }

            var favorites = await _favouriteRepository.GetFavorites(userId);
            if (favorites == null || favorites.Count == 0)
            {
                return NotFound($"No favorites found for user ID: {userId}");
            }

            return Ok(favorites);
        }

        // POST: api/favourites
        [HttpPost]
        public async Task<IActionResult> AddFavorite([FromBody] FavouriteRequest request)
        {
            if (request == null)
            {
                return BadRequest("Request body cannot be null.");
            }

            if (string.IsNullOrEmpty(request.UserId) || request.PropertyId <= 0)
            {
                return BadRequest("Invalid request data. User ID and Property ID must be provided.");
            }

            try
            {
                await _favouriteRepository.AddFavorite(request.UserId, request.PropertyId);
                return NoContent(); // 204 No Content
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(500, $"An error occurred while adding the favorite: {ex.Message}");
            }
        }

        // DELETE: api/favourites
        [HttpDelete]
        public async Task<IActionResult> RemoveFavorite([FromBody] FavouriteRequest request)
        {
            if (request == null)
            {
                return BadRequest("Request body cannot be null.");
            }

            if (string.IsNullOrEmpty(request.UserId) || request.PropertyId <= 0)
            {
                return BadRequest("Invalid request data. User ID and Property ID must be provided.");
            }

            try
            {
                await _favouriteRepository.RemoveFavorite(request.UserId, request.PropertyId);
                return NoContent(); // 204 No Content
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Favorite property ID {request.PropertyId} not found for user ID: {request.UserId}.");
            }
            catch (Exception ex)
            {
                // Log the exception (e.g., using a logging framework)
                return StatusCode(500, $"An error occurred while removing the favorite: {ex.Message}");
            }
        }
    }

    // Helper class to handle request body for add/remove favorite actions
    public class FavouriteRequest
    {
        public string UserId { get; set; }
        public int PropertyId { get; set; }
    }
}