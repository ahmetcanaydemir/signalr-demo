# 1. Adım
### Ön Gereksinimler
1) [ASP.NET Core 3.0](https://dotnet.microsoft.com/download/dotnet-core/3.0)
2) [Git](https://git-scm.com/downloads)

_Gereksinim ismine tıklayarak indirme sayfalarına ulaşabilirsiniz._

### Projenin İndirilmesi
1) `git clone https://github.com/ahmetcanaydemir/signalr-demo.git` komutu ile projeyi indirin.
2) `cd signalr-demo` komutu ile proje klasörüne girin.
3) İndirdiğiniz proje klasörüne girdikten sonra `git checkout step-1 -f` komutu ile 1. adım branch'ine geçin.

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
