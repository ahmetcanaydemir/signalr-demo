# 2. Adım
1) `dotnet add package Microsoft.AspNet.SignalR.Core` komutu ile .NET Core için SignalR sunucu kütüphanesini projeye dahil edin.
- Eğer hata alırsanız **Package source:** yazısının yanındaki çark simgesine tıklayın PIWorks seçeneğini devre dışı bırakarak tekrar deneyin.
2) Projeye `Hubs` isminde bir klasör ekleyin. Bu klasörün içerisine de `BookHub.cs` adında bir dosya oluşturun.
```csharp 
// BookHub.cs dosyasının içeriği:
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
```
3) `Startup.cs` dosyasını açın.
```csharp 
public void ConfigureServices(IServiceCollection services)
{
    services.AddSignalR(); // ConfigureServices fonksiyonuna bu satırı ekleyin
    // ...
}
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // ...
    app.UseEndpoints(endpoints =>
    {
        // ...
        // Configure fonksiyonun içindeki UseEndpoints'e alttaki satırı ekleyin.
        endpoints.MapHub<Hubs.BookHub>("/bookHub"); 
    });
}          
```
4)  `dotnet run` ile .NET Core Web API projesini çalıştırın. `/bookHub` adresine gitmeyi deneyin. Connection ID required hatası alırsanız sorunsuz bir şekilde çalışıyor demektir.
