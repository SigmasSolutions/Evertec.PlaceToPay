using System;
using System.Collections.Generic;
using System.Text;

namespace Evertec.PlaceToPay.Domain.Entities
{
    public class Amount
    {
        public string currency { get; set; }
        public int total { get; set; }
    }
}
