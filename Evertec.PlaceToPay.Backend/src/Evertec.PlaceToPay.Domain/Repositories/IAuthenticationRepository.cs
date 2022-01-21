using Evertec.PlaceToPay.Domain.Entities;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Repositories
{
    public interface IAuthenticationRepository : IRepositoryBase<Users>
    {
        Task<Users> ValidCredentials(string email, string password);
    }
}
