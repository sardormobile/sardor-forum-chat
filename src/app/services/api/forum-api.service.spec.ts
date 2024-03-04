import { TestBed } from '@angular/core/testing';

import { ForumApiService } from './forum-api.service';

describe('ForumApiService', () => {
  let service: ForumApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
