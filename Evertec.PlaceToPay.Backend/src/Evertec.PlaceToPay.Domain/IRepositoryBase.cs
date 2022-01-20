using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Domain
{
    public interface IRepositoryBase<T>
    {
        Task<IEnumerable<T>> FindAllAsync();
        IEnumerable<T> FindAll();
        Task<IEnumerable<T>> FindByConditionAsync(Expression<Func<T, bool>> expression);
        Task<T> FindByConditionFirstOrDefaulAsync(Expression<Func<T, bool>> expression);
        Task Create(T entity);
        Task Create(List<T> entities);
        Task Update(T entity);
        Task Update(List<T> entities);
        Task Delete(T entity);
        Task Delete(List<T> entities);
        void Save();
        Task SaveAsync();
    }
}
