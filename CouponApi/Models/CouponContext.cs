using Microsoft.EntityFrameworkCore;

namespace CouponApi.Models
{
    public class CouponContext : DbContext
    {
        public CouponContext(DbContextOptions<CouponContext> options)
            : base(options)
        {
        }

        public DbSet<CouponItem> CouponItems { get; set; }
    }
}