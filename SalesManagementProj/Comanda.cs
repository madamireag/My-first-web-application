using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace SalesManagementProj
{
    public class Comanda
    {
        public int Id { get; set; }
        public DateTime Data { get; set; }
        public string ModalitatePlata { get; set; }
        public string Status { get; set; }
        public int IdClient { get; set; }
        //  [ForeignKey("IdClient")]
        public Client Client { get; set; }
        public List<RandComanda> RandComenzi { get; set; }
    }
}
