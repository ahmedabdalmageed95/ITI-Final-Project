using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MegoKoraWebApi.Models;
using System.Web.Http.Cors;

namespace MegoKoraWebApi.Controllers
{
    [RoutePrefix("api/megoKora")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class OwnersController : ApiController
    {
        private MegoContext db = new MegoContext();
        public OwnersController()
        {
            db.Configuration.ProxyCreationEnabled = false;
        }
        [Route("getOwner")]
        // GET: api/Owner
        public IQueryable<Owner> GetOwners()
        {
            return db.Owner;
        }
        [Route("getOwner/{id}")]
        // GET: api/Owner/5
        [ResponseType(typeof(Owner))]
        public IHttpActionResult GetOwner(int id)
        {
            Owner owner = db.Owner.Find(id);
            if (owner == null)
            {
                return NotFound();
            }

            return Ok(owner);
        }
        [Route("putOwner/{id}")]
        // PUT: api/Owner/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutOwner(int id, Owner owner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != owner.OwnerID)
            {
                return BadRequest();
            }

            db.Entry(owner).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OwnerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }
        [Route("postOwner")]
        // POST: api/Owner
        [ResponseType(typeof(Owner))]
        public IHttpActionResult PostOwner(Owner owner)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Owner.Add(owner);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = owner.OwnerID }, owner);
        }
        [Route("deleteOwner/{id}")]
        // DELETE: api/Owner/5
        [ResponseType(typeof(Owner))]
        public IHttpActionResult DeleteOwner(int id)
        {
            Owner owner = db.Owner.Find(id);
            if (owner == null)
            {
                return NotFound();
            }

            db.Owner.Remove(owner);
            db.SaveChanges();

            return Ok(owner);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool OwnerExists(int id)
        {
            return db.Owner.Count(e => e.OwnerID == id) > 0;
        }
        //Get:login to account
        //api/megoKora/logInOwner/aa.yahoo.com/26762108
        [Route("logInOwner/{email}/{password}")]
        public Owner getLogin(string email, string password)
        {
            Owner logInOwner = db.Owner.FirstOrDefault(c => c.Email == email && c.Password == password);
            if (logInOwner != null)
            {
                return logInOwner;
            }
            else
            {
                var msg = new HttpResponseMessage(HttpStatusCode.NotFound)
                {
                    Content = new StringContent("this is Owner not founded"),
                    ReasonPhrase = "email or password not belong to any Owner "
                };

                throw new HttpResponseException(msg);
            }
        }
    }
}