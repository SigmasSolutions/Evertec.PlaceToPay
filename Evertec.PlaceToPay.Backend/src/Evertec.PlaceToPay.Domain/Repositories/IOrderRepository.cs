using Evertec.PlaceToPay.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Repositories
{
    public interface IOrderRepository : IRepositoryBase<Orders>
    {
        public Task<List<Orders>> GetOrdersByUsers(Guid userId);
        public Task<Orders> GetOrder(Guid orderId);
        public Task CreateOrder(Orders order);
    }
}
