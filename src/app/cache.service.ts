import { Injectable } from '@angular/core';

import { HttpRequest, HttpResponse } from '@angular/common/http';

@Injectable()
export class CacheService  {

  private requests: any = { };  
  
  constructor() { 
    console.log('Paso por el contructor');
  }  
  
  put(url: string, response: HttpResponse<any>): void {  
    this.requests[url] = response;  
  }  
  
  get(url: string): HttpResponse<any> | undefined {  
    return this.requests[url];  
  }  
  
  invalidateCache(): void {  
    this.requests = { };  
  }  

}
