using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using CoreWebAPI.Models;
using CoreWebAPI.DAL;

namespace CoreWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [EnableCors("CorsPolicy")]
    public class BooksController : ControllerBase
    {
        readonly IRepository<Book> _bookService;
        public BooksController(IHubContext<Hubs.BookHub> hubContext)
        {
            _bookService = new BookRepository(hubContext);
        }
        [HttpGet]
        public IEnumerable<Book> Get()
        {
            return _bookService.GetAll();
        }

        [HttpGet("{id}")]
        public Book Get(int id)
        {
            return _bookService.GetById(id);
        }
        [HttpPut]
        public bool Put([FromBody]Book book)
        {
            if (_bookService.GetById(book.Id).Id == 0)
                return false;
            _bookService.Update(book);
            return true;
        }
        [HttpPost]
        public bool Post([FromBody]Book book)
        {
            _bookService.Insert(book);
            return true;
        }
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            _bookService.Delete(id);
            return true;
        }
    }
}
