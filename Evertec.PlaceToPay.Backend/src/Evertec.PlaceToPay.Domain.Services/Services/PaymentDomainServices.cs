using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Services
{
    public class PaymentDomainServices: IPaymentDomainService
    {
        private readonly IPaymentRepository repository;

        public PaymentDomainServices(IPaymentRepository repository)
        {
            this.repository = repository;
        }

        public Task<ServiceResult<Payments>> MakePayment(int orderId)
        {
            throw new NotImplementedException();
        }
    }
}
