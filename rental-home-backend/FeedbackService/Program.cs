

using FeedbackService.Repositories;
using FeedbackServices.Data;
using FeedbackServices.Repositories;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace FeedbackService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(connectionString));

            builder.Services.AddScoped<IFeedbackRepository, FeedbackRepository>(); // Register the repository
            builder.Services.AddControllers();

            // Define and add CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontend", policy =>
                    policy.WithOrigins("http://localhost:3000") // Replace with frontend URL
                          .AllowAnyHeader()
                          .AllowAnyMethod());
            });

            builder.Services.AddControllers();

            // Swagger/OpenAPI configuration
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Use global error handler
            app.UseExceptionHandler("/error");

            // Define error endpoint
            app.Map("/error", (HttpContext context) =>
            {
                context.Response.StatusCode = 500;
                return Results.Problem("An unexpected error occurred. Please try again later.");
            });

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Enable CORS with the defined policy
            app.UseCors("AllowFrontend");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}