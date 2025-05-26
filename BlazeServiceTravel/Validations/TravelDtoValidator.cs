using FluentValidation;
using BlazeServiceTravel.Models.Dto;

namespace BlazeServiceTravel.Validations
{
    public class TravelDtoValidator : AbstractValidator<TravelDto>
    {
        public TravelDtoValidator()
        {
            // Common validations
            RuleFor(x => x.JourneyStartDate).NotEmpty();
            RuleFor(x => x.JourneyEndDate).NotEmpty();
            RuleFor(x => x.TravelDays).GreaterThan(0);
            RuleFor(x => x.PolicyName).NotEmpty();
            RuleFor(x => x.ProductCode).NotEmpty();
            RuleFor(x => x.Dob).NotEmpty();
            RuleFor(x => x.IsTravelerResidentIndian).NotNull();
            RuleFor(x => x.IsTravelerOnImmigrationVisa).NotNull();
            RuleFor(x => x.IsTravelSportActivity).NotNull();
            RuleFor(x => x.IsVisitingUSACanada).NotNull();
            RuleFor(x => x.IsTravellingToSchegen).NotNull();

            // Conditional validations based on ProductCode
            When(x => x.ProductCode == "2816", () =>
            {
                Include(new ProductCode2816Validator());
            });

            When(x => x.ProductCode == "2817", () =>
            {
                Include(new ProductCode2817Validator());
            });
        }
    }
}
