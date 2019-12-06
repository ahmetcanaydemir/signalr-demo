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