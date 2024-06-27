using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(corsOptions =>
{
    corsOptions.AddDefaultPolicy(policy => policy
        .WithOrigins("http://localhost:4000")
        .WithMethods("GET", "PUT", "POST", "DELETE")
        .AllowCredentials()
        .AllowAnyHeader()
    );
});
builder.Services.AddSignalR(signalROptions =>
{
    signalROptions.EnableDetailedErrors = true;
});

string connectionString = "Host=LAPTOP-BTOESM68;Port=5432;Database=gravhack;User id=postgres;Password=postgres;";
//adds in the database
builder.Services.AddDbContext<TodoDb>(opt =>
    opt.UseNpgsql(connectionString)
    .EnableSensitiveDataLogging()
    .EnableDetailedErrors());
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddHostedService<HubService>();

//initializes the app
var app = builder.Build();

app.MapHub<TodoHub>("/hub");
app.UseCors();

TodoDb db = new TodoDb(connectionString);
//pulling all the items from the DB
app.MapGet("/todoitems", () => DBInterface.GetEveryTodo());

//pulling all the completed items from the DB
app.MapGet("/todoitems/complete", () =>
    DBInterface.GetEveryCompleteTodo());

//gets item by ID
app.MapGet("/todoitems/{id}", (int id, TodoDb db) =>
    DBInterface.GetSingleTodo(id));

//post item to list
app.MapPost("/todoitems", (Todo todo, TodoDb db) =>
{
    db.Todos.Add(todo);
    db.SaveChanges();

    HubService.todoHub.Clients.All.SendAsync("TODO_ADDED", todo);

    return Results.Created($"/todoitems/{todo.Id}", todo);
});

//updates item in list
app.MapPut("/todoitems/{id}", (int id, Todo inputTodo, TodoDb db) =>
{
    var todo = db.Todos.Find(id);

    if (todo is null) return Results.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;

    db.SaveChanges();

    return Results.NoContent();
});

//delete item by id
app.MapDelete("/todoitems/{id}", (int id, TodoDb db) =>
{
    if (db.Todos.Find(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        db.SaveChanges();
        return Results.NoContent();
    }

    return Results.NotFound();
});

app.Run();