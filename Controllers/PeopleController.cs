using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pulsaciones_dotnetV2.Data;
using Pulsaciones_dotnetV2.Models;
using Pulsaciones_dotnetV2.Models.Response;
using Pulsaciones_dotnetV2.Models.ViewModels;

namespace Pulsaciones_dotnetV2.Controllers
{
    [Route("api/[controller]")]
    public class PeopleController : Controller
    {
        public ApplicationDbContext dbContext { get; set; }

        public PeopleController(ApplicationDbContext context)
        {
            dbContext = context;
        }

        [HttpPost("[action]")]
        public ServerResponse Add([FromBody] PersonViewModel model)
        {
            ServerResponse serverResponse = new ServerResponse();

            try
            {
                Person person = new Person()
                {
                    PersonId = model.PersonId,
                    Name = model.Name,
                    Age = model.Age,
                    Sex = model.Sex
                };

                dbContext.People.Add(person);
                dbContext.SaveChanges();

                serverResponse.Success = true;
                serverResponse.Message = "Person save successfull.";
            }
            catch (Exception)
            {
                serverResponse.Success = false;
                serverResponse.Message = "Person already register.";
            }

            return serverResponse;
        }

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

        [HttpGet("[action]")]
        public IEnumerable<PersonViewModel> SearchPeople([FromQuery] string personId)
        {
            List<PersonViewModel> people = (from p in dbContext.People
                                            where p.PersonId.Contains(personId)
                                            select new PersonViewModel()
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

        [HttpGet("[action]/{personId}")]
        public PersonViewModel Person(string personId)
        {
            PersonViewModel person;

            try
            {
                person = (from p in dbContext.People
                          where p.PersonId == personId
                          select new PersonViewModel
                          {
                              Id = p.Id,
                              PersonId = p.PersonId,
                              Name = p.Name,
                              Age = p.Age,
                              Sex = p.Sex,
                              Pulsations = p.Pulsations
                          }).First();
            }
            catch (Exception)
            {
                person = null;
            }

            return person;
        }
    }
}