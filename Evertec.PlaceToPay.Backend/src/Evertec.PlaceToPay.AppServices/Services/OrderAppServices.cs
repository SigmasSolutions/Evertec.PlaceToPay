using Evertec.PlaceToPay.AppServices.Interfaces;
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.AppServices.Services
{
    public class OrderAppServices: IOrderAppService
    {
        private readonly IOrderDomainService service;

        public OrderAppServices(IOrderDomainService service)
        {
            this.service = service;
        }

        public Task<ServiceResult<Orders>> CreateOrder(Orders order)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResult<Orders>> GetOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResult<List<Orders>>> GetOrders()
        {
            throw new NotImplementedException();
        }
    }
}
