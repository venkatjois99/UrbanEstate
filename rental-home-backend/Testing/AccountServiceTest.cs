//using Moq;
//using NUnit.Framework;
//using AccountService.Controllers;
//using AccountService.Models.ModelsDTO;
//using AccountService.Repository;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using System.Threading.Tasks;
//using AccountService.Models;

//namespace AccountService.Tests
//{
//    [TestFixture]
//    public class AccountControllerTests
//    {
//        private Mock<IAccountRepository> _mockAccountRepo;
//        private AccountController _controller;

//        [SetUp]
//        public void Setup()
//        {
//            // Arrange: Create the mock repository and the controller
//            _mockAccountRepo = new Mock<IAccountRepository>();
//            _controller = new AccountController(_mockAccountRepo.Object);
//        }

//        #region GetAllUsers Tests

//        [Test]
//        public async Task GetAllUsers_ShouldReturnOkResult_WhenUsersExist()
//        {
//            // Arrange: Mock the service method
//            var mockUsers = new List<UserDTOModel>
//            {
//                new UserDTOModel { UserId = 1, UserName = "User1", Email = "user1@example.com" },
//                new UserDTOModel { UserId = 2, UserName = "User2", Email = "user2@example.com" }
//            };

//            _mockAccountRepo.Setup(repo => repo.GetAllUsersService()).ReturnsAsync(mockUsers);

//            // Act: Call the GetAllUsers action
//            var result = await _controller.GetAllUsers();

//            // Assert: Verify the result
//            var objectResult = result as ObjectResult;  // Cast to ObjectResult (the base type)
//            Assert.IsNotNull(objectResult);
//            Assert.AreEqual(200, objectResult.StatusCode); // Status code 200 OK

//            var users = objectResult.Value as List<UserDTOModel>;
//            Assert.IsNotNull(users);
//            Assert.AreEqual(2, users.Count); // Ensure there are 2 users
//        }

//        [Test]
//        public async Task GetAllUsers_ShouldReturnNotFound_WhenNoUsersExist()
//        {
//            // Arrange: Mock the service method to return an empty list
//            _mockAccountRepo.Setup(repo => repo.GetAllUsersService()).ReturnsAsync(new List<UserDTOModel>());

//            // Act: Call the GetAllUsers action
//            var result = await _controller.GetAllUsers();

//            // Assert: Verify the result
//            var objectResult = result as ObjectResult;  // Cast to ObjectResult (the base type)
//            Assert.IsNotNull(objectResult);
//            Assert.AreEqual(404, objectResult.StatusCode); // Status code 404 Not Found
//            Assert.AreEqual("No users found.", objectResult.Value); // The message should be "No users found."
//        }

//        #endregion

//        #region GetUserById Tests

//        [Test]
//        public async Task GetUserById_ShouldReturnOkResult_WhenUserExists()
//        {
//            // Arrange: Mock the service method
//            var mockUser = new UserDTOModel { UserId = 1, UserName = "User1", Email = "user1@example.com" };
//            _mockAccountRepo.Setup(repo => repo.GetByIdService("1")).ReturnsAsync(mockUser);

//            // Act: Call the GetUserById action
//            var result = await _controller.GetUserById("1");

//            // Assert: Verify the result
//            var objectResult = result as ObjectResult;  // Cast to ObjectResult (the base type)
//            Assert.IsNotNull(objectResult);
//            Assert.AreEqual(200, objectResult.StatusCode); // Status code 200 OK

//            var user = objectResult.Value as UserDTOModel;
//            Assert.IsNotNull(user);
//            Assert.AreEqual("User1", user.UserName); // Ensure the username matches
//        }

//        [Test]
//        public async Task GetUserById_ShouldReturnNotFound_WhenUserDoesNotExist()
//        {
//            // Arrange: Mock the service method to return null
//            _mockAccountRepo.Setup(repo => repo.GetByIdService("99")).ReturnsAsync((UserDTOModel)null);

//            // Act: Call the GetUserById action
//            var result = await _controller.GetUserById("99");

//            // Assert: Verify the result
//            var objectResult = result as ObjectResult;  // Cast to ObjectResult (the base type)
//            Assert.IsNotNull(objectResult);
//            Assert.AreEqual(404, objectResult.StatusCode); // Status code 404 Not Found
//            Assert.AreEqual("User with id 99 not found.", objectResult.Value); // The message should match
//        }

//        #endregion
//    }
//}
