using System;

namespace B33rServices.Model
{
    public class Taxi
    {
        public Taxi()
        {
        }

        private string recordId { get; set; }
        private Fields fields { get; set; }

        public string RecordID
        {
            get => recordId;
            set => this.recordId = value;
        }

        public Fields Fields
        {
            get => fields;
            set => this.fields = value;
        }
    }
}