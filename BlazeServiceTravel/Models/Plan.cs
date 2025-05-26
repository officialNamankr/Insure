using System.ComponentModel.DataAnnotations;

namespace BlazeServiceTravel.Models
{
    public class Plan
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal BasePremium { get; set; }
        [Required]
        public string ProductCode { get; set; }
        public ICollection<PlanCover> PlanCovers { get; set; } = new HashSet<PlanCover>();

    }
}
