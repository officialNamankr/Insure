using BlazeServiceTravel.Models;
using BlazeServiceTravel.Models.Dto;

namespace BlazeServiceTravel.Repository.Interfaces
{
    public interface ITravelRepository
    {
        Task<ICollection<PlanDto>> GetPlansAsync(string productCode);
        Task<ICollection<PlanCover>> GetPlanCoversAsync(int planId);
    }
}
