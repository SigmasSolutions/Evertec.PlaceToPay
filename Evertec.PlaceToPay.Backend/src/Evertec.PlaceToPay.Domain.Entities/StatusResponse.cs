using System;
using System.Collections.Generic;
using System.Text;

namespace Evertec.PlaceToPay.Domain.Entities
{
    public class StatusResponse
    {
        public string status { get; set; }
        public string reason { get; set; }
        public string message { get; set; }
        public DateTime date { get; set; }
    }
}
