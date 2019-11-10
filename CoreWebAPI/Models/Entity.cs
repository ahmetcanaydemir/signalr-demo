namespace CoreWebAPI.Models
{
    public abstract class Entity
    {
        public virtual int Id { get; set; }
        public static bool operator ==(Entity entity1, Entity entity2)
        {
            return ReferenceEquals(entity1, entity2) || (((object)entity1 != null) && entity1.Equals(entity2));
        }
        public static bool operator !=(Entity entity1, Entity entity2)
        {
            return !(entity1 == entity2);
        }
        public override bool Equals(object obj)
        {
            var entity = obj as Entity;

            return (entity != null) && (entity.GetType() == this.GetType()) && (entity.Id == this.Id);
        }
        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }
        public override string ToString()
        {
            return this.Id.ToString(System.Globalization.CultureInfo.InvariantCulture);
        }
    }
}