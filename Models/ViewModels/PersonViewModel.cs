using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pulsaciones_dotnetV2.Models.ViewModels
{
    public class PersonViewModel
    {
        public int Id { get; set; }
        public string PersonId { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Sex { get; set; }
        public float Pulsations { get; set; }
    }
}
