using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Evertec.PlaceToPay.Domain.Models
{
    public class SwaggerConfiguration
    {
        /// <summary>
        /// <para>Foo API v1</para>
        /// </summary>
        public string EndpointDescription { get; }

        /// <summary>
        /// <para>/swagger/v1/swagger.json</para>
        /// </summary>
        public string EndpointSwaggerJson { get; }

        /// <summary>
        /// <para>[ContactName]</para>
        /// </summary>
        public string ContactName { get; }

        /// <summary>
        /// <para>[ContactUrl]</para>
        /// </summary>
        public System.Uri ContactUrl { get; }

        /// <summary>
        /// <para>[ContactEmail]</para>
        /// </summary>
        public string ContactEmail { get; }

        /// <summary>
        /// <para>API {Nombre Proyecto}</para>
        /// </summary>
        public string DocInfoTitle { get; }

        /// <summary>
        /// <para>v1</para>
        /// </summary>
        public string DocInfoVersion { get; }

        /// <summary>
        /// <para>API {Nombre Proyecto} - Web API in ASP.NET Core 3.1</para>
        /// </summary>
        public string DocInfoDescription { get; }


        /// <summary>
        ///
        /// </summary>
        /// <param name="configuration"></param>
        public SwaggerConfiguration(IConfiguration configuration)
        {
            if (configuration != null)
            {
                EndpointDescription = configuration.GetSection("SwaggerConfiguration:" + nameof(EndpointDescription)).Value;
                EndpointSwaggerJson = configuration.GetSection("SwaggerConfiguration:" + nameof(EndpointSwaggerJson)).Value;
                ContactName = configuration.GetSection("SwaggerConfiguration:" + nameof(ContactName)).Value;
                ContactUrl = new System.Uri(configuration.GetSection("SwaggerConfiguration:" + nameof(ContactUrl)).Value);
                ContactEmail = configuration.GetSection("SwaggerConfiguration:" + nameof(ContactEmail)).Value;
                DocInfoTitle = configuration.GetSection("SwaggerConfiguration:" + nameof(DocInfoTitle)).Value;
                DocInfoVersion = configuration.GetSection("SwaggerConfiguration:" + nameof(DocInfoVersion)).Value;
                DocInfoDescription = configuration.GetSection("SwaggerConfiguration:" + nameof(DocInfoDescription)).Value;
            }
        }
    }
}
