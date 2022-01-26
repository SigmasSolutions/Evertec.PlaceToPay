using Evertec.PlaceToPay.AppServices.Interfaces;
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Models;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.AppServices.Services
{
    public class OrderAppServices: IOrderAppService
    {
        private readonly IOrderDomainService _service;

        public OrderAppServices(IOrderDomainService service)
        {
            _service = service;
        }

        public async Task<ServiceResult<Orders>> CreateOrder(Orders order)
        {
            return await _service.CreateOrder(order);
        }

        public async Task<ServiceResult<Orders>> GetOrder(Guid orderId)
        {
            return await _service.GetOrder(orderId);
        }

        public async Task<ServiceResult<List<Orders>>> GetOrdersByUsers(Guid userId)
        {
            return await _service.GetOrdersByUsers(userId);
        }

        public async Task<ServiceResult<Orders>> UpdateOrder(Orders order)
        {
            return await _service.UpdateOrder(order);
        }
    }
}
