using Consul;
using Microsoft.EntityFrameworkCore;
using PropertyService;
using PropertyService.DataAccess;
using PropertyService.Repository;
using PropertyService.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<PropertyDBContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("ProjectDatabase")));
//configure the consulhost
//var consulHost = builder.Configuration.GetValue<string>(key: "ConsulConfiguration:Host");
//builder.Services.AddSingleton<IHostedService, ConsulRegisterService>();
//builder.Services.AddSingleton<IConsulClient>(_ => new ConsulClient(config
//    =>
//{ config.Address = new Uri(consulHost); }));
builder.Services.AddScoped<IPropertyRepository,PropertyServices >();
//builder.Services.AddScoped<IImageRepo, ImageRepository>();

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://127.0.0.1:5173") // React app's URL
                        .AllowAnyMethod()                     // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
                        .AllowAnyHeader()                     // Allow all headers
                        .AllowCredentials());                 // If you need credentials (like cookies or auth tokens)
});
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");



app.MapControllers();

app.Run();


