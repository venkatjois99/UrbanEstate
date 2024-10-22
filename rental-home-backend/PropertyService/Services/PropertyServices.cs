using Microsoft.EntityFrameworkCore;
using PropertyService.DataAccess;
using PropertyService.Models;
using PropertyService.Repository;

namespace PropertyService.Services
{
    public class PropertyServices:IPropertyRepository
    {
        private readonly PropertyDBContext _context;

        private readonly IImageRepo _imageRepo;

        public PropertyServices(PropertyDBContext context, IImageRepo imageRepo)
        {
            _context = context;
            _imageRepo = imageRepo;
        }

        public async Task<IEnumerable<PropertyModel>> GetAllProperties()
        {
            return await _context.Properties.ToListAsync(); // Fetch all properties
        }

        public async Task<PropertyModel> GetPropertyById(int id)
        {
            return await _context.Properties.FindAsync(id); // Find a property by ID
        }

        public async Task<(int, string)> AddProperty(PropertyDTOModel property)
        {
            var newProperty = new PropertyModel()
            {
                UserId = property.UserId,
                Title = property.Title,
                PropertyType = property.PropertyType,
                Location = property.Location,
                Address = property.Address,
                Rent = property.Rent,
                Description = property.Description,

                BHKType = property.BHKType,
                Furnishing = property.Furnishing,
                PgSharingType = property.PgSharingType,
                PgLivingType = property.PgLivingType,
                AvailableRooms = property.AvailableRooms,

                SharedBedrooms = property.SharedBedrooms,
                PreferredFlatmate = property.PreferredFlatmate,
                PostingDate = property.PostingDate,
                ImagesUrl = _imageRepo.GenerateImageUrl(property.Images),
                
            };

            await _context.Properties.AddAsync(newProperty); // Add a new property
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
        public async Task<IEnumerable<PropertyModel>> GetPropertiesByUserId(int userId)
        {
            return await _context.Properties
                .Where(p => p.UserId == userId)
                .ToListAsync();
        }
    }
}

   
