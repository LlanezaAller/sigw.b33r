using System;

namespace B33rServices.Model
{
    public class Vote
    {
        public Vote()
        {
            Id = Guid.NewGuid();
        }

        private Guid id { get; set; }
        private string msg { get; set; }
        private int value { get; set; }

        public Guid Id
        {
            get => id;
            set => this.id = value;
        }

        public string Msg
        {
            get => msg;
            set => this.msg = value;
        }

        public int Value
        {
            get => value;
            set => this.value = value;
        }
    }
}