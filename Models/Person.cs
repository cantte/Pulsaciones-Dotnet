using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pulsaciones_dotnetV2.Models
{
    public class Person
    {
        public int Id { get; set; }
        public string PersonId { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Sex { get; set; }
        public float Pulsations 
        {
            get
            {
                return (Sex == "F") ? ((210 - Age) / 10) : ((220 - Age) / 10);
            }
        }
    }
}
