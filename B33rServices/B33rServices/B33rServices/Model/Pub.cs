using System;
using System.Collections.Generic;

namespace B33rServices.Model
{
    public class Pub
    {
        public Pub()
        {
        }

        private Guid id;
        private string name;
        private Location location;
        private string imageURL;
        private IEnumerable<Vote> votes;

        public Guid Id => id;
        public string Name => name;

        public Location Location => location;
        public string ImageURL => imageURL;

        public IEnumerable<Vote> Votes => votes;
    }
}
