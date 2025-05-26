using System.Text.Json.Serialization;
using BlazeServiceTravel.DbContexts;
using BlazeServiceTravel.Middlewares;
using BlazeServiceTravel.Repository;
using BlazeServiceTravel.Repository.Interfaces;
using BlazeServiceTravel.Services;
using BlazeServiceTravel.Services.Interfaces;
using FluentValidation.AspNetCore;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using BlazeServiceTravel.Validations;
using BlazeServiceTravel.Filters;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddScoped<ApplicationDBContext>();
builder.Services.AddScoped<ITravelRepository, TravelRepository>();
builder.Services.AddScoped<ITravelService, TravelService>();



builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "BlazeServiceTravel API", Version = "v1" });
});
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<TravelDtoValidator>();
builder.Services.AddControllers(options =>
{
    options.Filters.Add<ValidationFilter>();
    
})
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = null;
        options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
        
    });

var app = builder.Build();
app.UseMiddleware<GlobalErrorHandlerMiddleware>();

// Configure the HTTP request pipeline.
// Enable middleware to serve generated Swagger as a JSON endpoint.
app.UseSwagger();

// Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
// specifying the Swagger JSON endpoint.
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
