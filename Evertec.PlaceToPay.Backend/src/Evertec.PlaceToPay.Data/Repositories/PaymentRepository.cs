
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
    public class PaymentRepository : RepositoryBase<Payments>, IPaymentRepository
    {
        private readonly RepositoryContext _repositoryContext;

        public PaymentRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
            this._repositoryContext = repositoryContext;
        }

        public async Task<Payments> GetPayment(Guid paymentId)
        {
            return await this.RepositoryContext.Set<Payments>().Where(x => x.PaymentId == paymentId).FirstOrDefaultAsync();
        }
    }
}
