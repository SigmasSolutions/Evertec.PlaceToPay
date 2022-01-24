using System;
using System.Collections.Generic;
using System.Text;

namespace Evertec.PlaceToPay.Domain.Models
{
    public class Auth
    {
        public string login { get; set; }
        public string tranKey { get; set; }
        public string nonce { get; set; }
        public string seed { get; set; }
    }
}
