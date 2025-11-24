using Microsoft.EntityFrameworkCore;
using API.Models;

namespace API.Data;

public class AppDataContext : DbContext{
    
    public AppDataContext(DbContextOptions<AppDataContext> options)  : base(options){
        
    }

        // TABLES
        public DbSet<Animal> Animals { get; set; }  // ANIMALS
        public DbSet<Care> Cares { get; set; }      // CUIDADOS
        
}
