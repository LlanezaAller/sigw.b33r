using System;
using System.ComponentModel.DataAnnotations;

namespace B33rServices.Model
{
    public class Taxi
    {
        public Taxi()
        {
        }

        //private Guid id { get; set; }
        private string recordId { get; set; }

        private TaxiLocation taxiLocation { get; set; }

        //public Guid ID
        //{
        //    get => id;
        //    set => this.id = value;
        //}

        [Key]
        public string RecordID
        {
            get => recordId;
            set => this.recordId = value;
        }

        public TaxiLocation TaxiLocation
        {
            get => taxiLocation;
            set => this.taxiLocation = value;
        }
    }
}