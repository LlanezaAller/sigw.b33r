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
            var pubs = GetInitialPubDataset();

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

        public List<Pub> GetInitialPubDataset()
        {
            List<Pub> result = new List<Pub>
            {
                new Pub()
                {
                    ID = Guid.NewGuid(),
                    ImageURL = "https://media-cdn.tripadvisor.com/media/photo-s/03/8f/12/65/vinateria-arde-lucus.jpg",
                    Location = new Location(){Latitud = 43.539980, Longitud = -5.656210},
                    Name = "Arde Lvcvs",
                    Votes = new List<Vote>(){ new Vote(){Id = Guid.NewGuid(), Msg = "Buena variedad de cervezas y pinchos", Value = 4}}
                },
                new Pub()
                {
                    ID = Guid.NewGuid(),
                    ImageURL = "http://4.bp.blogspot.com/-Wmtc7DITpEQ/UaJidnpG8RI/AAAAAAAAABI/Tgc5t40m0CE/s1600/Alt+Strasse+puerta.jpg",
                    Location = new Location(){Latitud = 43.544475, Longitud = -5.662819},
                    Name = "Alt Strasse",
                    Votes = new List<Vote>(){ new Vote(){Id = Guid.NewGuid(), Msg = "Buena variedad de cervezas de barril y unas hamburguesas muy buenas", Value = 5}}
                },
                new Pub()
                {
                    ID = Guid.NewGuid(),
                    ImageURL = "https://birrapedia.com/img/modulos/empresas/ebd/cerveceria-vincer_14670422331801_g.jpg",
                    Location = new Location(){Latitud = 43.538906, Longitud = -5.653306},
                    Name = "Vincert",
                    Votes = new List<Vote>(){ new Vote(){Id = Guid.NewGuid(), Msg = "Cervezas y música, qué mas se puede pedir!", Value = 4}}
                },
                new Pub()
                {
                    ID = Guid.NewGuid(),
                    ImageURL = "https://nosolocachopos.files.wordpress.com/2018/03/img-20180307-wa0004.jpg?w=1400",
                    Location = new Location(){Latitud = 43.541226, Longitud = -5.660072},
                    Name = "Honky Tonk",
                    Votes = new List<Vote>(){ new Vote(){Id = Guid.NewGuid(), Msg = "Música y cerveza, la mejor manera de pasar la tarde", Value = 4}}
                }
            };

            return result;
        }
    }
}