using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlazeServiceTravel.Models
{
    public class PlanCover
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public int PlanId { get; set; }

        [Required]
        public int CoverId { get; set; }

        [ForeignKey("PlanId")]
        public Plan Plan { get; set; }

        [ForeignKey("CoverId")]
        public Cover Cover { get; set; } 

        public decimal? SumInsured { get; set; } = 0;
    }
}
