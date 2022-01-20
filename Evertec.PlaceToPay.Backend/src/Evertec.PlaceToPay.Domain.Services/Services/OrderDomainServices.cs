using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Services
{
    public class OrderDomainServices : IOrderDomainService
    {
        private readonly IOrderRepository repository;

        public OrderDomainServices(IOrderRepository repository)
        {
            this.repository = repository;
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
