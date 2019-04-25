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
    public class ReservationsController : ApiController
    {
        private MegoContext db = new MegoContext();

		[Route("getReservation")]
		// GET: api/megoKora/getReservation
		public IQueryable<Reservation>GetReservations()
        {
            return db.Reservation;
        }

		//GET Resrevation By ID
		[Route("getReservation/{id}")]
		// GET: api/megoKora/getReservation/1
		[ResponseType(typeof(Reservation))]
        public IHttpActionResult GetReservation(int id)
        {
			var reservation = db.Reservation.FirstOrDefault(s => s.ReservationID == id);
			//Reservation reservation = db.Reservation.Find(id);
			if (reservation == null)
            {
                return NotFound();
            }

            return Ok(reservation);
        }

		//GET Resrevation By SubPlayground ID
		[Route("getReservationBySubPlayground/{id}")]
		// GET: api/megoKora/getReservationBySubPlayground/1
		[ResponseType(typeof(Reservation))]
		public IHttpActionResult GetReservationBySubPlayground(int id)
		{
			var reservation = db.Reservation.Where(s => s.SubPlaygroundID == id).ToList();
			if (reservation == null)
			{
				return NotFound();
			}

			return Ok(reservation);
		}

		//GET Resrevation By Client ID
		[Route("getReservationByClient/{id}")]
		// GET: api/megoKora/getReservationByClient/1
		[ResponseType(typeof(Reservation))]
		public IHttpActionResult GetReservationByClient(int id)
		{
			var reservation = db.Reservation.Where(s => s.ClientID == id).ToList();
			if (reservation == null)
			{
				return NotFound();
			}

			return Ok(reservation);
		}

		[Route("putReservation/{id}")]
		// GET: api/megoBook/putReservation/1
		[ResponseType(typeof(void))]
        public IHttpActionResult PutReservation([FromUri]int id,[FromBody] Reservation reservation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != reservation.ReservationID)
            {
                return BadRequest();
            }

            db.Entry(reservation).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
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
		//
        [Route("postReservation")]
        // GET: api/megoBook/postReservation
        [ResponseType(typeof(Reservation))]
        public void PostReservation(Reservation reservation)
        {
            if (!ModelState.IsValid)
            {
                //return BadRequest(ModelState);
                return;
            }

            db.Reservation.Add(reservation);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ReservationExists(reservation.ReservationID))
                {
                    //return Conflict();
                    return;
                }
                else
                {
                    throw;
                }
            }

            return;
        }

        [Route("deleteReservation/{id}")]
		// GET: api/megoKora/deleteReservation/1
		[ResponseType(typeof(Reservation))]
        public IHttpActionResult DeleteReservation(int id)
        {
			var reservation = db.Reservation.FirstOrDefault(s => s.ReservationID == id);
            //Reservation reservation = db.Reservation.Find(id);
            if (reservation == null)
            {
                return NotFound();
            }

            db.Reservation.Remove(reservation);
            db.SaveChanges();

            return Ok(reservation);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ReservationExists(int id)
        {
            return db.Reservation.Count(e => e.ReservationID == id) > 0;
        }
    }
}