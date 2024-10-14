using Microsoft.EntityFrameworkCore;
using PropertyService.DataAccess;
using PropertyService.Models;
using PropertyService.Repository;

namespace PropertyService.Services
{
    public class PropertyServices:IPropertyRepository
    {
        private readonly PropertyDBContext _context;

        public PropertyServices(PropertyDBContext context)
        {
            _context = context; // Use PropertyDBContext directly
        }

        public async Task<IEnumerable<PropertyModel>> GetAllProperties()
        {
            return await _context.Properties.ToListAsync(); // Fetch all properties
        }

        public async Task<PropertyModel> GetPropertyById(int id)
        {
            return await _context.Properties.FindAsync(id); // Find a property by ID
        }

        public async Task AddProperty(PropertyModel property)
        {
            await _context.Properties.AddAsync(property); // Add a new property
            await _context.SaveChangesAsync(); // Save changes to the database
        }

        public async Task UpdateProperty(PropertyModel property)
        {
            _context.Properties.Update(property); // Update the existing property
            await _context.SaveChangesAsync(); // Save changes
        }

        public async Task DeleteProperty(int id)
        {
            var property = await _context.Properties.FindAsync(id);
            if (property != null)
            {
                _context.Properties.Remove(property); // Remove the property
                await _context.SaveChangesAsync(); // Save changes
            }
        }

        public async Task<IEnumerable<PropertyModel>> GetPropertiesByType(string propertyType)
        {
            return await _context.Properties
                .Where(p => p.PropertyType == propertyType)
                .ToListAsync(); // Fetch properties by type
        }
        public async Task<IEnumerable<PropertyModel>> GetPropertiesByUserId(int userId)
        {
            return await _context.Properties
                .Where(p => p.UserId == userId)
                .ToListAsync();
        }
    }
}

   
