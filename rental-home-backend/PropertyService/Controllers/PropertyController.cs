using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PropertyService.Models;
using PropertyService.Repository;

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

        // GET: api/property
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PropertyModel>>> GetAllProperties()
        {
            var properties = await _propertyRepository.GetAllProperties();
            return Ok(properties);
        }

        // GET: api/property/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyModel>> GetPropertyById(int id)
        {
            var property = await _propertyRepository.GetPropertyById(id);
            if (property == null)
            {
                return NotFound(); // 404 Not Found
            }
            return Ok(property); // 200 OK
        }

        // POST: api/property
        [HttpPost]
        public async Task<ActionResult<(int, string)>> AddProperty([FromBody] PropertyModel property)
        {
            if (property == null)
            {
                return BadRequest(new { message = "Invalid property data." }); // 400 Bad Request with message
            }

            var res = await _propertyRepository.AddProperty(property);

            // Assuming res contains the property ID, we return the ID and a success message.
            return CreatedAtAction(nameof(GetPropertyById), new { id = res.Item1 }, new { id = res.Item1, message = "Property created successfully." });
        }


        // PUT: api/property/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProperty(int id, [FromBody] PropertyModel property)
        {
            if (id != property.Id)
            {
                return BadRequest("ID in the URL does not match the ID in the body.");
            }

            await _propertyRepository.UpdateProperty(property);

            // Return a success message with HTTP 200 OK
            return Ok(new { message = "Property updated successfully." });
        }

        // DELETE: api/property/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProperty(int id)
        {
            var property = await _propertyRepository.GetPropertyById(id);
            if (property == null)
            {
                return NotFound(new { message = "Property not found." }); // 404 Not Found with a message
            }

            await _propertyRepository.DeleteProperty(id);

            // Return a success message with HTTP 200 OK
            return Ok(new { message = "Property deleted successfully." });
        }

        // GET: api/property/type/{propertyType}
        [HttpGet("type/{propertyType}")]
        public async Task<ActionResult<IEnumerable<PropertyModel>>> GetPropertiesByType(string propertyType)
         {
            var properties = await _propertyRepository.GetPropertiesByType(propertyType);
            return Ok(properties);
        }
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<PropertyModel>>> GetPropertiesByUserId(string userId)
        {
            var properties = await _propertyRepository.GetPropertiesByUserId(userId);
            if (properties == null || !properties.Any())
            {
                return NotFound();
            }
            return Ok(properties);
        }
        // GET: api/property/search
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<PropertyModel>>> SearchProperties([FromQuery] PropertySearchParameters searchParameters)
        {
            var properties = await _propertyRepository.SearchProperties(searchParameters);
            if (properties == null || !properties.Any())
            {
                return NotFound(); // 404 Not Found
            }
            return Ok(properties); // 200 OK
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
  