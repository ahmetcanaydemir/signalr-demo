import angular from "angular";
import ngRoute from "angular-route";
import ngMessages from "angular-messages";
import Components from "./components/components.module";

const booksApp = angular
  .module("booksApp", [ngRoute, ngMessages, Components])
  .config([
    "$routeProvider",
    function($routeProvider) {
      $routeProvider
        .when("/kitaplar", {
          template: "<book-list></book-list>"
        })
        .when("/kitaplar/:bookId", {
          template: "<book-edit></book-edit>"
        })
        .otherwise({
          redirectTo: "/kitaplar"
        });
    }
  ]);
