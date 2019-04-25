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
    public class SubPlaygroundsController : ApiController
    {
        private MegoContext db = new MegoContext();
		
		[Route("getSubPlayground")]
		// GET: api/megoKora/getSubPlaygrounds
		public IQueryable<SubPlayground> GetSubPlaygrounds()
        {
            return db.SubPlayground;
        }

		[Route("getSubPlayground/{id}")]
		// GET: api/megoKora/getSubPlayground/5
		[ResponseType(typeof(SubPlayground))]
        public IHttpActionResult GetSubPlayground(int id)
        {
            SubPlayground subPlayground = db.SubPlayground.Find(id);
            if (subPlayground == null)
            {
                return NotFound();
            }

            return Ok(subPlayground);
        }

		[Route("putSubPlayground/{id}")]
		// PUT: api/megoKora/putSubPlayground/5
		[ResponseType(typeof(void))]
        public IHttpActionResult PutSubPlayground(int id, SubPlayground subPlayground)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != subPlayground.SubPlaygroundID)
            {
                return BadRequest();
            }

            db.Entry(subPlayground).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubPlaygroundExists(id))
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

		[Route("postSubPlayground")]
		// POST: api/megoKora/postSubPlayground
		[ResponseType(typeof(SubPlayground))]
        public IHttpActionResult PostSubPlayground(SubPlayground subPlayground)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.SubPlayground.Add(subPlayground);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = subPlayground.SubPlaygroundID }, subPlayground);
        }

		// DELETE: api/megoKora/deleteSubPlayground/5
		[Route("deleteSubPlayground/{id}")]
		[ResponseType(typeof(SubPlayground))]
        public IHttpActionResult DeleteSubPlayground(int id)
        {
            SubPlayground subPlayground = db.SubPlayground.Find(id);
            if (subPlayground == null)
            {
                return NotFound();
            }

            db.SubPlayground.Remove(subPlayground);
            db.SaveChanges();

            return Ok(subPlayground);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SubPlaygroundExists(int id)
        {
            return db.SubPlayground.Count(e => e.SubPlaygroundID == id) > 0;
        }
        [Route("GetSubPlaygroundByPlayGroundID/{id}")]
        // GET: api/megoKora/GetSubPlaygroundByPlayGroundID/5
        [ResponseType(typeof(SubPlayground))]
        public IHttpActionResult GetSubPlaygroundByPlayGroundID(int id)
        {
            var subPlayground = db.SubPlayground.Where(s => s.PlaygroundID == id).ToList();
            if (subPlayground == null)
            {
                return NotFound();
            }

            return Ok(subPlayground);
        }
    }
}