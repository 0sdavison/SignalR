using Microsoft.AspNetCore.SignalR;

public class TodoHub : Hub
{
    public async Task NewMessage(Todo todo) =>
        await Clients.All.SendAsync("messageReceived", todo);
}
