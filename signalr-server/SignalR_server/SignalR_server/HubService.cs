using System;
using System.Data.Common;
using System.Data.Entity;
using System.Data.SqlClient;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

public class HubService : BackgroundService
{
    private readonly IServiceScopeFactory scopeFactory;
    public static IHubContext<TodoHub> todoHub;

    public HubService(IHubContext<TodoHub> hubContext, IServiceScopeFactory scopeFactory)
    {
        todoHub = hubContext;
        this.scopeFactory = scopeFactory;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await DoWork(stoppingToken);
    }

    private async Task DoWork(CancellationToken stoppingToken)
    {
        using (var scope = scopeFactory.CreateScope())
        {
            var todoDb = scope.ServiceProvider.GetRequiredService<TodoDb>();
            todoDb.Database.EnsureCreated();

            using (DbConnection conn = todoDb.Database.GetDbConnection())
            {
                if (conn is NpgsqlConnection)
                {
                    var npgsqlConnection = conn as NpgsqlConnection;

                    if (npgsqlConnection.State == System.Data.ConnectionState.Closed)
                    {
                        npgsqlConnection.Open();
                    }

                    npgsqlConnection.Notification += (o, e) =>
                    {
                        todoHub.Clients.All.SendAsync("DB_NOTIFICATION", e.Payload);
                    };

                    await using (var cmd = new NpgsqlCommand("LISTEN datachange;", npgsqlConnection))
                        cmd.ExecuteNonQuery();

                    while (true)
                        await npgsqlConnection.WaitAsync();
                }
            }
        }
    }

    public override async Task StopAsync(CancellationToken stoppingToken)
    {
        await base.StopAsync(stoppingToken);
    }
}