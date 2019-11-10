# 1. Adım
### Projenin İndirilmesi
1) `git clone https://github.com/ahmetcanaydemir/signalr-demo.git` komutu ile projeyi indirin.
2) İndirdiğiniz proje klasörüne girdikten sonra `git checkout step-1` komutu ile 1. adım branch'ine geçin.

### Web API Projesinin Çalıştırılması
1) `CoreWebAPI` klasörüne girip `CoreWebAPI.csproj` dosyasını Visual Studio ile açın.
2) `Solution Explorer` üzerinden Solution'a sağ tıklayın ve önce `Restore Nuget Packages` daha sonra da `Rebuild Solution` seçeneklerine tıklayın.
3) <kbd>F5</kbd>'e basıp .NET Core Web API projesini çalıştırın. API'ın size bazı kitapları gösterdiğini göreceksiniz.

### AngularJS Projesinin Çalıştırılması
1) `AngularBooksProject` klasörünü Visual Studio Code ile açın.
2) Gerekiyorsa `npm config set registry https://registry.npmjs.com/` ile registry değiştirin.
3) `npm i`, `npm run build`, `npm start` komutlarını sırasıyla çalıştırın.
4) Web API projeniz çalışıyorsa kitap listesini görebileceksiniz.