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
        public async Task<ActionResult<PropertyModel>> AddProperty([FromBody] PropertyModel property)
        {
            if (property == null)
            {
                return BadRequest(); // 400 Bad Request
            }

            await _propertyRepository.AddProperty(property);
            return CreatedAtAction(nameof(GetPropertyById), new { id = property.Id }, property); // 201 Created
        }

        // PUT: api/property/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProperty(int id, [FromBody] PropertyModel property)
        {
            if (id != property.Id)
            {
                return BadRequest(); // 400 Bad Request
            }

            await _propertyRepository.UpdateProperty(property);
            return NoContent(); // 204 No Content
        }

        // DELETE: api/property/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProperty(int id)
        {
            var property = await _propertyRepository.GetPropertyById(id);
            if (property == null)
            {
                return NotFound(); // 404 Not Found
            }

            await _propertyRepository.DeleteProperty(id);
            return NoContent(); // 204 No Content
        }

        // GET: api/property/type/{propertyType}
        [HttpGet("type/{propertyType}")]
        public async Task<ActionResult<IEnumerable<PropertyModel>>> GetPropertiesByType(string propertyType)
         {
            var properties = await _propertyRepository.GetPropertiesByType(propertyType);
            return Ok(properties);
        }
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<PropertyModel>>> GetPropertiesByUserId(int userId)
        {
            var properties = await _propertyRepository.GetPropertiesByUserId(userId);
            if (properties == null || !properties.Any())
            {
                return NotFound();
            }
            return Ok(properties);
        }
    }
}
  