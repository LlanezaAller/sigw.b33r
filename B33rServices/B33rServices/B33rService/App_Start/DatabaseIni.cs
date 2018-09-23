using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using B33rService.App_Start.Helper;
using B33rService.Models;
using B33rServices.Model;

namespace B33rService
{
    public class DatabaseIni : System.Data.Entity.DropCreateDatabaseIfModelChanges<DatabaseContext>
    {
        private const string TaxiURL = "https://observa.gijon.es/api/records/1.0/search/?dataset=paradas-de-taxis&rows=-1&facet=parada";

        protected override void Seed(DatabaseContext context)
        {
            var pubs = new List<Pub>
            {
                new Pub()
                {
                    ID = Guid.NewGuid(),
                    ImageURL = "",
                    Location = new Location(){Latitud = 1.00, Longitud = 2.00},
                    Name = "TestPub",
                    Votes = new List<Vote>(){ new Vote(){Id = Guid.NewGuid(), Msg = "testMSG", Value = 4}}
                }
            };

            pubs.ForEach(s => context.Pubs.Add(s));
            context.SaveChanges();

            var taxis = InitializeTaxiDb();

            taxis.ForEach(s => context.Taxis.Add(s));
            context.SaveChanges();
        }

        public List<Taxi> InitializeTaxiDb()
        {
            List<Taxi> result = new List<Taxi>();

            var taxiCollection = HttpClientHelper.Get<TaxiGijon.RootObject>(TaxiURL);

            result = taxiCollection.records.Select(x => new Taxi()
            {
                TaxiLocation = new TaxiLocation() { Latitud = x.fields.latitud, Longitud = x.fields.longitud, Parada = x.fields.parada },
                RecordID = x.recordid
            }).ToList();

            return result;
        }
    }
}