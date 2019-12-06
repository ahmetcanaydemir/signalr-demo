using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using NHibernate;
using System;
using System.IO;

namespace CoreWebAPI
{
    public class SessionFactory
    {
        private readonly object _lockObject = new object();
        private ISessionFactory _sessionFactory;

        public SessionFactory()
        {
        }

        private ISessionFactory BuildSessionFactory
        {
            get
            {
                if (_sessionFactory == null)
                    CreateSessionFactory();
                return _sessionFactory;
            }
        }

        public ISession OpenSession()
        {
            return BuildSessionFactory.WithOptions().OpenSession();
        }

        private void CreateSessionFactory()
        {
            lock (_lockObject)
            {
                var fluentConfiguration = Fluently.Configure()
                    .Database(SQLiteConfiguration.Standard
                    .UsingFile(Path.Combine(Environment.CurrentDirectory,"database.db")))
                    .Mappings(m => m.FluentMappings.AddFromAssemblyOf<Mappings.BookMapping>());

                _sessionFactory = fluentConfiguration.BuildSessionFactory();
            }
        }
    }
}