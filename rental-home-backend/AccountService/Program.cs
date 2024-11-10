
using AccountService.DAO;
using AccountService.Models;
using AccountService.Repository;
using AccountService.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using JWTAuthentication;
using Microsoft.AspNetCore.Identity.UI.Services;

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
              .AddEntityFrameworkStores<AccountDBContext>()
              .AddDefaultTokenProviders();
            builder.Services.AddTransient<IEmailSender,EmailService>();
            builder.Services.AddJwtAuthentication();



            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            //app.UseCors("AllowReactApp");
            app.MapControllers();

            app.Run();
        }
    }
}
