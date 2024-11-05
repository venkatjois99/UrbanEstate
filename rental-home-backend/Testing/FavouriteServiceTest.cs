using FavouriteService.DAO;
using FavouriteService.Models;
using FavouriteService.Services;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FavouriteService.Tests
{
    public class FavouriteServiceTests
    {
        private FavouriteDbContext _context;
        private FavouriteServices _favouriteService;

        [SetUp]
        public void SetUp()
        {
            // Create an in-memory database for testing
            var options = new DbContextOptionsBuilder<FavouriteDbContext>()
                .UseInMemoryDatabase(databaseName: "FavouriteTestDb")
                .Options;

            _context = new FavouriteDbContext(options);
            _favouriteService = new FavouriteServices(_context);

            // Seed the database with test data
            SeedDatabase();
        }

        // Seed the database with some initial favorite properties data
        private void SeedDatabase()
        {
            _context.FavouriteProperties.AddRange(new List<FavouriteProperty>
            {
                new FavouriteProperty { UserId = "user1", PropertyIds = new List<int> { 1, 2 } },
                new FavouriteProperty { UserId = "user2", PropertyIds = new List<int> { 3 } }
            });

            _context.SaveChanges();
        }

        [Test]
        public async Task GetFavorites_ShouldReturnEmptyList_WhenNoFavoritesExist()
        {
            // Act
            var favorites = await _favouriteService.GetFavorites("user3"); // User that has no favorites

            // Assert
            Assert.IsNotNull(favorites);
            Assert.IsEmpty(favorites); // No favorites for user3
        }

        [Test]
        public async Task GetFavorites_ShouldReturnAllFavoriteProperties_WhenFavoritesExist()
        {
            // Act
            var favorites = await _favouriteService.GetFavorites("user1");

            // Assert
            Assert.IsNotNull(favorites);
            Assert.AreEqual(2, favorites.Count); // User1 should have 2 favorite properties (1 and 2)
            Assert.Contains(1, favorites);
            Assert.Contains(2, favorites);
        }

        [TearDown]
        public void TearDown()
        {
            // Clean up the in-memory database
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }
    }
}
