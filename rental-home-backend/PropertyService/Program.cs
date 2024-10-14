using Microsoft.EntityFrameworkCore;
using PropertyService.DataAccess;
using PropertyService.Repository;
using PropertyService.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<PropertyDBContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("ProjectDatabase")));
builder.Services.AddScoped<IPropertyRepository,PropertyServices >();

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


