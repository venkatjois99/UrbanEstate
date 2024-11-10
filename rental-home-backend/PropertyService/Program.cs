using Consul;
using Microsoft.EntityFrameworkCore;
using PropertyService;
using PropertyService.DataAccess;
using PropertyService.Repository;
using PropertyService.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<PropertyDBContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("ProjectDatabase")));
builder.Services.AddScoped<IPropertyRepository,PropertyServices >();
//builder.Services.AddScoped<IImageRepo, ImageRepository>();

builder.Services.AddControllers();
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
//app.UseCors("AllowReactApp");



app.MapControllers();

app.Run();


