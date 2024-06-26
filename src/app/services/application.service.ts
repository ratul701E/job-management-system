import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map } from 'rxjs';
import { Application } from '../Interface/Application';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type" : "application/json",
  }),
}

export interface ApiResponseApplication<T> {
  isError: boolean;
  messages: string[];
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private url = environment.API_ENDPOINT + "/application"
  constructor(private http: HttpClient) {

  }

  postApplication(application: Application) : Observable<boolean> {
    return this.http.post<ApiResponseApplication<boolean>>(this.url, application, httpOptions).pipe(
      map(response => {
        return response.isError
      })
    )
  }

  getAllApplications(): Observable<Application[]> {
    return this.http.get<ApiResponseApplication<Application[]>>(this.url, httpOptions).pipe(
      map(response => response.data)
    );
  }

  getAllApplicationByID(appId: number): Observable<Application> {
    return this.http.get<ApiResponseApplication<Application>>(`${this.url}/${appId}`, httpOptions).pipe(
      map(response => {
        return response.data
      })
    );
  }
}
