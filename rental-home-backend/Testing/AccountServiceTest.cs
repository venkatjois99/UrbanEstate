using NUnit.Framework;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountService.Models;
using AccountService.Services;
using AccountService.DAO;

namespace Account_Service.Tests
{
    [TestFixture]
    public class UserRepoTests
    {
        private AccountDBContext _context;
        private AccountServices _userRepo;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AccountDBContext>()
                .UseInMemoryDatabase(databaseName: "TestUsersDB")
                .Options;

            _context = new AccountDBContext(options);

            // Seed the in-memory database with test data
            SeedDatabase();

            _userRepo = new AccountServices(_context);
        }

        private void SeedDatabase()
        {
            if (!_context.Users.Any())
            {
                var users = new List<UserModel>
                {
                    new UserModel { UserId = 1, UserName = "User1", Email = "user1@example.com",PhoneNumber="123",Password="Admin@12" ,UserRole = "tenant" },
                    new UserModel { UserId = 2, UserName = "Admin", Email = "admin@example.com",PhoneNumber="1234",Password="Adin@12" ,UserRole = "admin" },
                    new UserModel { UserId = 3, UserName = "User2", Email = "user2@example.com",PhoneNumber="1235",Password="Amin@12" ,UserRole = "owner" }
                };

                _context.Users.AddRange(users);
                _context.SaveChanges();
            }
        }

        [TearDown]
        public void TearDown()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Test]
        public async Task GetAllUsersAsync_ShouldReturnAllUsers()
        {
            // Act
            var users = await _userRepo.GetAllUsersService();

            // Assert
            Assert.IsNotNull(users);
            Assert.AreEqual(3, users.Count());
        }

        //[Test]
        //public async Task GetUserByIdAsync_ExistingUserId_ShouldReturnUser()
        //{
        //    // Act
        //    var user = await _userRepo.GetByIdService(1);

        //    // Assert
        //    Assert.IsNotNull(user);
        //    Assert.AreEqual("User1", user.UserName);
        //}

        [Test]
        public async Task GetUserByIdAsync_NonExistentUserId_ShouldReturnNull()
        {
            // Act
            var user = await _userRepo.GetByIdService("99");

            // Assert
            Assert.IsNull(user);
        }

    }
}