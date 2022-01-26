using Evertec.PlaceToPay.Domain.Entities.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Evertec.PlaceToPay.Domain.Entities
{
    public class Payments
    {
        public Guid PaymentId { get; set; }
        public Guid OrderId { get; set; }
        public int StatusId { get; set; }
        public DateTime CreatedAt { get; set; }

        public virtual Orders Order { get; set; }
        public string ProcessUrl { get; set; }

        [NotMapped]
        public Payer payer { get; set; }

        public int RequestId { get; set; }
    }
}
