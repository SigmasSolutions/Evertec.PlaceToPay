using Evertec.PlaceToPay.Domain.Repositories;
using Evertec.PlaceToPay.Domain.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
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


        public AuthenticationDomainServices(IConfiguration configuration, IAuthenticationRepository repository)
        {
            this.configuration = configuration;
            this.repository = repository;
        }

        public string GetNewToken(string user)
        {
            var mySecret = configuration["SecretKeyJWT"];
            var mySecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(mySecret));
            var myIssuer = "http://mysite.com";
            var myAudience = "http://myaudience.com";

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.NameIdentifier, user),
                }),
                Expires = DateTime.UtcNow.AddMinutes(10),
                Issuer = myIssuer,
                Audience = myAudience,
                SigningCredentials = new SigningCredentials(mySecurityKey, SecurityAlgorithms.HmacSha256Signature),
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
