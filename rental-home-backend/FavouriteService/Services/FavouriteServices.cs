using FavouriteService.DAO;
using FavouriteService.Models;
using FavouriteService.Repository;
using Microsoft.EntityFrameworkCore;

namespace FavouriteService.Services
{
    public class FavouriteServices : IFavouriteRepository
    {
        private readonly FavouriteDbContext _context;

        public FavouriteServices(FavouriteDbContext dbContext)
        {
            _context = dbContext;
        }

        public async Task AddFavorite(string userId, int propertyId)
        {
            var favoriteProperty = await _context.FavouriteProperties
                .FirstOrDefaultAsync(fp => fp.UserId == userId);

            if (favoriteProperty == null)
            {
                favoriteProperty = new FavouriteProperty
                {
                    UserId = userId,
                    PropertyIds = new List<int> { propertyId }
                };
                _context.FavouriteProperties.Add(favoriteProperty);
            }
            else
            {
                if (!favoriteProperty.PropertyIds.Contains(propertyId))
                {
                    favoriteProperty.PropertyIds.Add(propertyId);
                }
            }

            await _context.SaveChangesAsync();
        }

        public async Task RemoveFavorite(string userId, int propertyId)
        {
            var favoriteProperty = await _context.FavouriteProperties
                .FirstOrDefaultAsync(fp => fp.UserId == userId);

            if (favoriteProperty != null)
            {
                favoriteProperty.PropertyIds.Remove(propertyId);
                if (!favoriteProperty.PropertyIds.Any())
                {
                    _context.FavouriteProperties.Remove(favoriteProperty);
                }
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<int>> GetFavorites(string userId)
        {
            var favoriteProperty = await _context.FavouriteProperties
                .FirstOrDefaultAsync(fp => fp.UserId == userId);

            return favoriteProperty?.PropertyIds ?? new List<int>();
        }
    }
}

