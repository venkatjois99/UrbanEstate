using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace APIGateway
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Set the base path for the configuration and load the Ocelot configuration
            builder.Configuration.SetBasePath(builder.Environment.ContentRootPath)
                .AddJsonFile("ApiGatewayConfig.json", optional: false, reloadOnChange: true);

            // Add services to the container
            builder.Services.AddAuthorization();

            // Configure CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("GatewayCorsPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:5173") // Allowed frontend URLs
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });

            // Add Ocelot and Swagger services
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddOcelot();

            var app = builder.Build();

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseCors("GatewayCorsPolicy"); // Use the defined CORS policy
            app.UseAuthorization();
            app.UseOcelot().Wait(); // Ensure Ocelot is awaited

            app.MapControllers();
            app.MapGet("/", () => "API Gateway");

            app.Run();
        }
    }
}
