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
    public class PaymentController : ControllerBase
    {
        private readonly ILogger<PaymentController> _logger;

        public PaymentController(ILogger<PaymentController> logger)
        {
            _logger = logger;
        }

        [Authorize]
        [HttpPost("MakePayment/{orderId}")]
        public async Task<ServiceResult<Payments>> MakePayment(int orderId)
        {
            return null;
        }
    }
}
