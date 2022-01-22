
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Data.Repositories
{
    public class OrderRepository : RepositoryBase<Orders>, IOrderRepository
    {
        private readonly RepositoryContext _repositoryContext;

        public OrderRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
            this._repositoryContext = repositoryContext;
        }

        public async Task CreateOrder(Orders order)
        {
            await this.Create(order);
        }

        public async Task<Orders> GetOrder(Guid orderId)
        {
            return await this.RepositoryContext.Set<Orders>().Where(x => x.OrderId == orderId).FirstOrDefaultAsync();
        }

        public async Task<List<Orders>> GetOrdersByUsers(Guid userId)
        {
            return await this.RepositoryContext.Set<Orders>().Where(x => x.UserId == userId).ToListAsync();
        }
    }
}
