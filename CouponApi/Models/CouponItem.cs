namespace CouponApi.Models
{
    public class CouponItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public bool Win { get; set; }
    }
}