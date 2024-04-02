import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForumItemModel } from './models/forum-item-model';
import { CREATE_POST_URL, DELETE_POST_URL, ALL_POSTS_URL, NAV_BAR_URL, NAV_BAR_CREATE_ITEM_URL } from '../../constants';
import { TopNavBarModel } from './models/TopNavBarModel';
@Injectable({
  providedIn: 'root'
})
export class ForumApiService {

  constructor(
    private http: HttpClient
  ) { }

  createPost(post: ForumItemModel) {
    console.log(`${post.userId}, ${post.message}`);
    return this.http.post<ForumItemModel>(CREATE_POST_URL, post);
  }
  deletePostById(postId: Number) {
    return this.http.delete(`${DELETE_POST_URL}/${postId}`);
  }
  getAllPosts() {
    return this.http.get<Array<ForumItemModel>>(ALL_POSTS_URL);
  }
  getAllPostsByTopicId(id: Number) {
    return this.http.get<Array<ForumItemModel>>(`${ALL_POSTS_URL}/${id}`);
  }
  insertNavBarItem(name: string) {
    return this.http.post<Array<TopNavBarModel>>(NAV_BAR_CREATE_ITEM_URL, name);
  }
  getNavBarItems() {
    return this.http.get<Array<TopNavBarModel>>(NAV_BAR_URL);
  }
  deleteNavBarItemByIndex(title:string) {
    return this.http.delete<any>(`${NAV_BAR_URL}/${title}`, {headers: {'Content-Type': 'application/json'}});
  }
}
