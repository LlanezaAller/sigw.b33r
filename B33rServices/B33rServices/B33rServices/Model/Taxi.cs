using System;
namespace B33rServices.Model
{
    public class Taxi
    {
        public Taxi()
        {
        }

        private string recordId;
        private Fields fields;

        public string RecordId => recordId;
        public Fields Fields => fields;
    }
}
