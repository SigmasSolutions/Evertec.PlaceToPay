
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Data.Repositories
{
    public class AccountRepository : RepositoryBase<Users>, IAccountRepository
    {
        private readonly RepositoryContext _repositoryContext;

        public AccountRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
            this._repositoryContext = repositoryContext;
        }

        public Task<Users> Login(Users user)
        {
            throw new System.NotImplementedException();
        }

        public async Task<Users> Registration(Users user)
        {
            return await this.RepositoryContext.Set<Users>().Where(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefaultAsync();
        }
    }
}
