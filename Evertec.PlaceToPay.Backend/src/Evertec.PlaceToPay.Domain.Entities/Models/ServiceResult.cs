using FluentValidation.Results;
using System;
using System.Collections.Generic;

namespace Evertec.PlaceToPay.Domain.Models
{
    public class ServiceResult<TResult>
    {
        public bool Success { get; set; }
        public IList<ValidationFailure> Errors { get; set; }
        public IList<ValidationFailure> ErrorsUpload { get; set; }
        public TResult Result { get; set; }
    }
}