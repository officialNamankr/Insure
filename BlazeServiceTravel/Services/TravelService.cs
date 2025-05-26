using System.Diagnostics;
using BlazeServiceTravel.Models;
using BlazeServiceTravel.Models.Dto;
using BlazeServiceTravel.Repository.Interfaces;
using BlazeServiceTravel.Services.Interfaces;

namespace BlazeServiceTravel.Services
{
    public class TravelService : ITravelService
    {
        private readonly ITravelRepository _travelRepository;
        private ResponseDto _response;
        public TravelService(ITravelRepository travelRepository)
        {
            _travelRepository = travelRepository;
            _response = new ResponseDto();
        }

        public async Task<ResponseDto> GetPlansAsync(TravelDto input)
        {
            var plans = await _travelRepository.GetPlansAsync(input.ProductCode);
            if(plans != null)
            {
                foreach (var plan in plans)
                {
                    plan.BasePremium = CalculatePremium(input, plan);
                }
            }
            _response.Result = plans;
            _response.IsSuccess = true;
            return _response;
        }

        public decimal CalculatePremium(TravelDto input, PlanDto plan)
        {
            decimal basePremium = plan.BasePremium;
            decimal ageFactor = (DateTime.Now.Year - input.Dob.Year) * 1.1m;
            decimal travelDaysFactor = input.TravelDays * 1.05m;
            decimal premium = basePremium + ageFactor + travelDaysFactor;
            if (input.IsVisitingUSACanada)
            {
                premium *= 1.2m;
            }
            if (input.IsTravellingToSchegen)
            {
                premium *= 1.15m;
            }
            return premium;
        }
    }
}
