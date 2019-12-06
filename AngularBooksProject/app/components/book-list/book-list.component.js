import {API_URL} from "./../../settings";
import Template from "./book-list.tpl.html";
import { HubConnectionBuilder } from "@microsoft/signalr";

class BookListComponent {
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

    BookService.getAll().then(response => (this.books = response.data));
    this.orderProp = "CreatedAt";
    this.reverse = true;
  }
  sortBy(orderProp) {
    this.reverse = orderProp === this.orderProp ? !this.reverse : false;
    this.orderProp = orderProp;
  }
  delete(book) {
    if (
      confirm(book.name + " isimli kitabı silmek istediğinize emin misiniz?")
    ) {
      this.BookService.delete(book.id);
      this.books = this.books.filter(x => x != book);
    }
  }
}
export default {
  controller: ["BookService", BookListComponent],
  template: Template
};
