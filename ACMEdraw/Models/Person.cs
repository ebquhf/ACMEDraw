using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ACMEdraw.Models
{
    public class Person
    {
        #region Constructor
        public Person()
        {

        }
        #endregion
        #region Properties
        [Key]
        [Required]
        public int Id { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime BirthDate { get; set; }
        #endregion
    }
}
