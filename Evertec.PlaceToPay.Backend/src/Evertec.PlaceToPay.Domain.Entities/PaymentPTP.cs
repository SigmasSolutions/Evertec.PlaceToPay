using System;
using System.Collections.Generic;
using System.Text;

namespace Evertec.PlaceToPay.Domain.Entities
{
    public class PaymentPTP
    {
        public string reference { get; set; }
        public string description { get; set; }
        public Amount amount { get; set; }
        public bool allowPartial { get; set; }
    }
}
