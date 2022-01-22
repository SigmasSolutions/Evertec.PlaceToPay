
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

        public async Task<Users> Login(Users user)
        {
            return await this.RepositoryContext.Set<Users>().Where(x => x.Email == user.Email && x.Password == user.Password).FirstOrDefaultAsync();
        }

        public async Task Registration(Users user)
        {
            await this.Create(user);
        }

        public async Task<Users> UsersExists(Users user)
        {
            return await this.RepositoryContext.Set<Users>().Where(x => x.Email == user.Email).FirstOrDefaultAsync();
        }
    }
}
