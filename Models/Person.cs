﻿namespace Pulsaciones_dotnetV2.Models
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
                return (Sex == "F") ? ((210f - Age) / 10f) : ((220f - Age) / 10f);
            }
        }
    }
}
