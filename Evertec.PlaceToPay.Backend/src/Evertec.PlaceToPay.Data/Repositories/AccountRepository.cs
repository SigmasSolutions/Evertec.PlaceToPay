
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Data
{
    public class AccountRepository : RepositoryBase<Users>, IAccountRepository
    {
        private readonly RepositoryContext _repositoryContext;

        public AccountRepository(RepositoryContext repositoryContext)
            : base(repositoryContext)
        {
            this._repositoryContext = repositoryContext;
        }

        public Task<IActionResult> Login(Users user)
        {
            throw new System.NotImplementedException();
        }

        public Task<ServiceResult<Users>> Registration(Users model)
        {
            throw new System.NotImplementedException();
        }
    }
}
