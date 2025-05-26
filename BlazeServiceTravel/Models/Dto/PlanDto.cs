using System.Collections.Generic;

namespace BlazeServiceTravel.Models.Dto
{
    public class PlanDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal BasePremium { get; set; }
        public string ProductCode { get; set; }
        public ICollection<PlanCoverDto> PlanCovers { get; set; } = new List<PlanCoverDto>();
    }
}


