import { Injectable } from '@angular/core';
import { SigninDto } from '../Interface/SigninDto';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
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
  private url = environment.API_ENDPOINT + "/auth/signin"
  constructor(private http: HttpClient) { }
  private readonly tokenKey: string = "JwtAccessToken"

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  signIn(signinDto: SigninDto): Observable<ApiResponseSignin> {
    return this.http.post<ApiResponseSignin>(this.url, signinDto, httpOptions)
  }
}
