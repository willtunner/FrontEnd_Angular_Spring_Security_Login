import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { User } from "./../models/User";
import { CustomResponse } from "../interfaces/custom-response";
import { environment } from "src/environments/environment";
import { tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  save$ = (user: User) =>
    <Observable<CustomResponse>>(
      this.http
        .post<CustomResponse>(`${environment.api}/api/save`, user)
        .pipe(tap(console.log), catchError(this.handleError))
    );

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`Ocorreu um erro - Error code: ${error.status}`);
  }
}
