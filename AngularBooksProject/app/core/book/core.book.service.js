import {API_URL} from "./../../settings";

class BookService {
  constructor($http) {
    this.$http = $http;
    this.BOOK_URL = API_URL + "/books/";
  }
  getAll() { // select *
    return this.$http.get(this.BOOK_URL);
  }
  get(id) { // select
    return this.$http.get(this.BOOK_URL + id);
  }
  post(book) { // insert
    return this.$http.post(this.BOOK_URL, JSON.stringify(book));
  }
  put(book) { // update
    return this.$http.put(this.BOOK_URL, JSON.stringify(book));
  }
  delete(id) { // delete
    return this.$http.delete(this.BOOK_URL + id);
  }
}
export default ["$http", BookService];
