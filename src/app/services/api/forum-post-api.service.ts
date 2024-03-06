import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForumItemModel } from './models/forum-item-model';
import { CREATE_POST_URL, DELETE_POST_URL, ALL_POSTS_URL } from '../../constants';
@Injectable({
  providedIn: 'root'
})
export class ForumApiService {

  constructor(
    private http: HttpClient
  ) { }

  createPost(post: ForumItemModel) {
    return this.http.post<ForumItemModel>(CREATE_POST_URL, post);
  }
  deletePstById(postId: Number) {
    return this.http.delete(`/${DELETE_POST_URL}/postId:${postId}`);
  }
  getAllPosts() {
    return this.http.get<Array<ForumItemModel>>(ALL_POSTS_URL);
  }
}
