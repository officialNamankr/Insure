using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using BlazeServiceTravel.Models.Dto;
using System.Linq;

namespace BlazeServiceTravel.Filters
{
    public class ValidationFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (!context.ModelState.IsValid)
            {
                var response = new ResponseDto
                {
                    IsSuccess = false,
                    DisplayMessage = "Validation Failed",
                    ErrorMessages = context.ModelState.Values.SelectMany(v => v.Errors)
                                                             .Select(e => e.ErrorMessage)
                                                             .ToList()
                };

                context.Result = new BadRequestObjectResult(response);
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // Do nothing
        }
    }
}
