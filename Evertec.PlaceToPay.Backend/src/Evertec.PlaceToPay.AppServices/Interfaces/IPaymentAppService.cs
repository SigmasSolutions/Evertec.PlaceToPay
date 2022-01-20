using Evertec.PlaceToPay.Domain.Entities;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.AppServices.Interfaces
{
    public interface IPaymentAppService
    {
        public Task<ServiceResult<Payments>> MakePayment(int orderId);
    }
}
