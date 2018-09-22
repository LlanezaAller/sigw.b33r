using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace B33rService.Controllers
{
    public class LocationController : ApiController
    {
        private DatabaseContext db = new DatabaseContext();

        // GET api/location
        public IEnumerable<string> Get()
        {
            var pubs = db.Pubs.ToList();
            return new string[] { "value1", "value2" };
        }

        // POST api/location
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }
    }
}