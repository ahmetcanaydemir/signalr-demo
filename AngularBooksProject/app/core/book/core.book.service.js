class BookService {
  constructor($http) {
    this.$http = $http;
    this.API_URL = "http://localhost:64240/books/";
  }
  getAll() { // select *
    return this.$http.get(this.API_URL);
  }
  get(id) { // select
    return this.$http.get(this.API_URL + id);
  }
  post(book) { // insert
    return this.$http.post(this.API_URL, JSON.stringify(book));
  }
  put(book) { // update
    return this.$http.put(this.API_URL, JSON.stringify(book));
  }
  delete(id) { // delete
    return this.$http.delete(this.API_URL + id);
  }
}
export default ["$http", BookService];
