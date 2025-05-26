using System.ComponentModel.DataAnnotations;

namespace BlazeServiceTravel.Models.Dto
{
    public class TravelDto
    {
        //[Required]
        public DateOnly JourneyStartDate { get; set; }
        //[Required]
        public DateOnly JourneyEndDate { get; set; }
        //[Required]
        public int TravelDays { get; set; }
        //[Required]
        public required string PolicyName { get; set; }
        //[Required]
        public required string ProductCode { get; set; }
        //[Required]
        public DateOnly Dob { get; set; }
        //[Required]
        public bool IsTravelerResidentIndian { get; set; }
        //[Required]
        public bool IsTravelerOnImmigrationVisa { get; set; }
        //[Required]
        public bool IsTravelSportActivity { get; set; }
        public List<string>? SportsActivities { get; set; }
        //[Required]
        public bool IsVisitingUSACanada { get; set; }
        //[Required]
        public bool IsTravellingToSchegen { get; set; }
        public List<string>? SchegenCountries { get; set; }
    }
}
