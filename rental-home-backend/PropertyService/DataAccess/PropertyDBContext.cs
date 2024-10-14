using PropertyService.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;



namespace PropertyService.DataAccess
{
    public class PropertyDBContext : DbContext
    {
        public PropertyDBContext(DbContextOptions<PropertyDBContext> options) : base(options) { }

        public DbSet<PropertyModel> Properties { get; set; }

       

    }
}
