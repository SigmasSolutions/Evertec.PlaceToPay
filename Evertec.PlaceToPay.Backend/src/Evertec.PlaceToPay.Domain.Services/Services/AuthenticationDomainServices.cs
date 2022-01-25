using Evertec.PlaceToPay.Domain.Entities;
using Evertec.PlaceToPay.Domain.Models;
using Evertec.PlaceToPay.Domain.Repositories;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Services
{
    public class AuthenticationDomainServices : IAuthenticationDomainService
    {
        private readonly IAuthenticationRepository repository;
        private readonly IConfiguration configuration;
        private readonly JwtIssuerOptions jwtOptions;
        private readonly JsonSerializerSettings serializerSettings;

        public AuthenticationDomainServices(IConfiguration configuration, IAuthenticationRepository repository, IOptions<JwtIssuerOptions> jwtOptions)
        {
            this.configuration = configuration;
            this.repository = repository;
            this.jwtOptions = jwtOptions.Value;
            this.jwtOptions.ValidFor = TimeSpan.FromSeconds(double.Parse(this.configuration["ExpirationJWT"]));
            this.ThrowIfInvalidOptions(this.jwtOptions);

            this.serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };
        }

        private void ThrowIfInvalidOptions(JwtIssuerOptions options)
        {
            if (options == null) throw new ArgumentNullException(nameof(options));

            if (options.ValidFor <= TimeSpan.Zero)
            {
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JwtIssuerOptions.ValidFor));
            }

            if (options.SigningCredentials == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.SigningCredentials));
            }

            if (options.JtiGenerator == null)
            {
                throw new ArgumentNullException(nameof(JwtIssuerOptions.JtiGenerator));
            }
        }

        /// <returns>Date converted to seconds since Unix epoch (Jan 1, 1970, midnight UTC).</returns>
        private long ToUnixEpochDate(DateTime date)
          => (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);

        public async Task<string> GetNewToken(Users user)
        {
            string token = string.Empty;
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, user.Name));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, await this.jwtOptions.JtiGenerator()));
            claims.Add(new Claim(JwtRegisteredClaimNames.Iat, this.ToUnixEpochDate(this.jwtOptions.IssuedAt).ToString(), ClaimValueTypes.Integer64));


            var jwt = new JwtSecurityToken(
             issuer: this.jwtOptions.Issuer,
             audience: this.jwtOptions.Audience,
             claims: claims,
             notBefore: this.jwtOptions.NotBefore,
             expires: this.jwtOptions.Expiration,
             signingCredentials: this.jwtOptions.SigningCredentials);

            token = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                token = token,
                userId = user.UserId,
                email = user.Email,
            };

            var json = JsonConvert.SerializeObject(response, serializerSettings);

            return json;
        }
    }
}
