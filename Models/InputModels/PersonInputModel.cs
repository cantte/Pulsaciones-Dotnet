using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pulsaciones_dotnetV2.Models.InputModels
{
    public class PersonInputModel
    {
        public string PersonId { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Sex { get; set; }
    }
}
