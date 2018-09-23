using System;

namespace B33rServices.Model
{
    public class TaxiLocation
    {
        public TaxiLocation()
        {
        }

        private double latitud { get; set; }
        private double longitud { get; set; }
        private string parada { get; set; }

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

        public string Parada
        {
            get => parada;
            set => this.parada = value;
        }

        public static (double, double) ParseData(string value)
        {
            var result = (0.0, 0.0);
            try
            {
                if (value.Contains(" ") && value.Split(' ').Length > 1)
                {
                    var values = value.Split(' ');
                    result.Item1 = Double.Parse(values[1]);
                    result.Item2 = Double.Parse(values[2]);
                }
            }
            catch
            {
            }
            return result;
        }

        public static double ParseSingleData(string value)
        {
            if (double.TryParse(value, out var result))
                return result;
            return 0.0;
        }
    }
}