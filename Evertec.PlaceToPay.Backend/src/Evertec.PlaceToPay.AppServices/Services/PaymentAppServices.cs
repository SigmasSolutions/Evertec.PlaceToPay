using Evertec.PlaceToPay.AppServices.Interfaces;
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Models;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.AppServices.Services
{
    public class PaymentAppServices: IPaymentAppService
    {
        private readonly IPaymentDomainService _service;

        public PaymentAppServices(IPaymentDomainService service)
        {
            _service = service;
        }

        public async Task<ServiceResult<Payments>> MakePayment(Guid orderId)
        {
            return await _service.MakePayment(orderId);
        }

        public async Task<ServiceResult<Payments>> UpdatePayment(Guid orderId, Guid paymentId)
        {
            return await _service.UpdatePayment(orderId, paymentId);
        }
    }
}
