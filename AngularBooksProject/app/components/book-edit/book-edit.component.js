import Template from "./book-edit.tpl.html";

class BookEditComponent {
  constructor($routeParams, BookService) {
    this.BookService = BookService;
    this.bookId = $routeParams.bookId;
    this.isNew = this.bookId === "yeni";
    this.title = this.isNew ? "Ekle" : "Düzenle";
    this.book = {
      id: -1,
      isbn: "",
      name: "",
      writer: "",
      publisher: "",
      createdAt: "2016-04-26T18:09:16Z"
    };
    if (this.isNew) {
      return;
    }
    BookService.get(this.bookId).then(response => {
      this.book = response.data;
    });
  }
  save(formValid) {
    if (!formValid) return;
    if (this.isNew) {
      this.add();
    } else {
      this.update();
    }
  }
  add() {
    this.BookService.post(this.book).then(result => {
      alert("Kitap başarı ile eklendi!");
      this.goBack();
    });
  }
  update() {
    this.BookService.put(this.book).then(result => {
      alert("Kitap başarı ile güncellendi!");
      this.goBack();
    });
  }
  goBack() {
    window.location.href = "#!/kitaplar";
  }
}
export default {
  controller: ["$routeParams", "BookService", BookEditComponent],
  template: Template
};
