using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Pulsaciones_dotnetV2.Data;
using Pulsaciones_dotnetV2.Hubs;
using Pulsaciones_dotnetV2.Models;
using Pulsaciones_dotnetV2.Models.EditModels;
using Pulsaciones_dotnetV2.Models.InputModels;
using Pulsaciones_dotnetV2.Models.Response;
using Pulsaciones_dotnetV2.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pulsaciones_dotnetV2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeopleController : Controller
    {
        private readonly ApplicationDbContext dbContext;
        private readonly IHubContext<SignalHub> _hubContext;

        public PeopleController(ApplicationDbContext context, IHubContext<SignalHub> hubContext)
        {
            dbContext = context;
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<ActionResult<PersonViewModel>> Post([FromBody] PersonInputModel model)
        {
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


                await _hubContext.Clients.All.SendAsync("New person", person);
                return new PersonViewModel(person);
            }
            catch (Exception)
            {
                return Conflict();
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PersonViewModel>>> People()
        {
            List<PersonViewModel> people = await (from p in dbContext.People
                                                  select new PersonViewModel(p)).ToListAsync();



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

        [HttpGet("{personId}")]
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

        [HttpDelete("{personId}")]
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

        [HttpPut("{personId}")]
        public ServerResponse Update(string personId, [FromBody] PersonEditModel model)
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

        [HttpGet("[action]")]
        public float CalculatePulsations([FromQuery] string sex, [FromQuery] int age)
        {
            Person p = new Person() { Sex = sex, Age = age };
            return p.Pulsations;
        }
    }
}