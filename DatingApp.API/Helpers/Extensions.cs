using System;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace DatingApp.API.Helpers
{
    /// <summary>Class <c>Extensions</c> Contains Extension methods.
    public static class Extensions
    {
        
         /// <summary>method  <c>AddApplicationError</c> Avoid Wrong exceptions message Related To Cors in Console.
        public static void AddApplicationError(this HttpResponse response,string message){
                response.Headers.Add("Application-Error",message);
                response.Headers.Add("Access-Control-Expose-Headers","Application-Error");
                response.Headers.Add("Access-Control-Allow-Origin","*");
        }

         /// <summary>method  <c>CalCulateAge</c> It takes date and return age as number.
        public static int CalCulateAge(this DateTime dob){
            var age=DateTime.Today.Year-dob.Year;
            if(dob.AddYears(age)>DateTime.Today)
                age--;
            return age;
        }
         /// <summary>method  <c>AddPagination</c> Contains Extension methods.
         public static void AddPagination(this HttpResponse response,int currentPage,int itemsPerPage,int totalItems,int totalPages){
             var paginationHeader=new PaginationHeader(currentPage,itemsPerPage,totalItems,totalPages);
             var camelCaseFormatter=new JsonSerializerSettings();
             camelCaseFormatter.ContractResolver=new CamelCasePropertyNamesContractResolver();
             response.Headers.Add("Pagination", Newtonsoft.Json.JsonConvert.SerializeObject(paginationHeader,camelCaseFormatter));
             response.Headers.Add("Access-Control-Expose-Headers","Pagination");
         }
    }
}