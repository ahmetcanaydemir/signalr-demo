using Microsoft.AspNetCore.SignalR;
namespace CoreWebAPI.Hubs
{
    public class BookHub : Hub
    {
        public void SendData(IHubContext<BookHub> context)
        {
            context.Clients.All.SendAsync("GetData");
        }
    }
}