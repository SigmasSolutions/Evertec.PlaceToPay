using Evertec.PlaceToPay.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Repositories
{
    public interface IStatusRepository : IRepositoryBase<Status>
    {
        public Task<List<Status>> Get();
    }
}
