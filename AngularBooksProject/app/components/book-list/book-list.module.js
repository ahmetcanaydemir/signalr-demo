import angular from 'angular';
import './book-list.styl.css';
import BookListComponent from './book-list.component';
import CoreBookModule from './../../core/book/core.book.module';

let bookListModule =
  angular.module('bookList', [CoreBookModule])
    .component('bookList', BookListComponent);

export default bookListModule.name;
