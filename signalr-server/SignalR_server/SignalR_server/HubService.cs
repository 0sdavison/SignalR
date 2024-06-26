using Microsoft.AspNetCore.SignalR;

public class HubService : IHostedService, IDisposable
{
    public static IHubContext<TodoHub> todoHub;

    public HubService(IHubContext<TodoHub> hubContext)
    {
        todoHub = hubContext;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }

    public void Dispose()
    {
    }
}