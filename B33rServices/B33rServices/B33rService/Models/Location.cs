using System;

namespace B33rServices.Model
{
    public class Location
    {
        public Location()
        {
        }

        private double latitud { get; set; }
        private double longitud { get; set; }

        public double Latitud
        {
            get => latitud;
            set => this.latitud = value;
        }

        public double Longitud
        {
            get => longitud;
            set => this.longitud = value;
        }
    }
}