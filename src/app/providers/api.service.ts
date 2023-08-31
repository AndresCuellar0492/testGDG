import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public readonly URL = environment.url;
  public readonly DATA_PHOTOS = environment.dataPhotos;

  constructor(private http: HttpClient) {}

  getPhotos(): Observable<any> {
    return this.http
      .get(`${this.URL}${this.DATA_PHOTOS}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => 'Something went wrong; please try again later.');
  }
}
