
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Data.Repositories
{
    public class PaymentRepository : RepositoryBase<Payments>, IPaymentRepository
    {
        private readonly RepositoryContext _repositoryContext;

        public PaymentRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
            this._repositoryContext = repositoryContext;
        }

        public Task<ServiceResult<Payments>> MakePayment(int orderId)
        {
            throw new System.NotImplementedException();
        }
    }
}
