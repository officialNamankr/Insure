using System.Diagnostics;
using System.Net;
using BlazeServiceTravel.Models.Dto;
using Microsoft.AspNetCore.Http;

namespace BlazeServiceTravel.Middlewares
{
    public class GlobalErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;
       

        public GlobalErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
           
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = new ResponseDto
            {
                IsSuccess = false,
                ErrorMessages = new List<string> { ex.Message },
                DisplayMessage = "Internal Server Error"
            };
            if (context.RequestServices.GetRequiredService<IWebHostEnvironment>().IsDevelopment())
            {
                response.Result = new
                {
                    Exception = ex.Message,
                    StackTrace = ex.StackTrace
                }; 
            }
            return context.Response.WriteAsJsonAsync(response);

        }
    }
}
