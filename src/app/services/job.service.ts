import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Job } from '../components/job-item/interface/job';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type" : "application/json"
  })
}

export interface ApiResponse {
  isError: boolean;
  messages: string[];
  data: Job[];
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private url = "https://localhost:7186/api/jobs"
  constructor(private http: HttpClient) {

  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<ApiResponse>(this.url, httpOptions).pipe(
      map(response => response.data)
    );
  }
}
