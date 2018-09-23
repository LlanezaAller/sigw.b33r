using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using B33rServices.Model;

namespace B33rService.Controllers
{
    public class TaxiController : ApiController
    {
        private DatabaseContext db = new DatabaseContext();

        // GET api/location
        public List<Taxi> Get()
        {
            var taxis = db.Taxis.ToList();

            return taxis;
        }
    }
}