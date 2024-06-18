import { Injectable } from '@angular/core';
import { SigninDto } from '../Interface/SigninDto';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type" : "application/json"
  })
}

export interface ApiResponseSignin {
  isError: boolean;
  messages: string[];
  data: SigninDto;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "https://localhost:7186/api/auth/signin"
  constructor(private http: HttpClient) { }

  signIn(signinDto: SigninDto): Observable<SigninDto> {
    return this.http.post<ApiResponseSignin>(this.url, signinDto, httpOptions).pipe(
      map(response => response.data)
    );
  }
}
