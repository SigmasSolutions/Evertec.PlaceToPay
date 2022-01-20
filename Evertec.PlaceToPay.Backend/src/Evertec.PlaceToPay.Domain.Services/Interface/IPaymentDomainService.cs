using Evertec.PlaceToPay.Domain.Entities;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain.Services.Interfaces
{
    public interface IPaymentDomainService
    {
        public Task<ServiceResult<Payments>> MakePayment(int orderId);
    }
}
