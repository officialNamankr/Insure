using BlazeServiceTravel.Models;
using BlazeServiceTravel.Models.Dto;

namespace BlazeServiceTravel.Services.Interfaces
{
    public interface ITravelService
    {
        Task<ResponseDto> GetPlansAsync(TravelDto input);
        decimal CalculatePremium(TravelDto input, PlanDto plan);
    }
}
