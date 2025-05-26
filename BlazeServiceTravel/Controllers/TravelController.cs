using BlazeServiceTravel.Models.Dto;
using BlazeServiceTravel.Services;
using BlazeServiceTravel.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BlazeServiceTravel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelController : ControllerBase
    {
        private readonly ITravelService _travelService;

        public TravelController(ITravelService travelService) 
        {
            _travelService = travelService;
        }
        [HttpPost]
        public async Task<IActionResult> Get(TravelDto input)
        {
            var response = await _travelService.GetPlansAsync(input);
            return Ok(response);
        }
    }
}
