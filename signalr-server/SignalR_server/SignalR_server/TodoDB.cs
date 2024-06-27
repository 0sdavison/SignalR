//This is the database
using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using System.Data.Common;
using System.Reflection.Metadata;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;


class TodoDb : DbContext
{
    string _connectionString = "Host=LAPTOP-BTOESM68;Port=5432;Database=gravhack;User id=postgres;Password=postgres;";
   public
    TodoDb(string connectionString)
    { _connectionString = connectionString; }

    public TodoDb() { }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_connectionString);
  //      DbDataSource dataSource;
    //    dataSource.OpenConnection(_connectionString);
    }
    public DbSet<Todo> Todos { get; set; }
 //   public virtual DbSet<Blog> Blogs { get; set; }
    //public TodoDb(DbContextOptions<TodoDb> options)
    //    : base(options) { }

    //public DbSet<Todo> Todos => Set<Todo>();
}


class DBInterface
{
public static Todo GetSingleTodo(int id)
    {
        TodoDb myDBcon = new TodoDb(connectionString);
        Todo SelectedTodo = new Todo();

        //       myDBcon.ToDoTable.AsSingleQuery
        var query = from b in myDBcon.Todos
                        orderby b.Name
                        select b;
        foreach (var item in query)
        {
            if (item.Id == id)
            {
                SelectedTodo.Id = item.Id;
                SelectedTodo.Name = item.Name;
                SelectedTodo.IsComplete = item.IsComplete;
                Console.WriteLine(item.Name);
            }
        }


        return SelectedTodo;
    }
    public static List<Todo> GetEveryTodo()
    {
        TodoDb myDBcon = new TodoDb(connectionString);
        List<Todo> SelectedTodos = new List<Todo>();

        //       myDBcon.ToDoTable.AsSingleQuery
        var query = from b in myDBcon.Todos
                    orderby b.Name
                    select b;
        foreach (var item in query)
        {
                  Console.WriteLine(item.Name);
            SelectedTodos.Add(item);
        }


        return SelectedTodos;
    }

    public static List<Todo> GetEveryCompleteTodo()
    {
        TodoDb myDBcon = new TodoDb(connectionString);
        List<Todo> SelectedTodos = new List<Todo>();

        //       myDBcon.ToDoTable.AsSingleQuery
        var query = from b in myDBcon.Todos
                    orderby b.Name
                    select b;
        foreach (var item in query)
        {
            if (item.IsComplete)
            {
                Console.WriteLine(item.Name);
                SelectedTodos.Add(item);
            }
        }


        return SelectedTodos;
    }
    static string connectionString = "Host=LAPTOP-BTOESM68;Port=5432;Database=gravhack;User id=postgres;Password=postgres;";

}

/*
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ConsoleApp.PostgreSQL
{
    public class BloggingContext : DbContext
    {
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<Post> Posts { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql("Host=my_host;Database=my_db;Username=my_user;Password=my_pw");
    }

    public class Blog
    {
        public int BlogId { get; set; }
        public string Url { get; set; }

        public List<Post> Posts { get; set; }
    }

    public class Post
    {
        public int PostId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }

        public int BlogId { get; set; }
        public Blog Blog { get; set; }
    }
}*/