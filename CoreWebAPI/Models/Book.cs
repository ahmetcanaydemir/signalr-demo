using System;
namespace CoreWebAPI.Models
{
    public class Book : Entity
    {
        public virtual string Isbn { get; set; }
        public virtual string Name{ get; set; }
        public virtual string Writer { get; set; }
        public virtual string Publisher { get; set; }
        public virtual DateTime CreatedAt { get; set; }
    }
}