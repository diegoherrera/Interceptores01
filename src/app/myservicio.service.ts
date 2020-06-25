import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Book } from './books';

@Injectable({
  providedIn: 'root'
})
export class MyservicioService {


  constructor(private http: HttpClient) { }

  getWriterWithFavBooks(): Observable<any> {
    let httpHeaders = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', 'mitoken');
    let httpParams = new HttpParams()
      .set('category', 'Drama')
      .set('year', '2020');
      

    return this.http.get("http://localhost:3000/Libros", {
      headers: httpHeaders,
      params: httpParams,
      responseType: 'json'
    });
  }

  getWriterWithFavBooksPromise(): Promise<Book[]> {

    let httpHeaders = new HttpHeaders()
      .set('Accept', 'application/json');

    return this.http.get("http://localhost:3000/Libros",
      { headers: httpHeaders })
      .toPromise()
      .then(this.extractData)
      .catch(err => {
        return Promise.reject(err.error || 'Server error');
      });
  }

  extractData(res: HttpResponse<Object>) {

    console.log( "extractor " + JSON.stringify(res));
    var array = new Array();
    var key, count = 0;
    for (key in res) {
      array.push(res[count++]);
    }
    return array;
  }


}
