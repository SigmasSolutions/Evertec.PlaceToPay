using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Services
{
    public class AccountDomainServices : IAccountDomainService
    {
        private readonly IAccountRepository _repository;
        private readonly IAuthenticationDomainService _service;

        public AccountDomainServices(IAccountRepository repository, IAuthenticationDomainService service)
        {
            _repository = repository;
            _service = service;
        }

        public async Task<IActionResult> Login(Users user)
        {
            ServiceResult<object> result = new ServiceResult<object>();

            try
            {
                user = await _repository.Login(user);

                if (user == null)
                {
                    ValidationFailure validationFailure = new ValidationFailure("User", MessageError.InvalidCredentials);
                    result.Errors = new List<ValidationFailure>() { validationFailure };
                    result.Success = false;
                }
                else
                {
                    object token = _service.GetNewToken(user.Name);
                    result.Success = true;
                    result.Result = token;
                }

            }
            catch (Exception ex)
            {
                ValidationFailure validationFailure = new ValidationFailure("User", ex.Message);
                result.Errors = new List<ValidationFailure>() { validationFailure };
                result.Success = false;
            }

            return new OkObjectResult(result);
        }

        public Task<ServiceResult<Users>> Registration(Users model)
        {
            throw new NotImplementedException();
        }
    }
}
