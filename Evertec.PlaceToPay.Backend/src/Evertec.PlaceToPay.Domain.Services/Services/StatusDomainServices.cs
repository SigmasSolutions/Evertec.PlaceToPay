using Evertec.PlaceToPay.Domain.Models;
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Services
{
    public class StatusDomainServices : IStatusDomainService
    {
        private readonly IStatusRepository _repository;

        public StatusDomainServices(IStatusRepository repository)
        {
            _repository = repository;
        }

        public async Task<ServiceResult<List<Status>>> Get()
        {
            ServiceResult<List<Status>> result = new ServiceResult<List<Status>>();
            result.Result = await _repository.Get();
            result.Success = true;
            return result;
        }
    }
}
