using System;
using System.Collections.Generic;
using CoreWebAPI.Models;
using Microsoft.AspNetCore.SignalR;
using NHibernate;

namespace CoreWebAPI.DAL
{
    public class BookRepository : IRepository<Book>
    {
        readonly SessionFactory sessionFactory;
        public BookRepository(IHubContext<Hubs.BookHub> hubContext)
        {
            sessionFactory = new SessionFactory(hubContext);
        }
        public void Delete(object bookId)
        {
            using (var session = sessionFactory.OpenSession())
            {
                session.Transaction.Begin();
                session.Delete(session.Get<Book>(bookId));
                session.Transaction.Commit();
                return;
            }
        }

        public Book GetById(object bookId)
        {
            using (var session = sessionFactory.OpenSession())
            {
                return session.Get<Book>(bookId);
            }
        }
        public IEnumerable<Book> GetAll()
        {
            using (var session = sessionFactory.OpenSession())
            {
                IQuery query = session.CreateQuery("FROM Book");
                return query.List<Book>();
            }

        }

        public void Insert(Book book)
        {
            using (var session = sessionFactory.OpenSession())
            {
                session.Transaction.Begin();
                book.CreatedAt = DateTime.Now;
                session.Save(book);
                session.Transaction.Commit();

                return;
            }
        }

        public void Update(Book book)
        {
            using (var session = sessionFactory.OpenSession())
            {
                session.Transaction.Begin();
                var updateBook = session.Get<Book>(book.Id);
                updateBook.Name = book.Name;
                updateBook.Isbn = book.Isbn;
                updateBook.Publisher = book.Publisher;
                updateBook.Writer = book.Writer;
                session.Transaction.Commit();
                return;
            }
        }
    }
}