using FluentNHibernate.Mapping;
using CoreWebAPI.Models;

namespace CoreWebAPI.Mappings
{
    public class BookMapping : ClassMap<Book>
    {

        public BookMapping()
        {
            Table("books");
            Id(x => x.Id);
            Map(x => x.Name).Nullable();
            Map(x => x.Publisher).Nullable();
            Map(x => x.Writer).Nullable();
            Map(x => x.Isbn).Nullable();
            Map(x => x.CreatedAt).Nullable();
            
        }
    }
}