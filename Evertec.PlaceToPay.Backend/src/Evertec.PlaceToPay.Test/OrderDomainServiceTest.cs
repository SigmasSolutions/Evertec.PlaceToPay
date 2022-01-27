using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Models;
using Evertec.PlaceToPay.Domain.Repositories;
using Evertec.PlaceToPay.Domain.Services;
using Moq;
using System;
using System.Threading.Tasks;
using Xunit;

namespace Evertec.PlaceToPay.Test
{
    public class OrderDomainServiceTest
    {
        [Fact]
        public async Task CreateOrder()
        {
            Orders order = InitializeObject();
            ServiceResult<Orders> result = new ServiceResult<Orders>();
            Mock<IOrderRepository> orderRepositoty = new Mock<IOrderRepository>();
            orderRepositoty.Setup(x => x.CreateOrder(order)).Returns(Task.FromResult(result));
            OrderDomainServices orderDomain = new OrderDomainServices(orderRepositoty.Object);
            await orderDomain.CreateOrder(order);
        }

        private Orders InitializeObject()
        {
            Orders order = new Orders();
            order.Amount = 100;
            order.Description = "Test";
            order.OrderId = Guid.NewGuid();
            order.Reference = 2767;
            order.StatusId = (int)StatusEnum.Created;
            return order;

        }
    }
}
