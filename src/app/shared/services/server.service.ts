import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Status } from '../enuns/status.enum';
import { CustomResponse } from '../interfaces/custom-response';
import { Server } from '../interfaces/server';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ServerService {

  constructor(private http: HttpClient) { }

  servers$ = <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${environment.api}/server/list`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  save$ = (server: Server) => <Observable<CustomResponse>>
    this.http.post<CustomResponse>(`${environment.api}/server/save`, server)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  ping$ = ( ipAddress: string ) => <Observable<CustomResponse>>
    this.http.get<CustomResponse>(`${environment.api}/server/ping/${ipAddress}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  filter$ = ( status: Status, response: CustomResponse ) => <Observable<CustomResponse>>
    new Observable<CustomResponse>(
      suscriber => {
        console.log(response);
        suscriber.next(
          status === Status.ALL ? { ...response, message: `Servers filtered by ${ status } status` } :
            {
              ...response,
              message: response.data.servers //? tem que mudar a configuração do strict em tsconfig.json para não mostrar como erro.
                .filter(server => server.status === status).length > 0 ? `Servers filtrados por
          ${ status === Status.SERVER_UP ? 'SERVER UP' : 'SERVER DOWN' } status` : `Nenhum server ${status} encontrado!`,
              data: {
                servers: response.data.servers
                  .filter(server => server.status === status)
              }
            }
        );
        suscriber.complete();
      }
    )
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );

  delete$ = (serverId: number) => <Observable<CustomResponse>>
    this.http.delete<CustomResponse>(`${environment.api}/server/delete/${serverId}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      );


  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    return throwError(`Ocorreu um erro - Error code: ${error.status}`);
  }
}
