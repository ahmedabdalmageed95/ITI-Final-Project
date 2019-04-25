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

    public class ReviewController : ApiController
    {
        MegoContext db = new MegoContext();

        //display all data in Reviews
        [Route("getReviews")]
        //api/megoKora/getReviews
        public List<Reviews> getAllReviews()
        {
            return db.Reviews.ToList();
        }

        //get specific  review
        [Route("getReviews/{reviewId}")]
        //api/megoKora/getReviews/1
        public Reviews getOneReview(int reviewId)
        {
            Reviews review = db.Reviews.FirstOrDefault(id => id.reviewId == reviewId);

            if (review != null)
            {
                return review;
            }
            else
            {
                var msg = new HttpResponseMessage(HttpStatusCode.NotFound)
                {

                    Content = new StringContent("this id:" + reviewId.ToString() + " is not found in Reviews dataBase"),
                    ReasonPhrase = "not found!!! this review to display",
                };
                throw new HttpResponseException(msg);
            }
        }
        // add new Review
        [Route("postReviews")]
        //api/megoKora/postReviews
        public void postReview(Reviews newReviews)
        {
            if (ModelState.IsValid)
            {
                db.Reviews.Add(newReviews);
                db.SaveChanges();
            }
            else
            {
                var msg = new HttpResponseMessage(HttpStatusCode.BadRequest)
                {

                    Content = new StringContent("model state is not valid"),
                    ReasonPhrase = "Bad Request!!! model state is not valid",
                };
                throw new HttpResponseException(msg);
            }

        }

        //update review
        [Route("putReviews/{reviewId}")]
        //api/megoKora/putReviews/1
        public void putReview(int reviewId, Reviews newReview)
        {
            Reviews currentReview = db.Reviews.FirstOrDefault(id => id.reviewId == reviewId); ;
            if (currentReview != null)
            {
                currentReview.Comment = newReview.Comment;
                currentReview.Rate = newReview.Rate;
                db.SaveChanges();
            }
            else
            {
                var msg = new HttpResponseMessage(HttpStatusCode.NotFound)
                {

                    Content = new StringContent("this id:" + reviewId.ToString() + " is not found in Reviews dataBase"),
                    ReasonPhrase = "not found!!! this review to Update",
                };
                throw new HttpResponseException(msg);
            }

        }

        //delete review
        [Route("deleteReviews/{reviewId}")]
        //api/megoKora/deleteReviews/1
        public void deleteReview(int reviewId)
        {
            Reviews currentReview = db.Reviews.FirstOrDefault(id => id.reviewId == reviewId);
            if (currentReview != null)
            {
                db.Reviews.Remove(currentReview);
                db.SaveChanges();
            }
            else
            {
                var msg = new HttpResponseMessage(HttpStatusCode.NotFound)
                {

                    Content = new StringContent("this id:" + reviewId.ToString() + " is not found in Reviews dataBase"),
                    ReasonPhrase = "not found!!! this review to delete",
                };
                throw new HttpResponseException(msg);
            }

        }

        [Route("getAllRviewAboutSpecificSubPlayground/{subPlaygroundId}")]
        //api/megoKora/getAllRviewAboutSpecificSubPlayground/1
        public List<Reviews> getAllRviewAboutSpecificSubPlayground(int subPlaygroundId)
        {
            return db.Reviews.Where(r => r.SubPlaygroundID == subPlaygroundId).OrderByDescending(r=>r.reviewId).ToList();
        }

        [Route("getAllClientReviewAboutSpecificSubPlayground/{subPlaygroundId}")]
        //api/megoKora/getAllClientReviewAboutSpecificSubPlayground/1
        public List<Client> getAllClientReviewAboutSpecificSubPlayground(int subPlaygroundId)
        {
            List<Client> clientsReviews = new List<Client>();
            Client currentClient = new Client();
            List<Reviews> AllReviews = db.Reviews.Where(r => r.SubPlaygroundID == subPlaygroundId).OrderByDescending(r => r.reviewId).ToList();
            foreach (Reviews rev in AllReviews)
            {
                currentClient = db.Client.Find(rev.ClientID);
                clientsReviews.Add(currentClient);
            }
            return clientsReviews;
        }

    }
  
}
