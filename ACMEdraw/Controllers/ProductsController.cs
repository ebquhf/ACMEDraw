using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ACMEdraw.Data;
using ACMEdraw.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ACMEdraw.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<ProductsController> _logger;
        public ProductsController(ApplicationDbContext context,ILogger<ProductsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            var city = await _context.Products.FindAsync(id);
            if (city == null)
            {
                return NotFound();
            }
            return city;
        }

        [HttpGet("{guid}")]
        public async Task<ActionResult<Product>> GetProductById(string guid)
        {
            var serialNumber = new Guid(guid);
            var city = await _context.Products.FirstOrDefaultAsync(p=>p
                                    .SerialNumber.ToString().Contains(guid));
            if (city == null)
            {
                return NotFound();
            }
            return city;
        }
    }
}
