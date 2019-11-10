import angular from 'angular';
import BookList from './book-list/book-list.module';
import BookEdit from './book-edit/book-edit.module';

let componentModule = angular.module('app.components', [
  BookList, BookEdit
]);

export default componentModule.name;
