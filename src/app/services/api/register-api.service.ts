import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDataModel } from './models/user-data-model';

import { SIGNUP_URL, LOGIN_URL, LOCAL_STORAGE_KEY, GET_USER_BY_USERNAME_URL, LOCAL_STORAGE_USER_DATA_KEY } from '../../constants';
import { Observable, catchError, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegisterApiService {

  constructor(
    private http: HttpClient
  ) { }

  signUp(user: UserDataModel): Observable<UserDataModel> {
    return this.http.post<UserDataModel>(SIGNUP_URL, user)
      .pipe(
        tap((res) => {
          if (res.token && res.userId) {
            const userDataJson = JSON.stringify(res);
            localStorage.clear();
            localStorage.setItem(LOCAL_STORAGE_KEY, res.token);
            localStorage.setItem(LOCAL_STORAGE_USER_DATA_KEY, userDataJson);
          }
          console.log(`signUp result: ${res}`);
        })
      );
      }

  logIn(user: UserDataModel) {
    return this.http.post<UserDataModel>(LOGIN_URL, user)
    .pipe(
      tap((res) => {
        if (res.token) {
          const userDataJson = JSON.stringify(res);
          localStorage.clear();
          localStorage.setItem(LOCAL_STORAGE_KEY, res.token);
          localStorage.setItem(LOCAL_STORAGE_USER_DATA_KEY, userDataJson);
        }
      }),
      catchError((error: HttpErrorResponse ) => {
        return throwError(`There was a signIn error!: ${error}`);
      })
    );
  }
  
  logOut() {
    localStorage.clear();
  }

  getUserByUsername(username: number) {
    return this.http.get<UserDataModel>(`${GET_USER_BY_USERNAME_URL}/${username}`)
    /* .pipe(
      tap((res) => {
        if (res.token) {
          const userDataJson = JSON.stringify(res);
          localStorage.removeItem(LOCAL_STORAGE_USER_DATA_KEY);
          localStorage.setItem(LOCAL_STORAGE_USER_DATA_KEY, userDataJson);
        }
      }),
      catchError((error: HttpErrorResponse ) => {
        return throwError(`There was a signIn error!: ${error}`);
      })
    ); */
  }
}
