using Microsoft.AspNetCore.SignalR;

public class HubService : BackgroundService
{
    public static IHubContext<TodoHub> todoHub;

    public HubService(IHubContext<TodoHub> hubContext)
    {
        todoHub = hubContext;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await DoWork(stoppingToken);
    }

    private async Task DoWork(CancellationToken stoppingToken)
    {
        // Monitor DB and send notifications on updates
        // todoHub.Clients.All.SendAsync("messageReceived", todo);
    }

    public override async Task StopAsync(CancellationToken stoppingToken)
    {
        await base.StopAsync(stoppingToken);
    }
}