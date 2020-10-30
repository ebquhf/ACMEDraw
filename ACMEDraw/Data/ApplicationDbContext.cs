using ACMEdraw.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ACMEdraw.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        #region Methods
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Person>().ToTable("People");
            builder.Entity<Product>().ToTable("Products");
            builder.Entity<Draw>().ToTable("Draws");
        }
        #endregion
        #region Properties
        public DbSet<Person> People{ get; set; }
        public DbSet<Product> Products{ get; set; }
        public DbSet<Draw> Draws { get; set; }

        #endregion Properties
    }
}
