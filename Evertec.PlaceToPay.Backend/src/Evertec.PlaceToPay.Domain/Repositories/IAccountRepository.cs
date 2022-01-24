using Evertec.PlaceToPay.Domain.Entities;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Repositories
{
    public interface IAccountRepository : IRepositoryBase<Users>
    {
        public Task<Users> Login(Users user);
        public Task Registration(Users user);
        public Task<Users> UsersExists(Users user);
    }
}
