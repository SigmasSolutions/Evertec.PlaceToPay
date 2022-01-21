using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Services;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Evertec.PlaceToPay
{
    public class Startup
    {
        private readonly SymmetricSecurityKey SigningKey;
        private readonly SwaggerConfiguration SwaggerConfiguration;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            Configuration = configuration;
            string key = Configuration["SecretKeyJWT"];
            SigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key));
            SwaggerConfiguration = new SwaggerConfiguration(Configuration);
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                builder =>
                {
                    builder.WithOrigins(Configuration.GetSection("ConfigurationApplication:CorsPolicyOrigins").Value.Split('|'))
                            .AllowAnyHeader()
                            .AllowAnyMethod();

                });

            });

            services.AddDbContext<RepositoryContext>(x =>
            {
                x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
                sqlServerOptionsAction: sqlOptions =>
                {
                    sqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 10,
                    maxRetryDelay: TimeSpan.FromSeconds(30),
                    errorNumbersToAdd: null);
                });
            });

            services.AddControllers()
                   .AddNewtonsoftJson()
                   .AddJsonOptions(options => options.JsonSerializerOptions.IgnoreNullValues = true)
                   .AddJsonOptions(options => options.JsonSerializerOptions.MaxDepth = int.MaxValue)
                   .ConfigureApiBehaviorOptions(option =>
                   {
                       option.InvalidModelStateResponseFactory = actionContext =>
                       {
                           var modalState = actionContext.ModelState.Values;
                           return new BadRequestObjectResult(modalState);
                       };
                   });

            services.AddHttpClient<IPaymentDomainService, PaymentDomainServices>(client => {
                client.BaseAddress = new Uri(Configuration["BaseUrlPlaceToPay"]);
            }).SetHandlerLifetime(TimeSpan.FromMinutes(5));

            Evertec.PlaceToPay.Ioc.IoCConfiguration.Configure(services);

            AddSwagger(services);
            services.AddHealthChecks();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseStaticFiles();

            app.UseAuthorization();
            app.UseAuthentication();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHealthChecks("/healh", new HealthCheckOptions
                {
                    AllowCachingResponses = false
                });
            });

            app.UseSwagger();

            app.UseSwaggerUI(options =>
            {
                options.SwaggerEndpoint(SwaggerConfiguration.EndpointSwaggerJson, SwaggerConfiguration.EndpointDescription);
                options.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
            });
        }

        /// <summary>
        ///
        /// </summary>
        protected OpenApiInfo GetApiInfo => new OpenApiInfo
        {
            Title = SwaggerConfiguration.DocInfoTitle,
            Version = SwaggerConfiguration.DocInfoVersion,
            Description = SwaggerConfiguration.DocInfoDescription,
            Contact = GetApiContact
        };

        /// <summary>
        ///
        /// </summary>
        protected OpenApiContact GetApiContact => new OpenApiContact
        {
            Name = SwaggerConfiguration.ContactName,
            Url = SwaggerConfiguration.ContactUrl,
            Email = SwaggerConfiguration.ContactEmail
        };

        protected void AddSwagger(IServiceCollection services)
        {
            services.AddSwaggerGen(swagger =>
            {
                swagger.DescribeAllParametersInCamelCase();

                swagger.AddSecurityDefinition("Ocp-Apim-Subscription-Key", new OpenApiSecurityScheme
                {
                    Description = @"Api key needed to access the endpoints. Ocp-Apim-Subscription-Key: My_API_Key",
                    In = ParameterLocation.Header,
                    Name = "Ocp-Apim-Subscription-Key",
                    Type = SecuritySchemeType.ApiKey
                });

                swagger.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Name = "Ocp-Apim-Subscription-Key",
                            Type = SecuritySchemeType.ApiKey,
                            In = ParameterLocation.Header,
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Ocp-Apim-Subscription-Key"
                            },
                         },
                         new List<string>()
                     }
                });

                swagger.SwaggerDoc(SwaggerConfiguration.DocInfoVersion, GetApiInfo);

                swagger.DocInclusionPredicate((docName, description) => true);
                swagger.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());

                var xmlPath = Path.Combine(AppContext.BaseDirectory, $"{Assembly.GetExecutingAssembly().GetName().Name}.XML");
                swagger.IncludeXmlComments(xmlPath);
            });
        }
    }
}
