using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Evertec.PlaceToPay.Domain.Entities
{
    public class Users
    {
        public Users()
        {
        }

        public int UserId { get; set; }
        public string Name { get; set; }
        public string Mobile { get; set; }
        public string Email { get; set; }
    }
}
