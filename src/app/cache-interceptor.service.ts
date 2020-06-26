import { Injectable, ɵConsole } from '@angular/core';
import { HttpInterceptor, HttpRequest
  , HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CacheService } from './cache.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class CacheInterceptorService implements HttpInterceptor {
  constructor(private cacheService: CacheService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    if (req.method !== 'GET') {
      //si no es una operacion Get no me molesto en catch
      this.cacheService.invalidateCache();
      return next.handle(req);
    }    
    // Busco en cache la solicitud 
    const cachedResponse: HttpResponse<any> = this.cacheService.get(req.url);
    // si tengo cache en servicio para la solicitud  
    if (cachedResponse) {
      //si tengo cache respondo lo que tengo en cache
      console.log(`Respondiendo desde cache: ${cachedResponse.url}`);
      //Devuelve un Observable que emite un valor concreto
      return of(cachedResponse);
    }
    // Flujo de llamada a otro interceptor o el servicio 
    return next.handle(req)
      .pipe(
        map(resp => {
          //Si llego aqui quiere decir que no tengo esto en cache por lo 
          //resguardo 
          if (resp instanceof HttpResponse) {
            console.log(`Adding item to cache: ${req.url}`);
            this.cacheService.put(req.url, resp);
            return resp;
          }
        })        
      );
  }
}
