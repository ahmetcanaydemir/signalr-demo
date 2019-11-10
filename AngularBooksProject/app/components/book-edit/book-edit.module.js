import angular from 'angular';
import './book-edit.styl.css';
import BookEditComponent from './book-edit.component';
import CoreBookModule from './../../core/book/core.book.module';

let bookEditModule =
  angular.module('bookEdit', [CoreBookModule])
    .component('bookEdit', BookEditComponent);

export default bookEditModule.name;
