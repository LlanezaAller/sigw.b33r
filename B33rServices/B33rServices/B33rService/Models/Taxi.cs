using System;

namespace B33rServices.Model
{
    public class Taxi
    {
        public Taxi()
        {
        }

        private Guid id { get; set; }
        private string recordId { get; set; }
        private Fields fields { get; set; }

        public Guid ID
        {
            get => id;
            set => this.id = value;
        }

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