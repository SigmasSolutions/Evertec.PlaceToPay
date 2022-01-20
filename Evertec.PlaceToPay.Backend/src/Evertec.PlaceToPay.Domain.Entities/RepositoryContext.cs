using Microsoft.EntityFrameworkCore;

namespace Evertec.PlaceToPay.Domain.Entities
{
    public class RepositoryContext : DbContext
    {
        public RepositoryContext(DbContextOptions<RepositoryContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Orders> Orders { get; set; }
        public virtual DbSet<Payments> payments { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
