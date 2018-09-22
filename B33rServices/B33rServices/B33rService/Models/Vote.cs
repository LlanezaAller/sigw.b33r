using System;

namespace B33rServices.Model
{
    public class Vote
    {
        public Vote()
        {
        }

        private string msg { get; set; }
        private int value { get; set; }

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