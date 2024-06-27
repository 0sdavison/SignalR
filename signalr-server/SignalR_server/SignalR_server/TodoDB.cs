using Microsoft.EntityFrameworkCore;


public class TodoDb : DbContext
{
    string _connectionString = "Host=LAPTOP-BTOESM68;Port=5432;Database=gravhack;User id=postgres;Password=postgres;";
   public
    TodoDb(string connectionString)
    { _connectionString = connectionString; }

    public TodoDb() { }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_connectionString);
    }
    public DbSet<Todo> Todos { get; set; }
}


class DBInterface
{
public static Todo GetSingleTodo(int id)
    {
        TodoDb myDBcon = new TodoDb(connectionString);
        Todo SelectedTodo = new Todo();

        var query = from b in myDBcon.Todos
                        orderby b.Id
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

        var query = from b in myDBcon.Todos
                    orderby b.Id
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

        var query = from b in myDBcon.Todos
                    orderby b.Id
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
