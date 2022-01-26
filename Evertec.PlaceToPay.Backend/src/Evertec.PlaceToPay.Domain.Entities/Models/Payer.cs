using System;
using System.Collections.Generic;
using System.Text;

namespace Evertec.PlaceToPay.Domain.Entities.Models
{
    public class Payer
    {
        public string document { get; set; }
        public string documentType { get; set; }
        public string name { get; set; }
        public string surname { get; set; }
    }
}
