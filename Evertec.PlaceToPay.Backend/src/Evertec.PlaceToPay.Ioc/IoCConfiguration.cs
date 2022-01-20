using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;
using DomainServices = Evertec.PlaceToPay.Domain.Services;
using AppServices = Evertec.PlaceToPay.AppServices;
using Data = Evertec.PlaceToPay.Data;

namespace Evertec.PlaceToPay.Ioc
{
    public static class IoCConfiguration
    {
        public static void Configure(IServiceCollection services)
        {
            Configure(services, Data.Ioc.Module.GetTypes());
            Configure(services, DomainServices.IoC.Module.GetTypes());
            Configure(services, AppServices.Ioc.Module.GetTypes());
        }

        private static void Configure(IServiceCollection services, Dictionary<Type, Type> types)
        {
            foreach (var type in types)
            {
                services.AddScoped(type.Key, type.Value);
            }

        }
    }
}
