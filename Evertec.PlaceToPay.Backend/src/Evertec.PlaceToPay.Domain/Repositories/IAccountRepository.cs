using Evertec.PlaceToPay.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Repositories
{
    public interface IAccountRepository : IRepositoryBase<Users>
    {
        public Task<Users> Login(Users user);
        public Task<Users> Registration(Users model);
    }
}
