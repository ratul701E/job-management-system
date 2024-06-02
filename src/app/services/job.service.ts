import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Job } from '../components/job-item/interface/Job';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type" : "application/json"
  })
}

export interface ApiResponseJobs {
  isError: boolean;
  messages: string[];
  data: Job[];
}
export interface ApiResponseJob {
  isError: boolean;
  messages: string[];
  data: Job;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private url = "https://localhost:7186/api/jobs"
  constructor(private http: HttpClient) {

  }

  getAllJobs(): Observable<Job[]> {
    return this.http.get<ApiResponseJobs>(this.url, httpOptions).pipe(
      map(response => response.data)
    );
  }

  getAllApplicationByID(jobId: number): Observable<Job> {
    return this.http.get<ApiResponseJob>(`${this.url}/${jobId}`, httpOptions).pipe(
      map(response => {
        return response.data
      })
    );
  }
}
