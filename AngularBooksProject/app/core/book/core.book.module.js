import angular from 'angular';
import BookService from './core.book.service';

let BookModule = angular
  .module('core.book', [])
  .service('BookService', BookService);

export default BookModule.name;
