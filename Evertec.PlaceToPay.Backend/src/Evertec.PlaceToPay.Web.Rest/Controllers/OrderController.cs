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
    [EnableCors("CorsPolicy")]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly ILogger<OrderController> _logger;

        public OrderController(ILogger<OrderController> logger)
        {
            _logger = logger;
        }

        [Authorize]
        [HttpGet("GetOrders")]
        public async Task<ServiceResult<List<Orders>>> GetOrders()
        {
            return null;
        }

        [Authorize]
        [HttpGet("GetOrder/{orderId}")]
        public async Task<ServiceResult<Orders>> GetOrder(int orderId)
        {
            return null;
        }

        [Authorize]
        [HttpPost("CreateOrder")]
        public async Task<ServiceResult<Orders>> CreateOrder([FromBody] Orders order)
        {
            return null;
        }
    }
}