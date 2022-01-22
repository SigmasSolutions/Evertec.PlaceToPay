using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using Evertec.PlaceToPay.Utility;
using FluentValidation.Results;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Services
{
    public class PaymentDomainServices : IPaymentDomainService
    {
        private readonly IPaymentRepository _repository;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly PlaceToPayAuthentication _placeToPayAuthentication;
        private readonly IConfiguration _configuration;
        private readonly IOrderRepository _orderRepository;

        public PaymentDomainServices(IConfiguration configuration, IHttpClientFactory httpClientFactory, IPaymentRepository repository, IOrderRepository orderRepository, PlaceToPayAuthentication placeToPayAuthentication)
        {
            _repository = repository;
            _httpClientFactory = httpClientFactory;
            _placeToPayAuthentication = placeToPayAuthentication;
            _configuration = configuration;
            _orderRepository = orderRepository;
        }

        public async Task<ServiceResult<Payments>> MakePayment(Guid orderId)
        {
            ServiceResult<Payments> result = new ServiceResult<Payments>();

            try
            {
                Orders order = await _orderRepository.GetOrder(orderId);

                if (order.StatusId != (int)StatusEnum.Payed)
                {
                    Guid paymentId = Guid.NewGuid();
                    CreateRequest createRequestquest = CreateRequestPayment(order, paymentId);
                    var httpClient = _httpClientFactory.CreateClient();
                    string request = JsonConvert.SerializeObject(createRequestquest);
                    var response = await httpClient.PostAsync(_configuration["BaseUrlPlaceToPay"], new StringContent(request, Encoding.UTF8, "application/json"));
                    ResponsePlaceToPay responsePlaceToPay = JsonConvert.DeserializeObject<ResponsePlaceToPay>(await response.Content.ReadAsStringAsync());
                    Payments payment = CreatePayment(orderId, paymentId, responsePlaceToPay.processUrl, responsePlaceToPay.requestId);
                    result.Result = payment;
                    result.Success = true;
                }
                else
                {
                    ValidationFailure validationFailure = new ValidationFailure("Payment", MessageError.PaymentDone);
                    result.Errors = new List<ValidationFailure>() { validationFailure };
                    result.Success = false;
                }

            }
            catch (Exception ex)
            {
                ValidationFailure validationFailure = new ValidationFailure("Payment", MessageError.PaymentError);
                result.Errors = new List<ValidationFailure>() { validationFailure };
                result.Success = false;
            }

            return result;
        }

        public async Task<ServiceResult<Payments>> UpdatePayment(Guid orderId, Guid paymentId)
        {
            ServiceResult<Payments> result = new ServiceResult<Payments>();

            try
            {
                Payments payment = await _repository.GetPayment(paymentId);
                CreateRequestQuery createRequestQuery = BuildCreateRequestQuery();
                var httpClient = _httpClientFactory.CreateClient();
                string request = JsonConvert.SerializeObject(createRequestQuery);
                var response = await httpClient.PostAsync($"{_configuration["BaseUrlPlaceToPay"]}/{payment.RequestId}", new StringContent(request, Encoding.UTF8, "application/json"));
                ResponsePlaceToPay responsePlaceToPay = JsonConvert.DeserializeObject<ResponsePlaceToPay>(await response.Content.ReadAsStringAsync());
                Payments paymentUpdate = await UpdatePayment(payment, responsePlaceToPay);
                await UpdateOrder(orderId, responsePlaceToPay);
                result.Result = paymentUpdate;
                result.Success = true;

            }
            catch (Exception ex)
            {
                ValidationFailure validationFailure = new ValidationFailure("Payment", MessageError.PaymentError);
                result.Errors = new List<ValidationFailure>() { validationFailure };
                result.Success = false;
            }

            return result;
        }

        private async Task<Payments> UpdatePayment(Payments payment, ResponsePlaceToPay responsePlaceToPay)
        {
            StatusEnum status = GetStatusPayment(responsePlaceToPay.status.status);
            payment.StatusId = (int)status;
            await _repository.Update(payment);
            return payment;
        }

        private StatusEnum GetStatusPayment(string status)
        {
            StatusEnum statusEnum = StatusEnum.Created;

            switch (status)
            {
                case "APPROVED":
                    statusEnum = StatusEnum.Payed;
                    break;
                case "REJECTED":
                    statusEnum = StatusEnum.Rejected;
                    break;
                default:
                    break;
            }

            return statusEnum;
        }

        private async Task UpdateOrder(Guid orderId, ResponsePlaceToPay responsePlaceToPay)
        {
            StatusEnum status = GetStatusPayment(responsePlaceToPay.status.status);
            Orders order = await _orderRepository.GetOrder(orderId);
            order.StatusId = (int)status;
            await _orderRepository.Update(order);
        }

        private CreateRequestQuery BuildCreateRequestQuery()
        {
            CreateRequestQuery createRequestQuery = new CreateRequestQuery();
            Auth auth = new Auth();
            auth.login = _placeToPayAuthentication.getLogin();
            auth.nonce = _placeToPayAuthentication.getNonce();
            auth.seed = _placeToPayAuthentication.getSeed();
            auth.tranKey = _placeToPayAuthentication.getTranKey();
            createRequestQuery.auth = auth;
            return createRequestQuery;
        }

        private Payments CreatePayment(Guid orderId, Guid paymentId, string processUrl, int requestId)
        {
            Payments payment = new Payments();
            payment.OrderId = orderId;
            payment.PaymentId = paymentId;
            payment.ProcessUrl = processUrl;
            payment.StatusId = (int)StatusEnum.Created;
            payment.RequestId = requestId;
            _repository.Create(payment);
            return payment;
        }

        private CreateRequest CreateRequestPayment(Orders order, Guid paymentId)
        {
            CreateRequest createRequest = new CreateRequest();
            createRequest.locale = "es_CO";
            createRequest.auth = new Auth();
            createRequest.auth.login = _placeToPayAuthentication.getLogin();
            createRequest.auth.nonce = _placeToPayAuthentication.getNonce();
            createRequest.auth.seed = _placeToPayAuthentication.getSeed();
            createRequest.auth.tranKey = _placeToPayAuthentication.getTranKey();
            createRequest.payment = new PaymentPTP();
            createRequest.payment.allowPartial = false;
            createRequest.payment.amount = new Amount();
            createRequest.payment.amount.currency = "USD";
            createRequest.payment.amount.total = Convert.ToInt32(order.Amount);
            createRequest.payment.description = order.Description;
            createRequest.payment.reference = order.Reference.ToString();
            createRequest.expiration = (DateTime.Now.AddMinutes(30)).ToString("yyyy-MM-ddTHH:mm:sszzz");
            createRequest.ipAddress = "127.0.0.1";
            createRequest.userAgent = "PlacetoPay Sandbox";
            createRequest.returnUrl = $"{_configuration["ReturnUrlPlaceToPay"]}/{order.OrderId}/{paymentId}";
            return createRequest;
        }

    }
}
