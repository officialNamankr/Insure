using BlazeServiceTravel.DbContexts;
using BlazeServiceTravel.Models;
using BlazeServiceTravel.Models.Dto;
using BlazeServiceTravel.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BlazeServiceTravel.Repository
{
    public class TravelRepository : ITravelRepository
    {
        private readonly ApplicationDBContext _dbContext;
        private ResponseDto _response;
        public TravelRepository(ApplicationDBContext dbContext)
        {
            _dbContext = dbContext;
            _response = new ResponseDto();
        }

        public async Task<ICollection<PlanCover>> GetPlanCoversAsync(int planId)
        {
            return await _dbContext.PlanCovers
                .Where(pc => pc.PlanId == planId)
                .Select(pc => new PlanCover
                {
                    Id = pc.Id,
                    PlanId = pc.PlanId,
                    CoverId = pc.CoverId,
                    SumInsured = pc.SumInsured,
                    Cover = new Cover
                    {
                        Id = pc.Cover.Id,
                        Name = pc.Cover.Name,
                        Description = pc.Cover.Description,
                        

                    }
                })
                .ToListAsync();
        }

        public async Task<ICollection<PlanDto>> GetPlansAsync(string productCode)
        {
            
            var plans = await _dbContext.Plans
            .Where(p => p.ProductCode == productCode)
            .Select(p => new PlanDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                BasePremium = p.BasePremium,
                ProductCode = p.ProductCode,
                PlanCovers = p.PlanCovers.Select(pc => new PlanCoverDto
                {
                    Id = pc.Id,
                    CoverId = pc.CoverId,
                    SumInsured = pc.SumInsured,
                    Cover = new CoverDto
                    {
                        Id = pc.Cover.Id,
                        Name = pc.Cover.Name,
                        Description = pc.Cover.Description
                    }
                }).ToList()
            })
            .ToListAsync();

            return plans;

        }
        
    }
}
