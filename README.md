### Ön Gereksinimler
1) [ASP.NET Core 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1)
2) [Git](https://git-scm.com/downloads)

_Gereksinim ismine tıklayarak indirme sayfalarına ulaşabilirsiniz._

# 1. Adım
### Projenin İndirilmesi
1) `git clone https://github.com/ahmetcanaydemir/signalr-demo.git` komutu ile projeyi indirin.
2) `cd signalr-demo` komutu ile proje klasörüne girin.

### Web API Projesinin Çalıştırılması
1) `cd CoreWebApi` ile `CoreWebAPI` klasörüne girin.
2) `dotnet restore` komutu ile bağımlılıkları indirin.
3) `dotnet run` komutu ile .NET Core Web API projesini çalıştırın.
4) `http://localhost:5000/books/` adresine tarayıcınızdan girdiğinizde API'ın size bazı kitapları gösterdiğini göreceksiniz.

### AngularJS Projesinin Çalıştırılması
1) `AngularBooksProject` klasörünü Visual Studio Code ile açın veya `cd AngularBooksProject` ile AngularJS projesi klasörüne girin.
2) `npm i --registry https://registry.npmjs.com/`
3) `npm run build`
4) `npm start` komutlarını sırasıyla çalıştırın.
5) `http://localhost:8080/` adresine girdiğinizde Web API projeniz çalışıyorsa kitap listesini görebileceksiniz.

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

# 3. Adım
1) `DAL` klasörüne girip. `BookInterceptor.cs` adında bir dosya oluşturun.
2) Bu dosya sayesinde veritabanındaki değişiklikler sonucunda signalr'ı tetikleyebileceğiz.
```csharp 
// BookInterceptor.cs dosyasının içeriği:

using Microsoft.AspNetCore.SignalR;
using NHibernate;
using NHibernate.Type;

namespace CoreWebAPI.DAL
{
    public class BookInterceptor : EmptyInterceptor
    {
        readonly IHubContext<Hubs.BookHub> hubContext;
        readonly Hubs.BookHub bookHub;
        public BookInterceptor(IHubContext<Hubs.BookHub> hubContext)
        {
            this.hubContext = hubContext;
            bookHub = new Hubs.BookHub();
        }
        public override bool OnFlushDirty(object entity, object id, object[] currentState, object[] previousState, string[] propertyNames, IType[] types)
        {
            bookHub.SendData(hubContext);
            return base.OnFlushDirty(entity, id, currentState, previousState, propertyNames, types);
        }
        public override bool OnSave(object entity, object id, object[] state, string[] propertyNames, IType[] types)
        {
            bookHub.SendData(hubContext);
            return base.OnSave(entity, id, state, propertyNames, types);
        }
        public override void OnDelete(object entity, object id, object[] state, string[] propertyNames, IType[] types)
        {
            bookHub.SendData(hubContext);
            base.OnDelete(entity, id, state, propertyNames, types);
        }
    }
}        
```
3) Oluşturdğunuz `BookInterceptor.cs` isimli tetikleme dosyasını Session oluşturma sırasında session'a bağlayın. Bunun için `SesssionFactory.cs` dosyasını açın.
4) Yorum satırına alınmış satırı yorum satırına alınmamış hali ile değiştirin. Yani `WithOptions()` sonrasına `.Interceptor(new DAL.BookInterceptor(_hubContext))` ekleyin.
```csharp 
public ISession OpenSession()
{
    // return BuildSessionFactory.WithOptions().OpenSession(); // Eski
    return BuildSessionFactory.WithOptions().Interceptor(new DAL.BookInterceptor(_hubContext)).OpenSession(); // Yeni
}
```
5) BookInterceptor constructor fonksiyonunda `IHubContext<Hubs.BookHub>` tipinde bir context istiyor. Bu context huba bağlanan clientların bulunduğu bir oda gibi düşünülebilir. Bu contexti controllerın constructor fonksiyonundan elde edip `SessionFactory.cs` dosyasına gönderebiliriz.
6) Aşağıdaki şekildeki gibi `SessionFactory.cs` dosyasının constructor fonksiyonunu değiştirin.
```csharp 
// Yeni
private IHubContext<Hubs.BookHub> _hubContext;
public SessionFactory(IHubContext<Hubs.BookHub> hubContext)
{
    _hubContext = hubContext;
}
```

7) SessionFactory'i çağıran `BookRepository.cs` dosyasının constructor fonksiyonunu da bu şekilde değiştirin.
```csharp 
// Yeni
public BookRepository(IHubContext<Hubs.BookHub> hubContext)
{
    sessionFactory = new SessionFactory(hubContext);
}
```
8) BookRepository'i çağıran Controllers klasörünün altındaki `BooksController.cs` dosyasının constructor fonksiyonunu da bu şekilde değiştirin.
```csharp 
// Yeni
public BooksController(IHubContext<Hubs.BookHub> hubContext)
{
    _bookService = new BookRepository(hubContext);
}
```
9)  `dotnet run` komutu ile .NET Core Web API projesini çalıştırın. `/bookHub` adresine gitmeyi deneyin. Connection ID required hatası alırsanız sorunsuz bir şekilde çalışıyor demektir.

# 4. Adım
1) `AngularBooksProject` klasörünü Visual Studio Code ile açın.
2) Gerekiyorsa `npm config set registry https://registry.npmjs.com/` ile registry değiştirin.
3) `npm install @microsoft/signalr` ile SignalR istemci kütüphanesini kurun.
4) `app/settings.js` dosyasını açıp **API_URL** adresini eğer portunuz farklı ise kendinize göre düzenleyin.
5) `app/components/book-list/book-list.component.js` dosyasını açın. SignalR için import satırını ekleyin.
```javascript
import { HubConnectionBuilder } from "@microsoft/signalr";
```
6) Constructor fonksiyonuna SignalR sunucu bağlantısı kodlarını ekleyin.
```javascript
constructor(BookService) {
    this.BookService = BookService;

    // <-- SignalR bölümü başlangıcı
    const connection = new HubConnectionBuilder()
      .withUrl(API_URL+"/bookHub")
      .build();

    connection.start().then(()=>{
      console.log("websocket bağlantısı sağlandı.");
    });

    connection.on("GetData", data=>{
      console.log("GetData tetiklendi.");
      BookService.getAll().then(response => (this.books = response.data));
    });
    // SignalR bölümü bitişi --->
    // ...
}
```
7) Web API sunucusu çalışır durumdayken `npm run build` ve ardından `npm start` komutları ile angularjs projesini çalıştırın.

## Son
Birden fazla tarayıcıda angularjs projesini açıp silme, ekleme ve güncelleme işlemlerinde diğer tarayıcı pencerelerindeki kitap listesinin otomatik olarak güncellendiğini gözlemleyebilirsiniz.
