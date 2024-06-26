//This is the database
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.EntityFrameworkCore;

class TodoDb : DbContext
{
    string _connectionString = "Server=LAPTOP-BTOESM68;Database=gravhack;Username=postgres;Password=postgres;";
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
    }

    //public TodoDb(DbContextOptions<TodoDb> options)
    //    : base(options) { }

    //public DbSet<Todo> Todos => Set<Todo>();
}
