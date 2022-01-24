using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.AppServices.Interfaces
{
    public interface IOrderAppService
    {
        public Task<ServiceResult<List<Orders>>> GetOrdersByUsers(Guid userId);
        public Task<ServiceResult<Orders>> GetOrder(Guid orderId);
        public Task<ServiceResult<Orders>> CreateOrder(Orders order);
    }
}
