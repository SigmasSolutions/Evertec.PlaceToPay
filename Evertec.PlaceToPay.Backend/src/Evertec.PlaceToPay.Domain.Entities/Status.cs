using System;
using System.Collections.Generic;

namespace Evertec.PlaceToPay.Domain.Entities
{
    public partial class Status
    {
        public Status()
        {
            Orders = new HashSet<Orders>();
        }

        public int StatusId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Orders> Orders { get; set; }
    }
}
