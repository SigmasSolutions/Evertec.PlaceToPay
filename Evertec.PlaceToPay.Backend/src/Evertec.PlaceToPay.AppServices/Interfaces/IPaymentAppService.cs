using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Models;
using System;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.AppServices.Interfaces
{
    public interface IPaymentAppService
    {
        public Task<ServiceResult<Payments>> MakePayment(Guid orderId);
        public Task<ServiceResult<Payments>> UpdatePayment(Guid orderId, Guid paymentId);
    }
}
