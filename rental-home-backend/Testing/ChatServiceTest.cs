using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatService.Controllers;
using ChatService.DataAccess;
using ChatService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace ChatService.Tests
{
    public class MessagesControllerTests
    {
        private ChatDbContext _context;
        private MessagesController _controller;

        [SetUp]
        public void SetUp()
        {
            // Create an in-memory database for testing
            var options = new DbContextOptionsBuilder<ChatDbContext>()
                .UseInMemoryDatabase(databaseName: "ChatTestDb")
                .Options;

            _context = new ChatDbContext(options);
            _controller = new MessagesController(_context);

            // Seed the database with test data
            SeedDatabase();
        }

        private void SeedDatabase()
        {
            _context.Messages.AddRange(new List<Message>
            {
                new Message
                {
                    Id = 1,
                    SenderId = "user1",
                    SenderName = "User One",
                    ReceiverId = "user2",
                    PropertyId = 101,
                    Content = "Hello User Two!",
                    Timestamp = DateTime.UtcNow.AddMinutes(-5)
                },
                new Message
                {
                    Id = 2,
                    SenderId = "user2",
                    SenderName = "User Two",
                    ReceiverId = "user1",
                    PropertyId = 101,
                    Content = "Hi User One!",
                    Timestamp = DateTime.UtcNow
                },
                new Message
                {
                    Id = 3,
                    SenderId = "user3",
                    SenderName = "User Three",
                    ReceiverId = "user1",
                    PropertyId = 102,
                    Content = "Message from user3",
                    Timestamp = DateTime.UtcNow.AddMinutes(-10)
                }
            });
            _context.SaveChanges();
        }

        [Test]
        public async Task GetMessageById_ShouldReturnMessage_WhenMessageExists()
        {
            // Act
            var result = await _controller.GetMessageById(1);

            // Assert
            var actionResult = result as ActionResult<Message>;
            var message = actionResult?.Value;
            Assert.IsNotNull(message);
            Assert.AreEqual(1, message.Id);
        }

        [Test]
        public async Task GetMessageById_ShouldReturnNotFound_WhenMessageDoesNotExist()
        {
            // Act
            var result = await _controller.GetMessageById(99);

            // Assert
            Assert.IsInstanceOf<NotFoundResult>(result.Result);
        }

        [Test]
        public async Task GetMessages_ShouldReturnMessages_WhenValidUsersAndPropertyId()
        {
            // Act
            var result = await _controller.GetMessages(101, "user1", "user2");

            // Assert
            var okResult = result.Result as OkObjectResult;
            var messages = okResult?.Value as List<Message>;
            Assert.IsNotNull(messages);
            Assert.AreEqual(2, messages.Count);
            Assert.IsTrue(messages.All(m => m.PropertyId == 101));
            Assert.IsTrue(messages.Any(m => m.SenderId == "user1" && m.ReceiverId == "user2"));
        }

        [Test]
        public async Task GetMessages_ShouldReturnBadRequest_WhenUserIdsAreInvalid()
        {
            // Act
            var result = await _controller.GetMessages(101, "", "user2");

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result.Result);
        }

        [Test]
        public async Task GetMyChats_ShouldReturnMessages_WhenValidUserId()
        {
            // Act
            var result = await _controller.GetMyChats("user1");

            // Assert
            var okResult = result.Result as OkObjectResult;
            var messages = okResult?.Value as List<Message>;
            Assert.IsNotNull(messages);
            Assert.IsTrue(messages.Any(m => m.SenderId == "user1" || m.ReceiverId == "user1"));
        }

        [Test]
        public async Task GetMyChats_ShouldReturnBadRequest_WhenUserIdIsInvalid()
        {
            // Act
            var result = await _controller.GetMyChats("");

            // Assert
            Assert.IsInstanceOf<BadRequestObjectResult>(result.Result);
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
