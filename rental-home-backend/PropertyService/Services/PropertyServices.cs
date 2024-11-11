using Microsoft.EntityFrameworkCore;
using PropertyService.DataAccess;
using PropertyService.Models;
using PropertyService.Repository;

using PropertyService.Exceptions; // Include this to use the custom exception

namespace PropertyService.Services
{
    public class PropertyServices : IPropertyRepository
    {
        private readonly PropertyDBContext _context;

        public PropertyServices(PropertyDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PropertyModel>> GetAllProperties()
        {
            try
            {
                return await _context.Properties.ToListAsync(); // Fetch all properties
            }
            catch (Exception ex)
            {
                throw new PropertyServiceException("An error occurred while fetching properties.", ex, 500);
            }
        }

        public async Task<PropertyModel> GetPropertyById(int id)
        {
            try
            {
                var property = await _context.Properties.FindAsync(id);
                if (property == null)
                {
                    throw new PropertyServiceException($"Property with ID {id} not found.", 404);
                }
                return property;
            }
            catch (Exception ex)
            {
                throw new PropertyServiceException("An error occurred while fetching the property.", ex, 500);
            }
        }

        public async Task<(int, string)> AddProperty(PropertyModel property)
        {
            try
            {
                await _context.Properties.AddAsync(property);
                await _context.SaveChangesAsync();
                return (200, "Property added successfully.");
            }
            catch (Exception ex)
            {
                throw new PropertyServiceException("An error occurred while adding the property.", ex, 500);
            }
        }

        public async Task UpdateProperty(PropertyModel property)
        {
            try
            {
                _context.Properties.Update(property);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PropertyServiceException("An error occurred while updating the property.", ex, 500);
            }
        }

        public async Task DeleteProperty(int id)
        {
            try
            {
                var property = await _context.Properties.FindAsync(id);
                if (property == null)
                {
                    throw new PropertyServiceException($"Property with ID {id} not found.", 404);
                }

                _context.Properties.Remove(property);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PropertyServiceException("An error occurred while deleting the property.", ex, 500);
            }
        }

        public async Task<IEnumerable<PropertyModel>> GetPropertiesByType(string propertyType)
        {
            try
            {
                return await _context.Properties
                    .Where(p => p.PropertyType == propertyType)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new PropertyServiceException("An error occurred while fetching properties by type.", ex, 500);
            }
        }

        public async Task<IEnumerable<PropertyModel>> GetPropertiesByUserId(string userId)
        {
            try
            {
                return await _context.Properties
                    .Where(p => p.UserId == userId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                throw new PropertyServiceException("An error occurred while fetching properties for the user.", ex, 500);
            }
        }

        public async Task<IEnumerable<PropertyModel>> SearchProperties(PropertySearchParameters searchParameters)
        {
            try
            {
                var query = _context.Properties.AsQueryable();

                if (!string.IsNullOrWhiteSpace(searchParameters.Location))
                {
                    query = query.Where(p => p.Location.Contains(searchParameters.Location));
                }
                // Add other filters here...

                return await query.ToListAsync();
            }
            catch (Exception ex)
            {
                throw new PropertyServiceException("An error occurred while searching for properties.", ex, 500);
            }
        }

        public async Task<Dictionary<string, int>> GetPropertyCountByType()
        {
            var properties = await _context.Properties.ToListAsync(); // Assuming you're using Entity Framework
            var propertyCountByType = properties
                .GroupBy(p => p.PropertyType)
                .ToDictionary(g => g.Key, g => g.Count());

            return propertyCountByType;
        }
    }
}



