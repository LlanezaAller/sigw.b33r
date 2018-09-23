using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace B33rService.Models
{
    public class TaxiGijon
    {
        public class Parameters
        {
            public List<string> dataset { get; set; }
            public string timezone { get; set; }
            public int rows { get; set; }
            public string format { get; set; }
            public List<string> facet { get; set; }
        }

        public class Fields
        {
            public double latitud { get; set; }
            public string parada { get; set; }
            public List<double> location { get; set; }
            public double longitud { get; set; }
        }

        public class Geometry
        {
            public string type { get; set; }
            public List<double> coordinates { get; set; }
        }

        public class Record
        {
            public string datasetid { get; set; }
            public string recordid { get; set; }
            public Fields fields { get; set; }
            public Geometry geometry { get; set; }
            public DateTime record_timestamp { get; set; }
        }

        public class Facet
        {
            public string name { get; set; }
            public string path { get; set; }
            public int count { get; set; }
            public string state { get; set; }
        }

        public class FacetGroup
        {
            public string name { get; set; }
            public List<Facet> facets { get; set; }
        }

        public class RootObject
        {
            public int nhits { get; set; }
            public Parameters parameters { get; set; }
            public List<Record> records { get; set; }
            public List<FacetGroup> facet_groups { get; set; }
        }
    }
}