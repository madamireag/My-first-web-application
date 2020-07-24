using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesManagementProj
{
    public class RandComanda
    {
        public int Id { get; set; }
        public int IdComanda { get; set; }
        //[ForeignKey("IdComanda")]
        public Comanda Comanda { get; set; }
        public int IdProdus { get; set; }
       // [ForeignKey("IdProdus")]
        public Produs Produs { get; set; }
        public double Pret { get; set; }
        public int Cantitate { get; set; }
    }
}
