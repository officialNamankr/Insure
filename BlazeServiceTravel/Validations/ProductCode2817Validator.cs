using FluentValidation;
using BlazeServiceTravel.Models.Dto;

namespace BlazeServiceTravel.Validations
{
    public class ProductCode2817Validator : AbstractValidator<TravelDto>
    {
        public ProductCode2817Validator()
        {
            RuleFor(x => x.IsTravelSportActivity).Equal(true).When(x => x.SportsActivities == null || !x.SportsActivities.Any())
                .WithMessage("Sports activities must be specified for ProductCode 2817 if IsTravelSportActivity is true.");
            // Add more specific validations for ProductCode 2817
        }
    }
}
