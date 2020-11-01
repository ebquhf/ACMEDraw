using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ACMEdraw.Data;
using ACMEdraw.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;

namespace ACMEdraw.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public SeedController(ApplicationDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _env = environment;
        }

        public async Task<IActionResult> ImportProducts()
        {
            var path = Path.Combine(
            _env.ContentRootPath,
            String.Format("Sources/MOCK_DATA.xlsx"));

            var productsList = _context.Products.ToList();
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            using (var stream = new FileStream(path, FileMode.Open, FileAccess.Read))
            {
                using (var ep = new ExcelPackage(stream))
                {
                    var ws = ep.Workbook.Worksheets[0];
                    
                    var nProducts = 0;

                    #region Import all products
                    for (int nRow = 2; nRow <= ws.Dimension.End.Row; nRow++)
                    {
                        var row = ws.Cells[nRow, 1, nRow, ws.Dimension.End.Column];
                        var name = row[nRow, 2].GetValue<string>();
                        var serialNumber = row[nRow, 3].GetValue<string>();
                        Guid serialGUID = new Guid(serialNumber);

                        //if there is no product with this serial number create it.
                        if (productsList.Any(pd => pd.SerialNumber == serialGUID) == false)
                        {
                            var product = new Product();
                            product.Name = name;
                            product.SerialNumber = serialGUID;
                            _context.Products.Add(product);
                            productsList.Add(product);
                            nProducts++;
                        }
                    }
                    #endregion

                    await _context.SaveChangesAsync();
                }
            }
            return new JsonResult(new { Message = $"Products added: {productsList.Count}" });
        }
    }
}
