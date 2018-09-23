using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Runtime.Remoting.Metadata.W3cXsd2001;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using B33rService.App_Start.Helper;
using B33rService.Models;
using B33rServices.Model;
using Newtonsoft.Json;

namespace B33rService.Controllers
{
    public class PubController : ApiController
    {
        // GET api/location
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public List<Pub> Get()
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                var pubs = db.Pubs.ToList();

                //Reenganchamos las entidades detached
                pubs.ForEach(x => x.Votes.Any());

                return pubs;
            }
        }

        // Post api/Pub/id
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public void Post(Guid id, [FromBody]Vote vote)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                if (vote != null)
                {
                    var pub = db.Pubs.Find(id);
                    if (pub != null)
                    {
                        pub.NewVote(vote);
                        db.Pubs.AddOrUpdate(pub);

                        //db.Pubs.Attach(pub);
                        db.Entry(pub).State = EntityState.Modified;
                        db.SaveChanges();
                    }
                }
            }
        }
    }
}