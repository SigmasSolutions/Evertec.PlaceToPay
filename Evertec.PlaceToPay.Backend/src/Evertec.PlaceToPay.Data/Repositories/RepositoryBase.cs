using Evertec.PlaceToPay.Domain;
using Evertec.PlaceToPay.Domain.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Evertec.PlaceToPay.Data.Repositories
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        protected RepositoryContext RepositoryContext { get; set; }

        public RepositoryBase(RepositoryContext repositoryContext)
        {
            this.RepositoryContext = repositoryContext;
        }

        public async Task<IEnumerable<T>> FindAllAsync()
        {
            return await this.RepositoryContext.Set<T>().ToListAsync();
        }

        public async Task<IEnumerable<T>> FindByConditionAsync(Expression<Func<T, bool>> expression)
        {
            return await this.RepositoryContext.Set<T>().Where(expression).ToListAsync();
        }

        public async Task<T> FindByConditionFirstOrDefaulAsync(Expression<Func<T, bool>> expression)
        {
            return await this.RepositoryContext.Set<T>().Where(expression).FirstOrDefaultAsync();
        }

        public async Task Create(T entity)
        {
            this.RepositoryContext.Set<T>().Add(entity);
            await this.SaveAsync();
        }

        public async Task Create(List<T> entities)
        {
            this.RepositoryContext.Set<T>().AddRange(entities);
            await this.SaveAsync();
        }


        public async Task Update(T entity)
        {
            this.RepositoryContext.Set<T>().Update(entity);
            await this.SaveAsync();
        }

        public async Task Update(List<T> entities)
        {
            this.RepositoryContext.Set<T>().UpdateRange(entities);
            await this.SaveAsync();
        }

        public async Task Delete(T entity)
        {
            this.RepositoryContext.Set<T>().Remove(entity);
            await this.SaveAsync();
        }

        public async Task Delete(List<T> entities)
        {
            this.RepositoryContext.Set<T>().RemoveRange(entities);
            await this.SaveAsync();
        }

        public async Task SaveAsync()
        {
            await this.RepositoryContext.SaveChangesAsync();
        }

        public void Save()
        {
            this.RepositoryContext.SaveChanges();
        }

        public IEnumerable<T> FindAll()
        {
            return this.RepositoryContext.Set<T>().ToList();
        }
    }
}
