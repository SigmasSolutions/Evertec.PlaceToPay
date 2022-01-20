using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Evertec.PlaceToPay.Domain.Entities
{
    public class Payments
    {
        public Payments()
        {
        }

        public int OrderId { get; set; }
        public int PaymentId { get; set; }
        public string ProcessUrl { get; set; }
    }
}
