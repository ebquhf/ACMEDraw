using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ACMEdraw.Data;
using ACMEdraw.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ACMEdraw.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrawsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<DrawsController> _logger;
        public DrawsController(ApplicationDbContext context, ILogger<DrawsController> logger)
        {
            _context = context;
            _logger = logger;
        }
        // GET: api/<DrawsController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Draw>>> GetProducts()
        {
            return await _context.Draws.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Draw>> GetDrawById(int id)
        {
            var draw = await _context.Draws.FindAsync(id);
            if (draw == null)
            {
                return NotFound();
            }
            return draw;
        }


        // POST api/<DrawsController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Draw value)
        {
            try
            {
                await _context.AddAsync(value);
                await _context.SaveChangesAsync();
                return new ViewResult();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw ex;
            }
           
        }

        // DELETE api/<DrawsController>/5
        [HttpDelete("{id}")]
        public async void Delete(int id)
        {
            var draw = await _context.Draws.FindAsync(id);
            _context.Draws.Remove(draw);
            await _context.SaveChangesAsync();
        }
    }
}
