using Evertec.PlaceToPay.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Services.Interfaces
{
    public interface IPaymentDomainService
    {
        public Task<ServiceResult<Payments>> MakePayment(Guid orderId);
        public Task<ServiceResult<Payments>> UpdatePayment(Guid orderId, Guid paymentId);
    }
}
