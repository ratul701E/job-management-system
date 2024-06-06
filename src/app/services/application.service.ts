import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map } from 'rxjs';
import { Application } from '../Interface/Application';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type" : "application/json",
  }),
}

export interface ApiResponseApplications {
  isError: boolean;
  messages: string[];
  data: Application[];
}
export interface ApiResponseApplication {
  isError: boolean;
  messages: string[];
  data: Application;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private url = "https://localhost:7186/api/application"
  constructor(private http: HttpClient) {

  }

  postApplication(application: Application) : Observable<boolean> {
    return this.http.post<ApiResponseApplication>(this.url, application, httpOptions).pipe(
      map(response => {
        return response.isError
      })
    )
  }

  getAllApplications(): Observable<Application[]> {
    return this.http.get<ApiResponseApplications>(this.url, httpOptions).pipe(
      map(response => response.data)
    );
  }

  // getAllApplicationByID(appId: number): Observable<Application> {
  //   return this.http.get<ApiResponseJob>(`${this.url}/${appId}`, httpOptions).pipe(
  //     map(response => {
  //       return response.data
  //     })
  //   );
  // }
}
