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
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentAppService _service;

        public PaymentController(IPaymentAppService service)
        {
            _service = service;
        }

        /*[Authorize]*/
        [AllowAnonymous]
        [HttpPost("MakePayment/{orderId}")]
        public async Task<ServiceResult<Payments>> MakePayment(Guid orderId)
        {
            return await _service.MakePayment(orderId);
        }

        /*[Authorize]*/
        [AllowAnonymous]
        [HttpPost("UpdatePayment/{orderId}/{paymentId}")]
        public async Task<ServiceResult<Payments>> UpdatePayment(Guid orderId, Guid paymentId)
        {
            return await _service.UpdatePayment(orderId, paymentId);
        }
    }
}
