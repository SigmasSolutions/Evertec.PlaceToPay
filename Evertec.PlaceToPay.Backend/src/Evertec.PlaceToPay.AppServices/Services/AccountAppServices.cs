using Evertec.PlaceToPay.AppServices.Interfaces;
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.AppServices.Services
{
    public class AccountAppServices: IAccountAppService
    {
        private readonly IAccountDomainService _service;

        public AccountAppServices(IAccountDomainService service)
        {
            _service = service;
        }

        public async Task<IActionResult> Login(Users user)
        {
            return await _service.Login(user);
        }

        public async Task<ServiceResult<Users>> Registration(Users user)
        {
            return await _service.Registration(user);
        }
    }
}
