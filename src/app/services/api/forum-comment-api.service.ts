import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForumCommentModel } from './models/forum-comment-model';

import { CREATE_COMMENT_URL, DELETE_COMMENT_URL, ALL_COMMENTS_URL} from '../../constants';
@Injectable({
  providedIn: 'root'
})
export class ForumCommentApiService {

  constructor(
    private http: HttpClient
  ) { }

  createComment(comment: ForumCommentModel) {
    return this.http.post(CREATE_COMMENT_URL, comment);
  }

  deleteComentById(commentId: Number) {
    return this.http.delete(`/${DELETE_COMMENT_URL}/${commentId}`);
  }

  getAllComents() {
    return this.http.get(ALL_COMMENTS_URL);
  }
}
