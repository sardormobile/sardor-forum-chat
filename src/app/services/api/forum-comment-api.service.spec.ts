import { TestBed } from '@angular/core/testing';

import { ForumCommentApiService } from './forum-comment-api.service';

describe('ForumCommentApiService', () => {
  let service: ForumCommentApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumCommentApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
