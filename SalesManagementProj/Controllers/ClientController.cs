using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using SalesManagementProj.DB;
namespace SalesManagementProj.Controllers
{

    [ApiController]
    [Route("api/[controller]")]

    public class ClientController : Controller
    {
        ClientContext _context;

        
        private readonly ILogger<ClientController> _logger;
        public ClientController(ILogger<ClientController> logger,ClientContext context)
        {
            _logger = logger;
            this._context = context;
        }
        [HttpGet]
        public IEnumerable<Client> Get()
        {
            return _context.Clienti.ToArray();
        }

        [HttpGet("{id}")]
        public Client ClientdetailById(int id)
        {
            var obj = _context.Clienti.Where(x => x.Id == id).ToList().FirstOrDefault();
            return obj;
        }
        [HttpPost]
        public void Create(Client cl)
        {
            _context.Clienti.Add(cl);
            _context.SaveChanges();
            
        }
        
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var obj = _context.Clienti.Where(x => x.Id == id).ToList().FirstOrDefault();
            _context.Clienti.Remove(obj);
            _context.SaveChanges();
           
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClient(int id, Client client)
        {
            if (id != client.Id)
            {
                return BadRequest();
            }

           _context.Entry<Client>(client).State = EntityState.Modified;
 
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClientExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Created("",new { status="Created"});
        }


        private bool ClientExists(int id)
        {
            return _context.Clienti.Any(e => e.Id == id);
        }




    }
}

