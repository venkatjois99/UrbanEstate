using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PropertyService.Models;
using PropertyService.Repository;

using PropertyService.Exceptions; // Include this to use the custom exception

namespace PropertyService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : ControllerBase
    {
        private readonly IPropertyRepository _propertyRepository;

        public PropertyController(IPropertyRepository propertyRepository)
        {
            _propertyRepository = propertyRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PropertyModel>>> GetAllProperties()
        {
            try
            {
                var properties = await _propertyRepository.GetAllProperties();
                return Ok(properties);
            }
            catch (PropertyServiceException ex)
            {
                return StatusCode(ex.StatusCode, new { message = ex.ErrorMessage });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyModel>> GetPropertyById(int id)
        {
            try
            {
                var property = await _propertyRepository.GetPropertyById(id);
                return Ok(property);
            }
            catch (PropertyServiceException ex)
            {
                return StatusCode(ex.StatusCode, new { message = ex.ErrorMessage });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult<(int, string)>> AddProperty([FromBody] PropertyModel property)
        {
            try
            {
                var res = await _propertyRepository.AddProperty(property);
                return CreatedAtAction(nameof(GetPropertyById), new { id = res.Item1 }, new { id = res.Item1, message = "Property created successfully." });
            }
            catch (PropertyServiceException ex)
            {
                return StatusCode(ex.StatusCode, new { message = ex.ErrorMessage });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProperty(int id, [FromBody] PropertyModel property)
        {
            try
            {
                if (id != property.Id)
                {
                    return BadRequest("ID in the URL does not match the ID in the body.");
                }

                await _propertyRepository.UpdateProperty(property);
                return Ok(new { message = "Property updated successfully." });
            }
            catch (PropertyServiceException ex)
            {
                return StatusCode(ex.StatusCode, new { message = ex.ErrorMessage });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProperty(int id)
        {
            try
            {
                await _propertyRepository.DeleteProperty(id);
                return Ok(new { message = "Property deleted successfully." });
            }
            catch (PropertyServiceException ex)
            {
                return StatusCode(ex.StatusCode, new { message = ex.ErrorMessage });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        [HttpGet("type/{propertyType}")]
        public async Task<ActionResult<IEnumerable<PropertyModel>>> GetPropertiesByType(string propertyType)
        {
            try
            {
                var properties = await _propertyRepository.GetPropertiesByType(propertyType);
                return Ok(properties);
            }
            catch (PropertyServiceException ex)
            {
                return StatusCode(ex.StatusCode, new { message = ex.ErrorMessage });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<PropertyModel>>> GetPropertiesByUserId(string userId)
        {
            try
            {
                var properties = await _propertyRepository.GetPropertiesByUserId(userId);
                return Ok(properties);
            }
            catch (PropertyServiceException ex)
            {
                return StatusCode(ex.StatusCode, new { message = ex.ErrorMessage });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }
        }
// GET: api/property/count-by-type
            [HttpGet("count-by-type")]
        public async Task<ActionResult<Dictionary<string, int>>> GetPropertyCountByType()
        {
            var propertyCountByType = await _propertyRepository.GetPropertyCountByType();

            if (propertyCountByType == null || !propertyCountByType.Any())
            {
                return NotFound(); // 404 Not Found
            }

            return Ok(propertyCountByType); // 200 OK
        }


    }
}
  