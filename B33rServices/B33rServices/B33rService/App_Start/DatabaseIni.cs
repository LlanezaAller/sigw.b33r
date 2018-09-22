using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using B33rServices.Model;

namespace B33rService
{
    public class DatabaseIni : System.Data.Entity.DropCreateDatabaseIfModelChanges<DatabaseContext>
    {
        protected override void Seed(DatabaseContext context)
        {
            var pubs = new List<Pub>
            {
                new Pub()
                {
                    ID = Guid.NewGuid(),
                    ImageURL = "",
                    Location = new Location(){Latitud = 1.00, Longitud = 2.00},
                    Name = "TestPub"
                }
            };

            pubs.ForEach(s => context.Pubs.Add(s));
            context.SaveChanges();

            var taxis = new List<Taxi>
            {
            };

            taxis.ForEach(s => context.Taxis.Add(s));
            context.SaveChanges();
        }
    }
}