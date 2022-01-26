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
    public class StatusController : ControllerBase
    {
        private readonly IStatusAppService _statusAppService;

        public StatusController(IStatusAppService StatusAppService)
        {
            _statusAppService = StatusAppService;
        }

        /*[Authorize]*/
        [AllowAnonymous]
        [HttpGet("Get")]
        public async Task<ServiceResult<List<Status>>> Get()
        {
            return await _statusAppService.Get();
        }
    }
}