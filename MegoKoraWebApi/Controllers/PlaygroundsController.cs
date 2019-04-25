using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MegoKoraWebApi.Models;
using System.Web.Http.Cors;
using System.Data.Entity;
namespace MegoKoraWebApi.Controllers
{
    
    [RoutePrefix("api/megoKora")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class PlaygroundsController : ApiController
    {
        MegoContext dbContext = new MegoContext();
        [Route("getPlaygrounds")]
        public List<Playground> getPlaygrounds()
        {
             /*  dbContext.Playground.FirstOrDefault(p => p.PlaygroundID == 1).SubPlayground.Add(dbContext.SubPlayground.FirstOrDefault(sp=>sp.SubPlaygroundID==1));
               dbContext.Playground.FirstOrDefault(p => p.PlaygroundID == 1).SubPlayground.Add(dbContext.SubPlayground.FirstOrDefault(sp => sp.SubPlaygroundID == 2));
               dbContext.Playground.FirstOrDefault(p => p.PlaygroundID == 1).SubPlayground.Add(dbContext.SubPlayground.FirstOrDefault(sp => sp.SubPlaygroundID == 3));
               dbContext.Playground.FirstOrDefault(p => p.PlaygroundID == 1).SubPlayground.Add(dbContext.SubPlayground.FirstOrDefault(sp => sp.SubPlaygroundID == 4));
               dbContext.SaveChanges();*/
               //List<Playground> pgrs = dbContext.Playground.ToList();
               return dbContext.Playground.ToList();
        }

        //[Route("searchPlaygroundsbyName/{name}")]
        //public List<Playground> getPlaygroundsbyName(string name)
        //{
        //    return dbContext.Playground.Where(p=>p.Name.Contains(name)).ToList();
        //}

		[Route("searchPlaygroundsbyName/{name}")]
		public List<Playground> getPlaygroundsbyName(string name)
		{
			if (name != null)
			{
				return dbContext.Playground.Where(p => p.Name.Contains(name)).ToList();
			}
			else
			{
				return new List<Playground>();
			}
		}

		[Route("searchPlaygroundsbyid/{ID}")]
        public Playground getPlaygroundsbyid(int ID)
        {
            return dbContext.Playground.FirstOrDefault(p => p.PlaygroundID==ID);
        }

		

		//[Route("searchPlaygroundsbyprice/{price}")]
		//public List<Playground> getPlaygroundsbyprice(decimal price)
		//{
		//    List<int> spgs = dbContext.SubPlayground.Where(sp => sp.Price <= price).Select(sp=>sp.PlaygroundID).Distinct().ToList();
		//    List<Playground> ply_grnds = new List<Playground>();
		//    foreach(var spg in spgs)
		//    {
		//        Playground pg = dbContext.Playground.FirstOrDefault(p=>p.PlaygroundID==spg);
		//        ply_grnds.Add(pg);
		//    }

		//    return ply_grnds;
		//}


		[Route("searchPlaygroundsbyprice/{price}")]
		public List<Playground> getPlaygroundsbyprice(decimal price)
		{
			List<int> spgs = dbContext.SubPlayground.Where(sp => sp.Price <= price).Select(sp => sp.PlaygroundID).Distinct().ToList();
			List<Playground> ply_grnds = new List<Playground>();
			foreach (var spg in spgs ?? new List<int>())
			{
				Playground pg = dbContext.Playground.FirstOrDefault(p => p.PlaygroundID == spg);
				ply_grnds.Add(pg);
			}

			return ply_grnds;
		}

		[Route("searchPlaygroundsbyrate/{rate}")]
        public List<Playground> getPlaygroundbyrate(double rate)
        {
            return dbContext.Playground.Where(p => p.Rate >= rate).ToList();
        }
		//[Route("searchPlaygroundsbystreet/{street}")]
		//public List<Playground> getPlaygroundsbystreet(string street)
		//{
		//    return dbContext.Playground.Where(p => p.Street.Contains(street)).ToList();
		//}

		[Route("searchPlaygroundsbystreet/{street}")]
		public List<Playground> getPlaygroundsbystreet(string street)
		{
			if (street != null)
			{
				return dbContext.Playground.Where(p => p.Street.Contains(street)).ToList();
			}
			else
			{
				return new List<Playground>();
			}
		}
		//[Route("searchPlaygroundsbycity/{city}")]
		//      public List<Playground> getPlaygroundsbycity(string city)
		//      {
		//          return dbContext.Playground.Where(p => p.City.Contains(city)).ToList();
		//      }

		[Route("searchPlaygroundsbycity/{city}")]
		public List<Playground> getPlaygroundsbycity(string city)
		{
			if (city != null)
			{
				return dbContext.Playground.Where(p => p.City.Contains(city)).ToList();
			}
			else
			{
				return new List<Playground>();
			}
		}

		[Route("searchPlaygroundsbyowner/{ownerID}")]
        public List<Playground> getPlaygroundsbyOwner(int ownerID)
        {
            return dbContext.Playground.Where(p => p.OwnerID==ownerID).ToList();
        }
        //to be edited
        [Route("searchPlaygroundsbytime")]
        public List<Playground> getPlaygroundsbyHours([FromUri]int from, [FromUri]int to, [FromUri]int day, [FromUri]int month, [FromUri]int year)
        {
            // to be reviewed
            /*  for (int i = 0; i < dbContext.SubPlayground.ToList().Count; i++)
               {
                   var temp = dbContext.Reservation.ToList();
                   var curr_id = dbContext.SubPlayground.ToList()[i].SubPlaygroundID;
                   var tem = dbContext.Reservation.ToList().Where(r => r.SubPlaygroundID == dbContext.SubPlayground.ToList()[i].SubPlaygroundID).ToList();
                   for (int j=0;j< tem.Count; j++)
                   {
                       dbContext.SubPlayground.FirstOrDefault(sp => sp.SubPlaygroundID == curr_id).Reservation.Add(tem[j]);
                   }
               }*/
            // dbContext.SaveChanges();
            var pgrnds_Min_begs = dbContext.Playground.Select(p => p.SubPlayground.Select(s => s.Reservation.Where(r => r.Day == day && r.Month == month && r.Year == year).Select(res => res.From).DefaultIfEmpty(-1).Min()).ToList()).ToList();
            var pgrnds_max_ends = dbContext.Playground.Select(p => p.SubPlayground.Select(s => s.Reservation.Where(r => r.Day == day && r.Month == month && r.Year == year).Select(res => res.To).DefaultIfEmpty(25).Max()).ToList()).ToList();
            List<Playground> plays = new List<Playground>();
            for (int i = 0; i < dbContext.Playground.ToList().Count; i++)
            {
                bool satisfied = false;
                for (int j = 0; j < dbContext.Playground.Include(p=>p.SubPlayground).ToList()[i].SubPlayground.Count; j++)
                {
                    for (int k = 0; k < dbContext.Playground.Include(p => p.SubPlayground).ToList()[i].SubPlayground.ToList()[j].Reservation.Count - 1; k++)
                    {
                        if (dbContext.Playground.ToList()[i].SubPlayground.ToList()[j].Reservation.ToList()[k].To != dbContext.Playground.ToList()[i].SubPlayground.ToList()[j].Reservation.ToList()[k + 1].From)
                        {
                            if (dbContext.Playground.ToList()[i].SubPlayground.ToList()[j].Reservation.ToList()[k].To == from && dbContext.Playground.ToList()[i].SubPlayground.ToList()[j].Reservation.ToList()[k + 1].From >= to)
                            {
                                satisfied = true;
                                break;
                            }
                        }
                    }
                    if (from > pgrnds_max_ends[i][j] || to < pgrnds_Min_begs[i][j] || pgrnds_Min_begs[i][j] == -1 || pgrnds_max_ends[i][j] == 25)
                    {
                        satisfied = true;
                        break;
                    }
                }
                if (satisfied == true)
                {
                    plays.Add(dbContext.Playground.ToList()[i]);
                }
            }
            return plays;
        }
		//[Route("getPlaygroundbySub/{id}")]
		//public Playground getPlaygroundsbysubPlayground(int id)
		//{
		//	return dbContext.Playground.FirstOrDefault(p => p.PlaygroundID == dbContext.SubPlayground.FirstOrDefault(sp => sp.SubPlaygroundID == id).PlaygroundID);
		//}

		[Route("getPlaygroundbySub/{id}")]
		public Playground getPlaygroundsbysubPlayground(int id)
		{
			if (dbContext.SubPlayground.FirstOrDefault(sp => sp.SubPlaygroundID == id) != null)
			{
				return dbContext.Playground.FirstOrDefault(p => p.PlaygroundID == dbContext.SubPlayground.FirstOrDefault(sp => sp.SubPlaygroundID == id).PlaygroundID);
			}
			else
			{
				return null;
			}
		}

		//[Route("postPlaygrounds")]
  //      public void postPlaygrounds(Playground pgrnd)
  //      {
  //          dbContext.Playground.Add(pgrnd);
  //          dbContext.SaveChanges();
  //      }

		[Route("postPlaygrounds")]
		//updated
		public void postPlaygrounds(Playground pgrnd)
		{
			//pgrnd.PlaygroundID = 0;
			if (ModelState.IsValid)
			{
				dbContext.Playground.Add(pgrnd);
				dbContext.SaveChanges();
			}

		}

		[Route("putPlaygrounds")]
        public void putPlaygrounds(Playground pgrnd)
        {
            Playground grnd = dbContext.Playground.FirstOrDefault(p => p.PlaygroundID == pgrnd.PlaygroundID);
            if (grnd != null)
            {
                grnd.City = pgrnd.City;
                grnd.Country = pgrnd.Country;
                grnd.Image = pgrnd.Image;
                grnd.Name = pgrnd.Name;
                grnd.Owner = pgrnd.Owner;
                grnd.OwnerID = pgrnd.OwnerID;
                grnd.Phone1 = pgrnd.Phone1;
                grnd.Phone2 = pgrnd.Phone2;
                grnd.Rate = pgrnd.Rate;
                grnd.Street = pgrnd.Street;
                grnd.SubPlayground = pgrnd.SubPlayground;
                dbContext.SaveChanges();
            }

        }
        [Route("deletePlaygrounds/{id}")]
        public void deletePlaygrounds(int id)
        {
            Playground grnd = dbContext.Playground.FirstOrDefault(p => p.PlaygroundID == id);
            if (grnd != null)
            {
                foreach (var sg in dbContext.SubPlayground.Where(s => s.PlaygroundID == grnd.PlaygroundID).ToList())
                {
                    dbContext.Reservation.RemoveRange(dbContext.Reservation.Where(r => r.SubPlaygroundID == sg.SubPlaygroundID));
                }
                dbContext.SubPlayground.RemoveRange(dbContext.SubPlayground.Where(s => s.PlaygroundID == grnd.PlaygroundID).ToList());
                dbContext.Playground.Remove(grnd);
                dbContext.SaveChanges();

            }

        }

        [Route("getCities")]
        public List<string> Getcities()
        {
            return dbContext.Playground.Select(p => p.City).Distinct().ToList();
        }
        //[Route("getStreets/{city}")]
        //public List<string> GetStreets(string city)
        //{
        //    return dbContext.Playground.Where(pg => pg.City.Contains(city)).Select(p => p.Street).Distinct().ToList();
        //}

		[Route("getStreets/{city}")]
		public List<string> GetStreets(string city)
		{
			if (city != null)
			{
				return dbContext.Playground.Where(pg => pg.City.Contains(city)).Select(p => p.Street).Distinct().ToList();
			}
			else
			{
				return new List<string>();
			}
		}
	}
}
