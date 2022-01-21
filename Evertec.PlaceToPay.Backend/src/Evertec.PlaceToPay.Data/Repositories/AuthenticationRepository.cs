using Evertec.PlaceToPay.Domain;
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Data.Repositories
{
    public class AuthenticationRepository : RepositoryBase<Users>, IAuthenticationRepository
    {
        private readonly RepositoryContext _repositoryContext;

        public AuthenticationRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
            this._repositoryContext = repositoryContext;
        }

        public async Task<Users> ValidCredentials(string email, string password)
        {
            return await this.RepositoryContext.Set<Users>().Where(x => x.Email == email && x.Password == password).FirstOrDefaultAsync();
        }
    }
}
