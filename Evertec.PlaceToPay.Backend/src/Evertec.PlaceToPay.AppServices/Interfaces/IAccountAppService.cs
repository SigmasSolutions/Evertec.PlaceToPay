using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.AppServices.Interfaces
{
    public interface IAccountAppService
    {
        public Task<IActionResult> Login(Users user);
        public Task<ServiceResult<Users>> Registration(Users model);
    }
}
