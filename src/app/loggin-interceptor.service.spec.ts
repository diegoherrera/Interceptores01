import { TestBed } from '@angular/core/testing';

import { LogginInterceptorService } from './loggin-interceptor.service';

describe('LogginInterceptorService', () => {
  let service: LogginInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogginInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
