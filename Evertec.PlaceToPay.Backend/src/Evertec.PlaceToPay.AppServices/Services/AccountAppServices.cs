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
        private readonly IAccountDomainService service;

        public AccountAppServices(IAccountDomainService service)
        {
            this.service = service;
        }

        public Task<IActionResult> Login(Users user)
        {
            throw new NotImplementedException();
        }

        public Task<ServiceResult<Users>> Registration(Users model)
        {
            throw new NotImplementedException();
        }
    }
}
