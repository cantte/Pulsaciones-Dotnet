using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Pulsaciones_dotnetV2.Data;
using Pulsaciones_dotnetV2.Models;
using Pulsaciones_dotnetV2.Models.InputModels;
using Pulsaciones_dotnetV2.Models.Response;
using Pulsaciones_dotnetV2.Models.ViewModels;

namespace Pulsaciones_dotnetV2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeopleController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public PeopleController(ApplicationDbContext context)
        {
            dbContext = context;
        }

        [HttpPost("[action]")]
        public ServerResponse Insert([FromBody] PersonInputModel model)
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
                                            select new PersonViewModel(p)).ToList();



            return people;
        }

        [HttpGet("[action]")]
        public IEnumerable<PersonViewModel> SearchPeople([FromQuery] string personId)
        {
            List<PersonViewModel> people = (from p in dbContext.People
                                            where p.PersonId.Contains(personId)
                                            select new PersonViewModel(p)).ToList();

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
                          select new PersonViewModel(p)).First();
            }
            catch (Exception)
            {
                person = null;
            }

            return person;
        }

        [HttpDelete("[action]/{personId}")]
        public ServerResponse Delete(string personId)
        {
            ServerResponse serverResponse = new ServerResponse();

            try
            {
                Person person = (from p in dbContext.People
                                where p.PersonId == personId
                                select p).First();

                dbContext.People.Remove(person);
                dbContext.SaveChanges();
                serverResponse.Success = true;
                serverResponse.Message = "Person delete successfull.";
            }
            catch (Exception)
            {
                serverResponse.Success = false;
                serverResponse.Message = "Person don't delete.";
            }

            return serverResponse;
        }

        [HttpPut("[action]/{personId}")]
        public ServerResponse Update(string personId, [FromBody] PersonInputModel model)
        {
            ServerResponse serverResponse = new ServerResponse();

            try
            {
                Person person = (from p in dbContext.People
                                 where p.PersonId == personId
                                 select p).First();

                person.Name = model.Name;
                person.Age = model.Age;
                person.Sex = model.Sex;

                dbContext.People.Update(person);
                dbContext.SaveChanges();
                serverResponse.Success = true;
                serverResponse.Message = "Person modified.";
            }
            catch (Exception)
            {
                serverResponse.Success = false;
                serverResponse.Message = "Person don't modified.";
            }

            return serverResponse;
        }
    }
}