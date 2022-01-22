using System;
using System.Collections.Generic;
using System.Text;

namespace Evertec.PlaceToPay.Domain.Entities
{
    public class ResponsePlaceToPay
    {
        public int requestId { get; set; }
        public string processUrl { get; set; }
        public StatusResponse status { get; set; }
    }
}
