using Evertec.PlaceToPay.Domain.Models;
using Evertec.PlaceToPay.Domain.Repositories;
using Evertec.PlaceToPay.Domain.Services;
using Evertec.PlaceToPay.Utility;
using FluentValidation.Results;
using Microsoft.Extensions.Configuration;
using Moq;
using Moq.Protected;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace Evertec.PlaceToPay.Test
{
    public class PaymentDomainServiceTest
    {
        [Fact]
        public async Task PayOrderWithOrderInStatusPayedShouldReturnPaymentDone()
        {
            Orders order = InitializeObject();
            var inMemorySettings = new Dictionary<string, string> {
                {"LoginPlaceToPay", "6dd490faf9cb87a9862245da41170ff2"},
                {"TranKeyPlaceToPay", "iQhxZqnRbJe"},
            };

            IConfiguration configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();
            ServiceResult<Payments> result = new ServiceResult<Payments>();
            ValidationFailure validationFailure = new ValidationFailure("Payment", MessageError.PaymentDone);
            result.Errors = new List<ValidationFailure>() { validationFailure };
            result.Success = false;
            Mock<IOrderRepository> orderRepositoty = new Mock<IOrderRepository>();
            Mock<IPaymentRepository> paymentRepository = new Mock<IPaymentRepository>();
            Mock<IHttpClientFactory> httpClientFactory = new Mock<IHttpClientFactory>();
            orderRepositoty.Setup(x => x.GetOrder(order.OrderId)).Returns(Task.FromResult(order));
            PlaceToPayAuthentication placeToPayAuthentication = new PlaceToPayAuthentication(configuration);
            PaymentDomainServices orderDomain = new PaymentDomainServices(configuration, httpClientFactory.Object, paymentRepository.Object, orderRepositoty.Object, placeToPayAuthentication);
            ServiceResult<Payments> resultTest = await orderDomain.MakePayment(order.OrderId);
            Assert.Equal(result.Errors[0].ErrorMessage, resultTest.Errors[0].ErrorMessage);
        }
        [Fact]
        public async Task PayOrderWithOrderInStatusCreatedShouldReturnPaymentSucess()
        {
            Orders order = InitializeObject();
            order.StatusId = (int)StatusEnum.Created;
            var inMemorySettings = new Dictionary<string, string> {
                {"LoginPlaceToPay", "6dd490faf9cb87a9862245da41170ff2"},
                {"TranKeyPlaceToPay", "iQhxZqnRbJe"},
                {"BaseUrlPlaceToPay", "https://test.placetopay.com/redirection/api/session/" }
            };

            IConfiguration configuration = new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings)
                .Build();
            ServiceResult<Payments> result = new ServiceResult<Payments>();
            result.Success = true;
            Mock<IOrderRepository> orderRepositoty = new Mock<IOrderRepository>();
            Mock<IPaymentRepository> paymentRepository = new Mock<IPaymentRepository>();
            Mock<IHttpClientFactory> httpClientFactory = new Mock<IHttpClientFactory>();
            ResponsePlaceToPay responsePlaceToPay = new ResponsePlaceToPay();
            responsePlaceToPay.processUrl = "https://checkout-test.placetopay.com/session/1890362/8d349cddfa545a192ac823822b6295fc";
            responsePlaceToPay.requestId = 1890362;
            var mockHttpMessageHandler = new Mock<HttpMessageHandler>();
            mockHttpMessageHandler.Protected()
                .Setup<Task<HttpResponseMessage>>("SendAsync", ItExpr.IsAny<HttpRequestMessage>(), ItExpr.IsAny<CancellationToken>())
                .ReturnsAsync(new HttpResponseMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    Content = new StringContent(JsonConvert.SerializeObject(responsePlaceToPay)),
                });

            Payments payment = new Payments();
            payment.OrderId = order.OrderId;
            payment.PaymentId = Guid.NewGuid();
            payment.ProcessUrl = responsePlaceToPay.processUrl;
            payment.RequestId = responsePlaceToPay.requestId;
            var client = new HttpClient(mockHttpMessageHandler.Object);
            client.BaseAddress = new Uri(configuration["BaseUrlPlaceToPay"]);
            httpClientFactory.Setup(_ => _.CreateClient(It.IsAny<string>())).Returns(client);
            orderRepositoty.Setup(x => x.GetOrder(order.OrderId)).Returns(Task.FromResult(order));
            paymentRepository.Setup(x => x.Create(It.IsAny<Payments>())).Returns(Task.FromResult(payment));
            PlaceToPayAuthentication placeToPayAuthentication = new PlaceToPayAuthentication(configuration);
            PaymentDomainServices orderDomain = new PaymentDomainServices(configuration, httpClientFactory.Object, paymentRepository.Object, orderRepositoty.Object, placeToPayAuthentication);
            ServiceResult<Payments> resultTest = await orderDomain.MakePayment(order.OrderId);
            Assert.Equal(result.Success, resultTest.Success);
        }

        private Orders InitializeObject()
        {
            Orders order = new Orders();
            order.Amount = 100;
            order.Description = "Test";
            order.OrderId = Guid.NewGuid();
            order.Reference = 2767;
            order.StatusId = (int)StatusEnum.Payed;
            return order;

        }
    }
}
