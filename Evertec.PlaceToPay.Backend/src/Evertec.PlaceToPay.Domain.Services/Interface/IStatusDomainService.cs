using Evertec.PlaceToPay.Domain.Models;
using Evertec.PlaceToPay.Domain.Entities;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Evertec.PlaceToPay.Domain.Services.Interfaces
{
    public interface IStatusDomainService
    {
        public Task<ServiceResult<List<Status>>> Get();
    }
}
