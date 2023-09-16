import { TestBed } from '@angular/core/testing';

import { UserRepository } from './user.repository';

describe('UserRepositoryService', () => {
  let service: UserRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
