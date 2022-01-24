using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Services.Interfaces
{
    public interface IAccountDomainService
    {
        public Task<IActionResult> Login(Users user);
        public Task<ServiceResult<Users>> Registration(Users model);
    }
}
