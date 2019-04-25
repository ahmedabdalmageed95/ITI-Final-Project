import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { Review } from './../Models/review';
import { Client } from '../Models/client';
@Injectable()
export class ReviewsService {
  constructor(private myHttp: Http) {}
  getAllReviews(): Observable<Review[]> {
    return this.myHttp
      .get('http://localhost:49692/api/megoKora/getReviews')
      .map(reviewsData => {
        return <Review[]>reviewsData.json();
      });
  }
  getSpecificReviews(id): Observable<Review> {
    return this.myHttp
      .get('http://localhost:49692/api/megoKora/getReviews/' + id)
      .map(specificReviewData => {
        return <Review>specificReviewData.json();
      });
  }
  postReviews(newReview) {
    return this.myHttp.post(
      'http://localhost:49692/api/megoKora/postReviews',
      newReview
    );
  }
  deleteReviews(id) {
    return this.myHttp.delete(
      'http://localhost:49692/api/megoKora/deleteReviews/' + id
    );
  }
  putReviews(id, currentReviewNewData) {
    return this.myHttp.put(
      'http://localhost:49692/api/megoKora/putReviews/' + id,
      currentReviewNewData
    );
  }
  getAllRviewAboutSpecificSubPlayground(id):Observable<Review[]>
  {
    return this.myHttp.get('http://localhost:49692/api/megoKora/getAllRviewAboutSpecificSubPlayground/'+id).map(Data=>{
      return <Review[]>Data.json();
    });
  }
  getAllClientReviewAboutSpecificSubPlayground(id):Observable<Client[]>
  {
    return this.myHttp.get('http://localhost:49692/api/megoKora/getAllClientReviewAboutSpecificSubPlayground/'+id).map(Data=>{
      return <Client[]>Data.json();
    });
  }
}
