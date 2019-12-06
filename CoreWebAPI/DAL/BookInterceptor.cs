using Microsoft.AspNetCore.SignalR;
using NHibernate;
using NHibernate.Type;

namespace CoreWebAPI.DAL
{
    public class BookInterceptor : EmptyInterceptor
    {
        readonly IHubContext<Hubs.BookHub> hubContext;
        readonly Hubs.BookHub bookHub;
        public BookInterceptor(IHubContext<Hubs.BookHub> hubContext)
        {
            this.hubContext = hubContext;
            bookHub = new Hubs.BookHub();
        }
        public override bool OnFlushDirty(object entity, object id, object[] currentState, object[] previousState, string[] propertyNames, IType[] types)
        {
            bookHub.SendData(hubContext);
            return base.OnFlushDirty(entity, id, currentState, previousState, propertyNames, types);
        }
        public override bool OnSave(object entity, object id, object[] state, string[] propertyNames, IType[] types)
        {
            bookHub.SendData(hubContext);
            return base.OnSave(entity, id, state, propertyNames, types);
        }
        public override void OnDelete(object entity, object id, object[] state, string[] propertyNames, IType[] types)
        {
            bookHub.SendData(hubContext);
            base.OnDelete(entity, id, state, propertyNames, types);
        }
    }
}