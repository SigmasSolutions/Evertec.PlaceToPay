
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Data
{
    public class OrderRepository : RepositoryBase<Orders>, IOrderRepository
    {
        private readonly RepositoryContext _repositoryContext;

        public OrderRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
            this._repositoryContext = repositoryContext;
        }

        public Task<ServiceResult<Orders>> CreateOrder(Orders order)
        {
            throw new System.NotImplementedException();
        }

        public Task<ServiceResult<Orders>> GetOrder(int orderId)
        {
            throw new System.NotImplementedException();
        }

        public Task<ServiceResult<List<Orders>>> GetOrders()
        {
            throw new System.NotImplementedException();
        }
    }
}
