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
        
        [NotMapped]
        public long Reference { get; set; }

        [NotMapped]
        public virtual Status Status { get; set; }
        [NotMapped]
        public virtual Users User { get; set; }
        [NotMapped]
        public virtual ICollection<Payments> Payments { get; set; }
    }
}
