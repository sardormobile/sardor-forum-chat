import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForumItemModel } from './models/forum-item-model';
import { UserDataModel } from './models/user-data-model';

import { SIGNUP_URL, LOGIN_URL, LOGOUT_URL } from '../../constants';


@Injectable({
  providedIn: 'root'
})
export class RegisterApiService {

  constructor(
    private http: HttpClient
  ) { }

  signUp(user: UserDataModel) {
    return this.http.post<UserDataModel>(SIGNUP_URL, user);
  }

  logIn(user: UserDataModel) {
    return this.http.post<UserDataModel>(LOGIN_URL, user);
  }
  
  logOut() {
    return this.http.get<string>(LOGOUT_URL);
  }
}
