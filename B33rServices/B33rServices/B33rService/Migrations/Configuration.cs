using System.Collections.Generic;
using B33rServices.Model;

namespace B33rService.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<B33rService.DatabaseContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(B33rService.DatabaseContext context)
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

            DatabaseIni dbi = new DatabaseIni();
            var taxis = dbi.InitializeTaxiDb();

            taxis.ForEach(s => context.Taxis.Add(s));
            context.SaveChanges();
        }
    }
}