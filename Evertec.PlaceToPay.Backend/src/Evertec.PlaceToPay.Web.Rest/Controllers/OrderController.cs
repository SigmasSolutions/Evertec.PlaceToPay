using Evertec.PlaceToPay.AppServices.Interfaces;
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IOrderAppService _orderAppService;

        public OrderController(IOrderAppService orderAppService)
        {
            _orderAppService = orderAppService;
        }

        /*[Authorize]*/
        [AllowAnonymous]
        [HttpGet("GetOrdersByUsers/{userId}")]
        public async Task<ServiceResult<List<Orders>>> GetOrdersByUsers(Guid userId)
        {
            return await _orderAppService.GetOrdersByUsers(userId);
        }

        /*[Authorize]*/
        [AllowAnonymous]
        [HttpGet("GetOrder/{orderId}")]
        public async Task<ServiceResult<Orders>> GetOrder(Guid orderId)
        {
            return await _orderAppService.GetOrder(orderId);
        }

        /*[Authorize]*/
        [AllowAnonymous]
        [HttpPost]
        public async Task<ServiceResult<Orders>> CreateOrder([FromBody] Orders order)
        {
            return await _orderAppService.CreateOrder(order);
        }

        /*[Authorize]*/
        [AllowAnonymous]
        [HttpPut]
        public async Task<ServiceResult<Orders>> UpdateOrder([FromBody] Orders order)
        {
            return await _orderAppService.UpdateOrder(order);
        }
    }
}