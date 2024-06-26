using Microsoft.AspNetCore.SignalR;

public class TodoHub : Hub
{
    public async Task NewMessage(long username, string message) =>
        await Clients.All.SendAsync("messageReceived", username, message);
}
