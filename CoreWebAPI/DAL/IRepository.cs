
using System.Collections.Generic;
using CoreWebAPI.Models;

namespace CoreWebAPI.DAL
{
    public interface IRepository<T> where T : Entity
    {
        IEnumerable<T> GetAll();
        T GetById(object id);
        void Insert(T obj);
        void Update(T obj);
        void Delete(object id);
    }
}
