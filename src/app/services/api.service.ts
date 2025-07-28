import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface PartListDto {
  code: string;
  description: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getParts(): Observable<PartListDto[]> {
    return this.http.get<PartListDto[]>(`${this.apiUrl}/api/Parts`).pipe(
      catchError(this.handleError)
    );
  }

  deletePart(code: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/Parts/${code}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} - ${error.error?.detail || error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}