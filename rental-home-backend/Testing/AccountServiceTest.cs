using NUnit.Framework;
using Moq;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AccountService.Models;
using AccountService.Services;
using AccountService.Models.ModelsDTO;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using AccountService.DAO;
using AutoMapper;
using Microsoft.AspNetCore.Http;

namespace Account_Service.Tests
{
    [TestFixture]
    public class UserRepoTests
    {
        private AccountDBContext _context;
        private AccountServices _userRepo;
        private Mock<UserManager<ApplicationUser>> _userManagerMock;
        private Mock<SignInManager<ApplicationUser>> _signInManagerMock;
        private Mock<IMapper> _mapperMock;
        private Mock<IConfiguration> _configurationMock;

        [SetUp]
        public void Setup()
        {
            var options = new DbContextOptionsBuilder<AccountDBContext>()
                .UseInMemoryDatabase(databaseName: "TestUsersDB")
                .Options;

            _context = new AccountDBContext(options);

            // Seed the in-memory database with test data
            SeedDatabase();

            // Mock UserManager
            _userManagerMock = new Mock<UserManager<ApplicationUser>>(
                new Mock<IUserStore<ApplicationUser>>().Object,
                null, null, null, null, null, null, null, null);

            // Mock IHttpContextAccessor
            var httpContextAccessorMock = new Mock<IHttpContextAccessor>();

            // Mock IUserClaimsPrincipalFactory<ApplicationUser>
            var claimsPrincipalFactoryMock = new Mock<IUserClaimsPrincipalFactory<ApplicationUser>>();

            // Mock IOptions<IdentityOptions>
            var identityOptionsMock = new Mock<IOptions<IdentityOptions>>();

            // Mock ILogger<SignInManager<ApplicationUser>>
            var loggerMock = new Mock<ILogger<SignInManager<ApplicationUser>>>();

            // Mock IAuthenticationSchemeProvider
            var authenticationSchemeProviderMock = new Mock<IAuthenticationSchemeProvider>();

            // Mock IUserConfirmation<ApplicationUser> (not directly required for these tests, but needed for the constructor)
            var userConfirmationMock = new Mock<IUserConfirmation<ApplicationUser>>();

            // Create the SignInManager mock using the mocked dependencies
            _signInManagerMock = new Mock<SignInManager<ApplicationUser>>(
                _userManagerMock.Object,
                httpContextAccessorMock.Object,
                claimsPrincipalFactoryMock.Object,
                identityOptionsMock.Object,
                loggerMock.Object,
                authenticationSchemeProviderMock.Object,
                userConfirmationMock.Object
            );

            // Mock IConfiguration for token generation
            _configurationMock = new Mock<IConfiguration>();
            _configurationMock.Setup(x => x["JWT:secret"]).Returns("your_256_bit_secret_key_1234567890123456");  // 128 bits / 16 characters
            _configurationMock.SetupGet(x => x["JWT:validIssuer"]).Returns("your_issuer");
            _configurationMock.SetupGet(x => x["JWT:validAudience"]).Returns("your_audience");

            // Mock IMapper (if needed for mapping entities)
            _mapperMock = new Mock<IMapper>();

            // Initialize AccountServices with mocked dependencies
            _userRepo = new AccountServices(_context, _mapperMock.Object, _userManagerMock.Object, null, _signInManagerMock.Object, _configurationMock.Object, null);
        }


