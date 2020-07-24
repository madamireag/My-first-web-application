using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

using System.Linq;
using System.Threading.Tasks;

namespace SalesManagementProj.DB
{
    public class ClientContext :DbContext
    {
        public ClientContext(DbContextOptions<ClientContext> options) : base(options)
        {
           
        }

       public DbSet<Client> Clienti { get; set; }
       public DbSet<Produs> Produse { get; set; }

    }
}
