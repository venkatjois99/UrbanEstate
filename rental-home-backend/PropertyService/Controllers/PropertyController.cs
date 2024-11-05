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
        public async Task<ActionResult<(int,string)>> AddProperty([FromBody] PropertyModel property)
        {
            if (property == null)
            {
                return BadRequest(); // 400 Bad Request
            }

           var res = await _propertyRepository.AddProperty(property);
            return res ; // 201 Created
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
  