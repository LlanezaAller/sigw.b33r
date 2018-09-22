using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace B33rServices.Model
{
    public class Pub
    {
        public Pub()
        {
        }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        private Guid id { get; set; }

        private string name { get; set; }
        private Location location { get; set; }
        private string imageURL { get; set; }
        private IEnumerable<Vote> votes { get; set; }

        public Guid ID
        {
            get => id;
            set => this.id = value;
        }

        public string Name
        {
            get => name;
            set => this.name = value;
        }

        public Location Location
        {
            get => location;
            set => this.location = value;
        }

        public string ImageURL
        {
            get => imageURL;
            set => this.imageURL = value;
        }

        public IEnumerable<Vote> Votes
        {
            get => votes;
            set => this.votes = value;
        }
    }
}