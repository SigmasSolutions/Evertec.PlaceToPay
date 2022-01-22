using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Evertec.PlaceToPay.Domain.Entities
{
    public class Orders
    {
        public Orders()
        {
            Payments = new HashSet<Payments>();
        }

        public Guid OrderId { get; set; }
        public Guid UserId { get; set; }
        public decimal Amount { get; set; }
        public int StatusId { get; set; }
        public string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public long Reference { get; set; }

        public virtual Status Status { get; set; }
        public virtual Users User { get; set; }
        public virtual ICollection<Payments> Payments { get; set; }
    }
}
