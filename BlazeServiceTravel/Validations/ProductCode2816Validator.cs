using FluentValidation;
using BlazeServiceTravel.Models.Dto;

namespace BlazeServiceTravel.Validations
{
    public class ProductCode2816Validator : AbstractValidator<TravelDto>
    {
        public ProductCode2816Validator()
        {
            RuleFor(x => x.TravelDays).GreaterThan(0).WithMessage("Travel days must be at least 1 for ProductCode 2816.");
            // Add more specific validations for ProductCode 2816
        }
    }
}