        private void SeedDatabase()
        {
            if (!_context.Users.Any())
            {
                var users = new List<UserModel>
                {
                    new UserModel { UserId = 1, UserName = "User1", Email = "user1@example.com", PhoneNumber = "123", Password = "Admin@12", UserRole = "tenant" },
                    new UserModel { UserId = 2, UserName = "Admin", Email = "admin@example.com", PhoneNumber = "1234", Password = "Admin@12", UserRole = "admin" },
                    new UserModel { UserId = 3, UserName = "User2", Email = "user2@example.com", PhoneNumber = "1235", Password = "Admin@12", UserRole = "owner" },
                    new UserModel { UserId = 4, UserName = "Sagar", Email = "abhi_owner@gmail.com", PhoneNumber = "9999", Password = "Test@123", UserRole = "owner" }
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
            // Arrange: Seed the database with some users (already done in the Setup)
            // The `SeedDatabase()` method is already adding 4 users to the context in your Setup method.

            // Mock the mapping behavior to return a list of UserDTOModel objects
            var userDTOs = new List<UserDTOModel>
    {
        new UserDTOModel { UserId = 1, UserName = "User1", Email = "user1@example.com", PhoneNumber = "123" },
        new UserDTOModel { UserId = 2, UserName = "Admin", Email = "admin@example.com", PhoneNumber = "1234" },
        new UserDTOModel { UserId = 3, UserName = "User2", Email = "user2@example.com", PhoneNumber = "1235" },
        new UserDTOModel { UserId = 4, UserName = "Sagar", Email = "abhi_owner@gmail.com", PhoneNumber = "9999" }
    };

            // Mock the IMapper.Map to map UserModel to UserDTOModel
            _mapperMock.Setup(m => m.Map<IEnumerable<UserDTOModel>>(It.IsAny<IEnumerable<UserModel>>()))
                       .Returns(userDTOs);

            // Act: Call the GetAllUsersService method
            var result = await _userRepo.GetAllUsersService();

            // Assert: Check that the result is not null and contains the expected number of users
            Assert.IsNotNull(result);  // Ensure that the result is not null
            Assert.AreEqual(4, result.Count());  // Ensure that 4 users are returned
            Assert.AreEqual("User1", result.First().UserName);  // Check the first user's name
            Assert.AreEqual("abhi_owner@gmail.com", result.Last().Email);  // Check the last user's email
        }


        [Test]
        public async Task DeleteUserAsync_UserNotFound_ShouldReturnNotFound()
        {
            // Arrange: Try to delete a user with an email that doesn't exist
            var result = await _userRepo.DeleteUserService("99999@example.com"); // Email doesn't exist

            // Assert: Check that the result is 404 Not Found and the correct message
            Assert.AreEqual(404, result.Item1);
            Assert.AreEqual("User not found", result.Item2);
        }

        [Test]
        public async Task LoginUserAsync_ValidCredentials_ShouldReturnToken()
        {
            // Arrange: The test user for login
            var userLoginModel = new UserLoginModel
            {
                Email = "abhi_owner@gmail.com",
                Password = "Test@123"
            };

            // Mock user retrieval from UserManager
            var mockUser = new ApplicationUser
            {
                Email = "abhi_owner@gmail.com",
                Id = "1"
            };
            _userManagerMock.Setup(um => um.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(mockUser);

            // Mock user roles for the user
            var userRoles = new List<string> { "admin", "owner" }; // Add roles as needed
            _userManagerMock.Setup(um => um.GetRolesAsync(mockUser)).ReturnsAsync(userRoles);

            // Mock SignInManager success for valid login
            _signInManagerMock.Setup(sm => sm.PasswordSignInAsync(mockUser, userLoginModel.Password, false, false))
                              .ReturnsAsync(SignInResult.Success);

            // Mock the Token Generation Method with 256-bit key
            _configurationMock.Setup(x => x["JWT:secret"]).Returns("your_256_bit_secret_key_1234567890123456");  // 256 bits / 32 characters
            _configurationMock.Setup(x => x["JWT:validIssuer"]).Returns("your_issuer");
            _configurationMock.Setup(x => x["JWT:validAudience"]).Returns("your_audience");

            // Act: Perform the login with valid credentials
            var token = await _userRepo.LoginUserService(userLoginModel);

            // Assert: Check that a token is returned (token should not be null)
            Assert.IsNotNull(token); // Ensure that the returned token is not null
        }


        [Test]
        public async Task LoginUserAsync_InvalidCredentials_ShouldReturnNull()
        {
            // Arrange: The test user for invalid login
            var userLoginModel = new UserLoginModel
            {
                Email = "sagar_owner@gmail.com",
                Password = "InvalidPassword"
            };

            // Mock user retrieval from UserManager (email exists but wrong password)
            var mockUser = new ApplicationUser
            {
                Email = "sagar_owner@gmail.com",
                Id = "2"
            };
            _userManagerMock.Setup(um => um.FindByEmailAsync(It.IsAny<string>())).ReturnsAsync(mockUser);

            // Mock SignInManager failure (invalid password)
            _signInManagerMock.Setup(sm => sm.PasswordSignInAsync(mockUser, userLoginModel.Password, false, false))
                              .ReturnsAsync(SignInResult.Failed);

            // Act: Perform the login with invalid credentials
            var token = await _userRepo.LoginUserService(userLoginModel);

            // Assert: Check that the result is null for invalid credentials
            Assert.IsNull(token);
        }
    }
}
