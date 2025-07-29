import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

export interface PartListDto {
  code: string;
  description: string;
  status: string;
}

export interface PartDetailDto {
  code: string;
  description: string;
  status: string;
  currentStationName: string;
}

export interface MovementHistoryDto {
  date: string;
  originStationName: string | null;
  destinationStationName: string;
  responsible: string;
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

  getPart(code: string): Observable<PartDetailDto> {
    return this.http.get<PartDetailDto>(`${this.apiUrl}/api/Parts/${code}`).pipe(
      catchError(this.handleError)
    );
  }

  createPart(part: { code: string; description: string; responsible: string }): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/api/Parts`, part).pipe(
      catchError(this.handleError)
    );
  }

  updatePart(code: string, description: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/api/Parts/${code}`, { description }).pipe(
      catchError(this.handleError)
    );
  }

  movePart(code: string, responsible: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/api/Parts/${code}/move`, { responsible }).pipe(
      catchError(this.handleError)
    );
  }

  getPartHistory(code: string): Observable<MovementHistoryDto[]> {
    return this.http.get<MovementHistoryDto[]>(`${this.apiUrl}/api/Parts/${code}/history`).pipe(
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