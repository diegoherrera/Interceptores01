import { TestBed } from '@angular/core/testing';

import { MyservicioService } from './myservicio.service';

describe('MyservicioService', () => {
  let service: MyservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
