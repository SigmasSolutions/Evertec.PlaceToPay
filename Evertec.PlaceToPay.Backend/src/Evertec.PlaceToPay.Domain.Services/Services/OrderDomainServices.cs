using Evertec.PlaceToPay.Domain.Models;
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using FluentValidation.Results;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Services
{
    public class OrderDomainServices : IOrderDomainService
    {
        private readonly IOrderRepository _repository;

        public OrderDomainServices(IOrderRepository repository)
        {
            _repository = repository;
        }

        public async Task<ServiceResult<Orders>> CreateOrder(Orders order)
        {
            ServiceResult<Orders> result = new ServiceResult<Orders>();

            try
            {
                order.OrderId = Guid.NewGuid();
                order.StatusId = (int)StatusEnum.Created;
                await _repository.CreateOrder(order);
                result.Success = true;
                result.Result = order;
            }
            catch (Exception ex)
            {
                ValidationFailure validationFailure = new ValidationFailure("Order", ex.Message);
                result.Errors = new List<ValidationFailure>() { validationFailure };
                result.Success = false;
            }

            return result;
        }

        public async Task<ServiceResult<Orders>> GetOrder(Guid orderId)
        {
            ServiceResult<Orders> result = new ServiceResult<Orders>();
            result.Result = await _repository.GetOrder(orderId);
            result.Success = true;
            return result;
        }

        public async Task<ServiceResult<List<Orders>>> GetOrdersByUsers(Guid userId)
        {
            ServiceResult<List<Orders>> result = new ServiceResult<List<Orders>>();
            result.Result = await _repository.GetOrdersByUsers(userId);
            result.Success = true;
            return result;
        }

        public async Task<ServiceResult<Orders>> UpdateOrder(Orders order)
        {
            ServiceResult<Orders> result = new ServiceResult<Orders>();

            try
            {
                await _repository.Update(order);
                result.Success = true;
                result.Result = order;
            }
            catch (Exception ex)
            {
                ValidationFailure validationFailure = new ValidationFailure("Order", ex.Message);
                result.Errors = new List<ValidationFailure>() { validationFailure };
                result.Success = false;
            }

            return result;
        }
    }
}
