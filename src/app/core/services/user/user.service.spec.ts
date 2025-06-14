import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { mock, instance, anything, verify, when, } from 'ts-mockito';
import { User } from '../../models/user.model';


describe('UserService', () => {
  let service: UserService;
  let mockHttpClient: HttpClient = mock(HttpClient);
  let httpClient = instance(mockHttpClient);

  beforeEach(() => {
    localStorage.clear();
    service = new UserService(httpClient);
  });

  afterEach(()=> {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('constructor should call validateEmail if userEmail is in localStorage', (done) => {
    localStorage.setItem('userEmail', 'test@example.com');
  
    const mockUsers: User[] = [{ id: 1, email: 'test@example.com', name: 'Test User' } as User];
    when(mockHttpClient.get<User[]>(anything())).thenReturn(of(mockUsers));
  
    service = new UserService(httpClient);
  
    verify(mockHttpClient.get<User[]>(anything())).atLeast(1);
  
    service.user$.subscribe(user => {
      if (user) {
        expect(user.email).toBe('test@example.com');
        done();
      }
    });
  });

  it('validateEmail should set currentUserSubject and localStorage if user found', done => {
    const mockUsers: User[] = [
      { id: 1, email: 'found@example.com', name: 'Found User' } as User,
      { id: 2, email: 'other@example.com', name: 'Other User' } as User
    ];

    when(mockHttpClient.get<User[]>(anything())).thenReturn(of(mockUsers));

    service.validateEmail('found@example.com').subscribe(result => {
      expect(result).toBeTrue();
      expect(service.getCurrentUser()?.email).toBe('found@example.com');
      expect(localStorage.getItem('userEmail')).toBe('found@example.com');
      done();
    });
  });

  it('validateEmail should return false and not set user if email not found', done => {
    const mockUsers: User[] = [
      { id: 1, email: 'someone@example.com', name: 'Someone' } as User
    ];

    when(mockHttpClient.get<User[]>(anything())).thenReturn(of(mockUsers));

    service.validateEmail('notfound@example.com').subscribe(result => {
      expect(result).toBeFalse();
      expect(service.getCurrentUser()).toBeNull();
      expect(localStorage.getItem('userEmail')).toBeNull();
      done();
    });
  });

  it('getCurrentUser should return the current user or null', () => {
    expect(service.getCurrentUser()).toBeNull();

    const user: User = { id: 10, email: 'a@b.com', name: 'A B' } as User;
    (service as any).currentUserSubject.next(user);

    expect(service.getCurrentUser()).toEqual(user);
  });

});
