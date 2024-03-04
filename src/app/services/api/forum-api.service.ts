import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForumItemModel } from './models/forum-item-model';
import { UserDataModel } from './models/user-data-model';

@Injectable({
  providedIn: 'root'
})
export class ForumApiService {

  private baseUrl: string = 'http://localhost:8010/';

  constructor(
    private http: HttpClient
  ) { }

  getAllForumContent() {
    const posts = `${this.baseUrl}api/users`;
    return this.http.get<Array<ForumItemModel>>(posts);
  }

  signUp(user: UserDataModel) {
    const postUrl = `${this.baseUrl}api/signup`;
    return this.http.post<UserDataModel>(postUrl, user);
  }

  logIn(user: UserDataModel) {
    const postUrl = `${this.baseUrl}api/login`;
    return this.http.post<UserDataModel>(postUrl, user);
  }
  
  logOut() {
    const getUrl = `${this.baseUrl}api/logout`;
    return this.http.get<string>(getUrl);
  }
}
