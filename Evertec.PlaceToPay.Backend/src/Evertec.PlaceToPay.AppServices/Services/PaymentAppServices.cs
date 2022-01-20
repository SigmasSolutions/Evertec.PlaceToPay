using Evertec.PlaceToPay.AppServices.Interfaces;
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.AppServices.Services
{
    public class PaymentAppServices: IPaymentAppService
    {
        private readonly IPaymentDomainService service;

        public PaymentAppServices(IPaymentDomainService service)
        {
            this.service = service;
        }

        public Task<ServiceResult<Payments>> MakePayment(int orderId)
        {
            throw new NotImplementedException();
        }
    }
}
