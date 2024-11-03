namespace FavouriteService.Repository
{
    public interface IFavouriteRepository
    {
        Task AddFavorite(string userId, int propertyId);
        Task RemoveFavorite(string userId, int propertyId);
        Task<List<int>> GetFavorites(string userId);
    }
}
