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
  
      

    return this.http.get("http://localhost:3000/Libros", {
      headers: httpHeaders,
      responseType: 'json'
    });
  }




}
