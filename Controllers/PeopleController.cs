using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pulsaciones_dotnetV2.Data;
using Pulsaciones_dotnetV2.Models.ViewModels;

namespace Pulsaciones_dotnetV2.Controllers
{
    [Route("api/[controller]")]
    public class PeopleController : Controller
    {
        public ApplicationDbContext dbContext { get; set; }

        [HttpGet("[action]")]
        public IEnumerable<PersonViewModel> People()
        {
            List<PersonViewModel> people = (from p in dbContext.People
                                            select new PersonViewModel
                                            {
                                                Id = p.Id,
                                                PersonId = p.PersonId,
                                                Name = p.Name,
                                                Age = p.Age,
                                                Sex = p.Sex,
                                                Pulsations = p.Pulsations
                                            }).ToList();



            return people;
        }
    }
}