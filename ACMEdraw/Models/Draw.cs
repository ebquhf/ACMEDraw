using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ACMEdraw.Models
{
    public class Draw
    {
        #region Constructor
        public Draw()
        {

        }
        #endregion
        #region Properties
        [Key]
        [Required]
        public int Id { get; set; }
        public string Email { get; set; }
        public bool isWinning {get;set;}

        [ForeignKey("Person")]
        public int Person_Id { get;set; }
        [ForeignKey("Product")]
        public int Product_Id { get; set; }
        #endregion

        #region Navigation Properties
        public virtual Person Person { get; set; }
        public virtual Product Product { get; set; }
        #endregion

    }
    public class DrawContract 
    {
        public string Email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string serialNumber { get; set; }
        public string birthDate { get; set; }
    }
}
