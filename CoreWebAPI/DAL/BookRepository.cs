using System;
using System.Collections.Generic;
using CoreWebAPI.Models;
using NHibernate;
using Microsoft.AspNetCore.SignalR;

namespace CoreWebAPI.DAL
{
    public class BookRepository : IRepository<Book>
    {
        SessionFactory sessionFactory;
        public BookRepository()
        {
            sessionFactory = new SessionFactory();
        }
        public void Delete(object bookId)
        {
            ISession session = sessionFactory.OpenSession();
            using (session)
            {
                session.Transaction.Begin();
                session.Delete(session.Get<Book>(bookId));
                session.Transaction.Commit();
                return;
            }
        }

        public Book GetById(object bookId)
        {
            ISession session = sessionFactory.OpenSession();
            using (session)
            {
                return session.Get<Book>(bookId);
            }
        }
        public IEnumerable<Book> GetAll()
        {
            ISession session = sessionFactory.OpenSession();
            using (session)
            {
                IQuery query = session.CreateQuery("FROM Book");
                return query.List<Models.Book>();
            }

        }

        public void Insert(Book book)
        {
            ISession session = sessionFactory.OpenSession();
            using (session)
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
            ISession session = sessionFactory.OpenSession();
            using (session)
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