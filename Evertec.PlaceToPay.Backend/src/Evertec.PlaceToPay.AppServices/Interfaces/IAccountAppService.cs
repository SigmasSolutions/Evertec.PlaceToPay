using Evertec.PlaceToPay.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.AppServices.Interfaces
{
    public interface IAccountAppService
    {
        public Task<IActionResult> Login(Users user);
        public Task<ServiceResult<Users>> Registration(Users model);
    }
}
