import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/api/users';
  private pmUrl = 'http://localhost:8080/server/list';
  private adminUrl = 'http://localhost:8080/api/user/save/';

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text'});
  }

  getPmUrl(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text'});
  }

  getAdminUrl(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text'});
  }
}
