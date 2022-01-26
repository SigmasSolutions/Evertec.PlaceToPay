using Evertec.PlaceToPay.AppServices.Interfaces;
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Models;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.AppServices.Services
{
    public class StatusAppServices: IStatusAppService
    {
        private readonly IStatusDomainService _service;

        public StatusAppServices(IStatusDomainService service)
        {
            _service = service;
        }

        public async Task<ServiceResult<List<Status>>> Get()
        {
            return await _service.Get();
        }
    }
}
