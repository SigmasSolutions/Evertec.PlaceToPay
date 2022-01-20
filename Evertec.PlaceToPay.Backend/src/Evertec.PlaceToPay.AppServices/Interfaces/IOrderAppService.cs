using Evertec.PlaceToPay.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.AppServices.Interfaces
{
    public interface IOrderAppService
    {
        public Task<ServiceResult<List<Orders>>> GetOrders();
        public Task<ServiceResult<Orders>> GetOrder(int orderId);
        public Task<ServiceResult<Orders>> CreateOrder(Orders order);
    }
}
