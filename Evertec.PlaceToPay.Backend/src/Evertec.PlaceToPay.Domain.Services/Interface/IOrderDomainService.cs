using Evertec.PlaceToPay.Domain.Models;
using Evertec.PlaceToPay.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Services.Interfaces
{
    public interface IOrderDomainService
    {
        public Task<ServiceResult<List<Orders>>> GetOrdersByUsers(Guid userId);
        public Task<ServiceResult<Orders>> GetOrder(Guid orderId);
        public Task<ServiceResult<Orders>> CreateOrder(Orders order);
        public Task<ServiceResult<Orders>> UpdateOrder(Orders order);
    }
}
