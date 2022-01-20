using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Services
{
    public class AccountDomainServices : IAccountDomainService
    {
        private readonly IAccountRepository repository;

        public AccountDomainServices(IAccountRepository repository)
        {
            this.repository = repository;
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
