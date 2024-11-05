using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using PropertyService.DataAccess;
using PropertyService.Models;
using PropertyService.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PropertyService.Tests
{
    public class PropertyServiceTests
    {
        private PropertyDBContext _context;
        private PropertyServices _service;

        [SetUp]
        public void SetUp()
        {
            // Create an in-memory database for testing
            var options = new DbContextOptionsBuilder<PropertyDBContext>()
                .UseInMemoryDatabase(databaseName: "PropertyTestDb")
                .Options;

            _context = new PropertyDBContext(options);
            _service = new PropertyServices(_context);

            // Seed the database with test data
            SeedDatabase();
        }

        // Seed the database with some initial property data
        private void SeedDatabase()
        {
            _context.Properties.AddRange(new List<PropertyModel>
            {
                new PropertyModel
                {
                    Id = 1,
                    UserId = "user1",
                    Title = "Cozy Apartment",
                    PropertyType = "Apartment",
                    Location = "Downtown",
                    Address = "123 Main St",
                    Rent = 1000,
                    Description = "A cozy apartment in the city center.",
            
                    BHKType = "2BHK",
                    Furnishing = "Semi-Furnished",
                    PgSharingType = null,
                    PgLivingType = null,
                    AvailableRooms = 1,
                    SharedBedrooms = 0,
                    PreferredFlatmate = "None",
                    PostingDate = DateTime.UtcNow
                },
                new PropertyModel
                {
                    Id = 2,
                    UserId = "user2",
                    Title = "Spacious House",
                    PropertyType = "House",
                    Location = "Suburbs",
                    Address = "456 Oak St",
                    Rent = 2500,
                    Description = "A large house with a backyard.",
                   
                    BHKType = "3BHK",
                    Furnishing = "Fully Furnished",
                    PgSharingType = null,
                    PgLivingType = null,
                    AvailableRooms = 3,
                    SharedBedrooms = 1,
                    PreferredFlatmate = "Male",
                    PostingDate = DateTime.UtcNow
                },
                new PropertyModel
                {
                    Id = 3,
                    UserId = "user1",
                    Title = "PG for Rent",
                    PropertyType = "PG",
                    Location = "Near College",
                    Address = "789 College Rd",
                    Rent = 500,
                    Description = "PG accommodation available for students.",
               
                    BHKType = null,
                    Furnishing = "Partially Furnished",
                    PgSharingType = "Shared",
                    PgLivingType = "Boys",
                    AvailableRooms = 2,
                    SharedBedrooms = 1,
                    PreferredFlatmate = "Student",
                    PostingDate = DateTime.UtcNow
                }
            });
            _context.SaveChanges();
        }

        // 1. Get All Properties
        [Test]
        public async Task GetAllProperties_ShouldReturnAllProperties()
        {
            // Act
            var properties = await _service.GetAllProperties();

            // Assert
            Assert.IsNotNull(properties);
            Assert.AreEqual(3, properties.Count());  // Expecting 3 properties in the database
        }

        // 2. Get Property By ID
        [Test]
        public async Task GetPropertyById_ShouldReturnProperty_WhenPropertyExists()
        {
            // Act
            var property = await _service.GetPropertyById(1);

            // Assert
            Assert.IsNotNull(property);
            Assert.AreEqual(1, property.Id);  // Checking if the property ID matches
            Assert.AreEqual("Cozy Apartment", property.Title);
        }

        [Test]
        public async Task GetPropertyById_ShouldReturnNull_WhenPropertyDoesNotExist()
        {
            // Act
            var property = await _service.GetPropertyById(99);  // Property ID that doesn't exist

            // Assert
            Assert.IsNull(property);  // Should return null as no property with ID 99 exists
        }

        // 3. Get Properties by Type (e.g., "Apartment")
        [Test]
        public async Task GetPropertiesByType_ShouldReturnPropertiesOfGivenType()
        {
            // Act
            var properties = await _service.GetPropertiesByType("Apartment");

            // Assert
            Assert.IsNotNull(properties);
            Assert.AreEqual(1, properties.Count());  // Expecting only one apartment in the database
            Assert.IsTrue(properties.All(p => p.PropertyType == "Apartment"));
        }

        [Test]
        public async Task GetPropertiesByType_ShouldReturnEmpty_WhenNoPropertiesOfGivenType()
        {
            // Act
            var properties = await _service.GetPropertiesByType("Condo");

            // Assert
            Assert.IsNotNull(properties);
            Assert.IsEmpty(properties);  // No "Condo" properties should exist
        }

        // 4. Get Properties by User ID
        [Test]
        public async Task GetPropertiesByUserId_ShouldReturnPropertiesForGivenUser()
        {
            // Act
            var properties = await _service.GetPropertiesByUserId("user1");

            // Assert
            Assert.IsNotNull(properties);
            Assert.AreEqual(2, properties.Count());  // Expecting 2 properties for user1
            Assert.IsTrue(properties.All(p => p.UserId == "user1"));
        }

        [Test]
        public async Task GetPropertiesByUserId_ShouldReturnEmpty_WhenUserHasNoProperties()
        {
            // Act
            var properties = await _service.GetPropertiesByUserId("user3");  // User3 doesn't exist in DB

            // Assert
            Assert.IsNotNull(properties);
            Assert.IsEmpty(properties);  // Should return an empty list for user3
        }

        // 5. Get Property Count by Type
        [Test]
        public async Task GetPropertyCountByType_ShouldReturnCorrectCountByType()
        {
            // Act
            var propertyCountByType = await _service.GetPropertyCountByType();

            // Assert
            Assert.IsNotNull(propertyCountByType);
            Assert.AreEqual(1, propertyCountByType["Apartment"]);  // 1 Apartment in the DB
            Assert.AreEqual(1, propertyCountByType["House"]);  // 1 House in the DB
            Assert.AreEqual(1, propertyCountByType["PG"]);  // 1 PG in the DB
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
