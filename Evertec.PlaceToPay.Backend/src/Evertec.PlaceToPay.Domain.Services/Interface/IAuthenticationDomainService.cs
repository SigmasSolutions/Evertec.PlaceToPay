using Evertec.PlaceToPay.Domain.Entities;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Services.Interfaces
{
    public interface IAuthenticationDomainService
    {
        Task<object> GetNewToken(Users user);
    }
}
