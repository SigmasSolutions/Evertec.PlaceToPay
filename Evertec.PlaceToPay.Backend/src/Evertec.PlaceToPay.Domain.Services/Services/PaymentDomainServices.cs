using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Services
{
    public class PaymentDomainServices: IPaymentDomainService
    {
        private readonly IPaymentRepository _repository;
        private readonly IHttpClientFactory _httpClientFactory;

        public PaymentDomainServices(IHttpClientFactory httpClientFactory, IPaymentRepository repository)
        {
            _repository = repository;
            _httpClientFactory = httpClientFactory;
        }

        public Task<ServiceResult<Payments>> MakePayment(int orderId)
        {
            var httpClient = _httpClientFactory.CreateClient();
            return null;
        }
    }
}
