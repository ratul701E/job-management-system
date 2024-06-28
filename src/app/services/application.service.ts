import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, catchError, map } from 'rxjs';
import { Application } from '../Interface/Application';
import { environment } from 'src/environments/environment';
import { ServiceResult } from '../Interface/ServiceResult';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type" : "multipart/form-data",
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

  postApplication(application: Application) : Observable<ApiResponseApplication<boolean>> {
    return this.http.post<ApiResponseApplication<boolean>>(this.url, application)
  }

  getAllApplications(): Observable<ApiResponseApplication<Application[]>> {
    return this.http.get<ApiResponseApplication<Application[]>>(this.url, httpOptions)
  }

  getAllApplicationByID(appId: number): Observable<ApiResponseApplication<Application>> {
    return this.http.get<ApiResponseApplication<Application>>(`${this.url}/${appId}`, httpOptions)
  }
}
