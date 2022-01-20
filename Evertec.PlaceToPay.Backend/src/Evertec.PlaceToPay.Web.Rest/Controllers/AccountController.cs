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
    public class AccountController : ControllerBase
    {
        private readonly ILogger<AccountController> _logger;

        public AccountController(ILogger<AccountController> logger)
        {
            _logger = logger;
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] Users user)
        {
            return new OkObjectResult(null);
        }

        [AllowAnonymous]
        [HttpPost("Registration")]
        public async Task<ServiceResult<Users>> Registration([FromBody] Users model)
        {
            ServiceResult<Users> result = new ServiceResult<Users>();
           

            return result;
        }
    }
}
