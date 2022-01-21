namespace Evertec.PlaceToPay.Domain.Services.Interfaces
{
    public interface IAuthenticationDomainService
    {
        string GetNewToken(string user);
    }
}
