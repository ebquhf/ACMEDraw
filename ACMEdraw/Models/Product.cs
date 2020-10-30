using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ACMEdraw.Models
{
    public class Product
    {
        #region Constructor
        public Product()
        {

        }
        #endregion
        #region Properties
        [Key]
        [Required]
        public int Id { get; set; }
        public Guid SerialNumber { get; set; }
        public string Name { get; set; }

        #endregion
    }
}
