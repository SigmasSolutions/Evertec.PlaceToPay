using System;
using System.Collections.Generic;
using System.Text;

namespace Evertec.PlaceToPay.Domain.Models
{
    public class CreateRequest
    {
        public string locale { get; set; }
        public Auth auth { get; set; }
        public PaymentPTP payment { get; set; }
        public string expiration { get; set; }
        public string returnUrl { get; set; }
        public string ipAddress { get; set; }
        public string userAgent { get; set; }

    }
}
