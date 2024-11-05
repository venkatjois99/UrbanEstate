using Microsoft.EntityFrameworkCore;
using PropertyService.DataAccess;
using PropertyService.Models;
using PropertyService.Repository;

namespace PropertyService.Services
{
    public class PropertyServices:IPropertyRepository
    {
        private readonly PropertyDBContext _context;

        //private readonly IImageRepo _imageRepo;

        public PropertyServices(PropertyDBContext context)
        {
            _context = context;
            //_imageRepo = imageRepo;
        }

        public async Task<IEnumerable<PropertyModel>> GetAllProperties()
        {
            return await _context.Properties.ToListAsync(); // Fetch all properties
        }
        public async Task<Dictionary<string, int>> GetPropertyCountByType()
        {
            var properties = await _context.Properties.ToListAsync(); // Assuming you're using Entity Framework
            var propertyCountByType = properties
                .GroupBy(p => p.PropertyType)
                .ToDictionary(g => g.Key, g => g.Count());

            return propertyCountByType;
        }



        public async Task<PropertyModel> GetPropertyById(int id)
        {
            return await _context.Properties.FindAsync(id); // Find a property by ID
        }

        public async Task<(int, string)> AddProperty(PropertyModel property)
        {
            
            await _context.Properties.AddAsync(property); // Add a new property
            await _context.SaveChangesAsync(); // Save changes to the database
            return (200, "success");
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
        public async Task<IEnumerable<PropertyModel>> GetPropertiesByUserId(string userId)
        {
            return await _context.Properties
                .Where(p => p.UserId == userId)
                .ToListAsync();
        }
        public async Task<IEnumerable<PropertyModel>> SearchProperties(PropertySearchParameters searchParameters)
        {
            var query = _context.Properties.AsQueryable();

            // Only apply filters if parameters are provided
            if (!string.IsNullOrWhiteSpace(searchParameters.Location))
            {
                query = query.Where(p => p.Location.Contains(searchParameters.Location));
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.PropertyType))
            {
                query = query.Where(p => p.PropertyType == searchParameters.PropertyType);
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.BhkType))
            {
                query = query.Where(p => p.BHKType == searchParameters.BhkType);
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.PgSharingType))
            {
                query = query.Where(p => p.PgSharingType == searchParameters.PgSharingType);
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.PgLivingType))
            {
                query = query.Where(p => p.PgLivingType == searchParameters.PgLivingType);
            }

            if (!string.IsNullOrWhiteSpace(searchParameters.PreferredFlatmate))
            {
                query = query.Where(p => p.PreferredFlatmate == searchParameters.PreferredFlatmate);
            }
            if (!string.IsNullOrWhiteSpace(searchParameters.Address))
            {
                query = query.Where(p => p.Address.Contains(searchParameters.Address));
            }
            // Apply rent range filters
            if (searchParameters.MinRent.HasValue)
            {
                query = query.Where(p => p.Rent >= searchParameters.MinRent.Value);
            }

            if (searchParameters.MaxRent.HasValue)
            {
                query = query.Where(p => p.Rent <= searchParameters.MaxRent.Value);
            }

            return await query.ToListAsync();
        }

            // Return the filtered results
           
        }

    }


   
