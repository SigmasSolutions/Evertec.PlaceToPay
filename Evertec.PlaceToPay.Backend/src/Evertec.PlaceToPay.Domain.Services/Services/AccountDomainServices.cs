using Evertec.PlaceToPay.Domain.Models;
using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Repositories;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using Evertec.PlaceToPay.Utility;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _configuration;

        public AccountDomainServices(IConfiguration configuration, IAccountRepository repository, IAuthenticationDomainService service)
        {
            _repository = repository;
            _service = service;
            _configuration = configuration;
        }

        public async Task<IActionResult> Login(Users user)
        {
            ServiceResult<object> result = new ServiceResult<object>();

            try
            {
                user.Password = Encrypt.EncryptString(user.Password, _configuration["KeyEncription"]);
                user = await _repository.Login(user);

                if (user == null)
                {
                    ValidationFailure validationFailure = new ValidationFailure("User", MessageError.InvalidCredentials);
                    result.Errors = new List<ValidationFailure>() { validationFailure };
                    result.Success = false;
                    return new UnauthorizedResult();
                }
                else
                {
                    object token = await _service.GetNewToken(user);
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

        public async Task<ServiceResult<Users>> Registration(Users user)
        {
            ServiceResult<Users> result = new ServiceResult<Users>();

            try
            {
                Users userExists = await _repository.UsersExists(user);

                if (userExists == null)
                {
                    user.Password = Encrypt.EncryptString(user.Password, _configuration["KeyEncription"]);
                    user.UserId = Guid.NewGuid();
                    await _repository.Registration(user);

                    if (user == null)
                    {
                        ValidationFailure validationFailure = new ValidationFailure("User", MessageError.UserNotSaved);
                        result.Errors = new List<ValidationFailure>() { validationFailure };
                        result.Success = false;
                    }
                    else
                    {
                        result.Success = true;
                    }
                }
                else
                {
                    ValidationFailure validationFailure = new ValidationFailure("User", MessageError.EmailExists);
                    result.Errors = new List<ValidationFailure>() { validationFailure };
                    result.Success = false;
                }

            }
            catch (Exception ex)
            {
                ValidationFailure validationFailure = new ValidationFailure("User", ex.Message);
                result.Errors = new List<ValidationFailure>() { validationFailure };
                result.Success = false;
            }

            return result;
        }
    }
}
