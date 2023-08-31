import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return photos', () => {
    const mockPhotos = [
      { id: 1, title: 'Photo 1' },
      { id: 2, title: 'Photo 2' },
    ];

    service.getPhotos().subscribe((photos) => {
      expect(photos).toEqual(mockPhotos);
    });

    const req = httpMock.expectOne(`${service.URL}${service.DATA_PHOTOS}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPhotos);
  });

  it('should handle error', () => {
    const errorMessage = 'Server error';
    const error = new ErrorEvent('ServerError', {
      error: new Error(errorMessage),
    });

    service.getPhotos().subscribe(
      () => fail('expected an error, but got a success response'),
      (err) => {
        expect(err).toEqual('Something went wrong; please try again later.');
      }
    );

    const req = httpMock.expectOne(`${service.URL}${service.DATA_PHOTOS}`);
    req.error(error);
  });
});
