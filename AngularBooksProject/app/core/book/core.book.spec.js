describe("Book", function() {
  var $httpBackend;
  var Book;
  var bookData = [
    {
      Id: 1,
      Isbn: "1234567890",
      Name: "Book X",
      Writer: "Writer X",
      Publisher: "Publisher X",
      CreatedAt: "2019-07-04 09:47:35"
    },
    {
      Id: 2,
      Isbn: "1234567890",
      Name: "Book Y",
      Writer: "Writer Y",
      Publisher: "Publisher Y",
      CreatedAt: "2019-07-04 09:47:35"
    },
    {
      Id: 3,
      Isbn: "1234567890",
      Name: "Book Z",
      Writer: "Writer Z",
      Publisher: "Publisher Z",
      CreatedAt: "2019-07-04 09:47:35"
    }
  ];

  beforeEach(function() {
    jasmine.addCustomEqualityTester(angular.equals);
  });

  beforeEach(module("core.book"));

  beforeEach(inject(function(_$httpBackend_, _Book_) {
    $httpBackend = _$httpBackend_;
    $httpBackend
      .expectGET("http://localhost:52611/api/books/")
      .respond(bookData);

    Book = _Book_;
  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  it("should fetch the books data from `http://localhost:52611/api/books/`", function() {
    var books = Book.getAll();

    expect(books).toEqual([]);

    $httpBackend.flush();
    expect(books).toEqual(bookData);
  });
});
