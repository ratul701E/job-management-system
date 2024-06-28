import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map } from 'rxjs';
import { Job } from '../components/job-item/interface/Job';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type" : "application/json"
  })
}

export interface ApiResponseJob<T> {
  isError: boolean;
  messages: string[];
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private url = environment.API_ENDPOINT + "/jobs"
  constructor(private http: HttpClient) {

  }

  getAllJobs(): Observable<ApiResponseJob<Job[]>> {
    return this.http.get<ApiResponseJob<Job[]>>(this.url, httpOptions)
  }

  getJobByID(jobId: number, query: string = ''): Observable<ApiResponseJob<Job>> {
    return this.http.get<ApiResponseJob<Job>>(`${this.url}/${jobId}?${query}`, httpOptions)
  }

  updateJob(jobId: number, job: Job): Observable<ApiResponseJob<Job>> {
    return this.http.patch<ApiResponseJob<Job>>(this.url + `/${jobId}`, job, httpOptions)
  }
  addJob(jobId: number, job: Job): Observable<ApiResponseJob<Job>> {
    return this.http.post<ApiResponseJob<Job>>(this.url, job, httpOptions)
  }
  
  removeJob(jobId: number): Observable<ApiResponseJob<boolean>> {
    return this.http.delete<ApiResponseJob<boolean>>(this.url + `/${jobId}`, httpOptions)
  }
}
