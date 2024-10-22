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
var consulHost = builder.Configuration.GetValue<string>(key: "ConsulConfiguration:Host");
builder.Services.AddSingleton<IHostedService, ConsulRegisterService>();
builder.Services.AddSingleton<IConsulClient>(_ => new ConsulClient(config
    =>
{ config.Address = new Uri(consulHost); }));
builder.Services.AddScoped<IPropertyRepository,PropertyServices >();
builder.Services.AddScoped<IImageRepo, ImageRepository>();

builder.Services.AddControllers();

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



app.MapControllers();

app.Run();


