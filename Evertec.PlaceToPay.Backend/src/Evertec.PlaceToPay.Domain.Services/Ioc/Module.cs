using Evertec.PlaceToPay.Domain.Services.Interfaces;
using System;
using System.Collections.Generic;

namespace Evertec.PlaceToPay.Domain.Services.IoC
{
    public static class Module
    {
        public static Dictionary<Type, Type> GetTypes()
        {
            Dictionary<Type, Type> dic = new Dictionary<Type, Type>
            {
                {typeof (IAccountDomainService), typeof (AccountDomainServices) },
                {typeof (IOrderDomainService), typeof (OrderDomainServices) },
                {typeof (IPaymentDomainService), typeof (PaymentDomainServices) },
            };

            return dic;
        }
    }
}
