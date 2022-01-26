using Evertec.PlaceToPay.AppServices.Interfaces;
using Evertec.PlaceToPay.AppServices.Services;
using System;
using System.Collections.Generic;
using System.Text;

namespace Evertec.PlaceToPay.AppServices.Ioc
{
    public static class Module
    {
        public static Dictionary<Type, Type> GetTypes()
        {
            var dic = new Dictionary<Type, Type>();
            dic.Add(typeof(IAccountAppService), typeof(AccountAppServices));
            dic.Add(typeof(IOrderAppService), typeof(OrderAppServices));
            dic.Add(typeof(IPaymentAppService), typeof(PaymentAppServices));
            dic.Add(typeof(IStatusAppService), typeof(StatusAppServices));
            return dic;
        }
    }
}