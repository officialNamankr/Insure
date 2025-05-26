namespace BlazeServiceTravel.Models.Dto
{
    public class PlanCoverDto
    {
        public int Id { get; set; }
        public int CoverId { get; set; }
        public decimal? SumInsured { get; set; }
        public CoverDto Cover { get; set; }
    }
}


