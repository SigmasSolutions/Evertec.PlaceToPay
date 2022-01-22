using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Evertec.PlaceToPay.Domain.Entities
{
    public class Users
    {
        public Users()
        {
            Orders = new HashSet<Orders>();
        }

        public Guid UserId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Mobile { get; set; }

        [JsonIgnore]
        public string Password { get; set; }

        public virtual ICollection<Orders> Orders { get; set; }
    }
}
