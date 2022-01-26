using System;
using System.Collections.Generic;
using System.Text;

namespace Evertec.PlaceToPay.Domain.Models
{
    public enum StatusEnum
    {
        Created = 1,
        Payed = 2,
        Rejected = 3,
        Pending = 4
    }
}