using Evertec.PlaceToPay.AppServices.Interfaces;
using Evertec.PlaceToPay.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
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
        [HttpPost("CreateOrder")]
        public async Task<ServiceResult<Orders>> CreateOrder([FromBody] Orders order)
        {
            return await _orderAppService.CreateOrder(order);
        }
    }
}