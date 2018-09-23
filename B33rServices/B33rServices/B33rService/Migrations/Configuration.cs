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
            DatabaseIni dbi = new DatabaseIni();
            var pubs = dbi.GetInitialPubDataset();

            pubs.ForEach(s => context.Pubs.Add(s));
            context.SaveChanges();

            var taxis = dbi.InitializeTaxiDb();

            taxis.ForEach(s => context.Taxis.Add(s));
            context.SaveChanges();
        }
    }
}