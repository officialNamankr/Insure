using Microsoft.EntityFrameworkCore;
namespace BlazeServiceTravel.DbContexts
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {
        }
        public DbSet<Models.Plan> Plans { get; set; } = null!;
        public DbSet<Models.Cover> Covers { get; set; } = null!;
        public DbSet<Models.PlanCover> PlanCovers { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.PlanCover>()
                .HasKey(pc => new { pc.PlanId, pc.CoverId });
            modelBuilder.Entity<Models.PlanCover>()
                .HasOne(pc => pc.Plan)
                .WithMany(p => p.PlanCovers)
                .HasForeignKey(pc => pc.PlanId);
            modelBuilder.Entity<Models.PlanCover>()
                .HasOne(pc => pc.Cover)
                .WithMany(c => c.PlanCovers)
                .HasForeignKey(pc => pc.CoverId);
        }
    }
}
