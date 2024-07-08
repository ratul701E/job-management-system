import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private url = environment.API_ENDPOINT + "/feedback"
  
  constructor(private http: HttpClient) { }

  getFeedback(): Observable<boolean> {
    return this.http.get<boolean>(this.url, httpOptions)
  }
}
