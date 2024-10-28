
using AccountService.DAO;
using AccountService.Models;
using AccountService.Repository;
using AccountService.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using JWTAuthentication;

namespace AccountService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<AccountDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<IAccountRepository, AccountServices>();
            builder.Services.AddAutoMapper(typeof(MappingProfile));
            builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
              .AddEntityFrameworkStores<AccountDBContext>();

            builder.Services.AddJwtAuthentication();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy => policy.WithOrigins("http://localhost:5173") // React app's URL
                                    .AllowAnyMethod()                     // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
                                    .AllowAnyHeader()                     // Allow all headers
                                    .AllowCredentials());                 // If you need credentials (like cookies or auth tokens)
            });
        



            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors("AllowReactApp");
            app.MapControllers();

            app.Run();
        }
    }
}
