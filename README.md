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