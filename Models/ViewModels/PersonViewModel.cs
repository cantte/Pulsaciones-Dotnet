﻿using Pulsaciones_dotnetV2.Models.InputModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pulsaciones_dotnetV2.Models.ViewModels
{
    public class PersonViewModel : PersonInputModel
    {
        public PersonViewModel(Person person)
        {
            PersonId = person.PersonId;
            Name = person.Name;
            Age = person.Age;
            Sex = person.Sex;
            Pulsations = person.Pulsations;
        }

        public float Pulsations { get; set; }
    }
}
