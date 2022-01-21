using Evertec.PlaceToPay.Data.Repositories;
using Evertec.PlaceToPay.Domain.Repositories;
using System;
using System.Collections.Generic;

namespace Evertec.PlaceToPay.Data.Ioc
{
    public static class Module
    {
        public static Dictionary<Type, Type> GetTypes()
        {
            Dictionary<Type, Type> dic = new Dictionary<Type, Type>
            {
                {typeof (IAccountRepository), typeof (AccountRepository) },
                {typeof (IOrderRepository), typeof (OrderRepository) },
                {typeof (IPaymentRepository), typeof (PaymentRepository) },
                {typeof (IAuthenticationRepository), typeof (AuthenticationRepository) },
            };

            return dic;
        }
    }
}
