using Evertec.PlaceToPay.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Repositories
{
    public interface IPaymentRepository : IRepositoryBase<Payments>
    {
        public Task<Payments> GetPayment(Guid paymentId);
    }
}
