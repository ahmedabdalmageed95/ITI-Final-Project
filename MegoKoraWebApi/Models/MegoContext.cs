namespace MegoKoraWebApi.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class MegoContext : DbContext
    {
        public MegoContext()
            : base("name=MegoContext")
        {
            Configuration.ProxyCreationEnabled = false;
        }

        public virtual DbSet<Client> Client { get; set; }
        public virtual DbSet<Owner> Owner { get; set; }
        public virtual DbSet<Playground> Playground { get; set; }
        public virtual DbSet<Reservation> Reservation { get; set; }
        public virtual DbSet<Reviews> Reviews { get; set; }
        public virtual DbSet<SubPlayground> SubPlayground { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>()
                .Property(e => e.Balance)
                .HasPrecision(19, 4);

            modelBuilder.Entity<Reservation>()
                .Property(e => e.TotalMoney)
                .HasPrecision(19, 4);

            modelBuilder.Entity<SubPlayground>()
                .Property(e => e.Price)
                .HasPrecision(19, 4);
        }
    }
}
