import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DataState } from '../../shared/enuns/data-state.enum';
import { Status } from '../../shared/enuns/status.enum';
import { AppState } from '../../shared/interfaces/app-state';
import { CustomResponse } from '../../shared/interfaces/custom-response';
import { Server } from '../../shared/interfaces/server';
//import { NotificationService } from '../../shared/services/notification.service';
import { ServerService } from '../../shared/services/server.service';
import { Task } from '../shared/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  appState$: Observable<AppState<CustomResponse>>;
  readonly DataState = DataState;
  readonly Status = Status;
  private filterSubject = new BehaviorSubject<string>('');
  private dataSubject = new BehaviorSubject<CustomResponse>(null);
  filterStatus$ = this.filterSubject.asObservable();
  private isLoading = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading.asObservable();
  
  tasks: Task[] = [];



  constructor(private serverService: ServerService/*, private notifier: NotificationService*/) { }

  ngOnInit() {
    this.appState$ = this.serverService.servers$
    .pipe(
      map(response => {
        console.log(response);
        //this.notifier.onDefault(response.message);
        this.dataSubject.next(response);
        return { dataState: DataState.LOADED_STATE, appData: { ...response, data: { servers: response.data.servers.reverse() } } }
      }),
      startWith({ dataState: DataState.LOADING_STATE }),
      catchError((error: string) => {
        //this.notifier.onError(error);
        return of({ dataState: DataState.ERROR_STATE, error });
      })
    );
  }



  onTaskDeleted(task: Task) {
    if (task) {
      const index = this.tasks.findIndex((taskItem) => taskItem._id == task._id);
      this.tasks.splice(index, 1);
    }
  }

  // pingServer(ipAddress: string): void {
  //   this.filterSubject.next(ipAddress);
  //   this.appState$ = this.serverService.ping$(ipAddress)
  //     .pipe(
  //       map(response => {
  //         const index = this.dataSubject.value.data.servers.findIndex(server =>  server.id === response.data.server.id);
  //         this.dataSubject.value.data.servers[index] = response.data.server;
  //         this.notifier.onDefault(response.message);
  //         this.filterSubject.next('');
  //         return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }
  //       }),
  //       startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
  //       catchError((error: string) => {
  //         this.filterSubject.next('');
  //         this.notifier.onError(error);
  //         return of({ dataState: DataState.ERROR_STATE, error });
  //       })
  //     );
  // }

  saveServer(serverForm: NgForm): void {
    this.isLoading.next(true);
    this.appState$ = this.serverService.save$(serverForm.value as Server)
      .pipe(
        map(response => {
          this.dataSubject.next(
            {...response, data: { servers: [response.data.server, ...this.dataSubject.value.data.servers] } }
          );
          //this.notifier.onDefault(response.message);
          document.getElementById('closeModal').click();
          this.isLoading.next(false);
          serverForm.resetForm({ status: this.Status.SERVER_DOWN });
          return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }
        }),
        startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
        catchError((error: string) => {
          this.isLoading.next(false);
          //this.notifier.onError(error);
          return of({ dataState: DataState.ERROR_STATE, error });
        })
      );
}

saveUser(formUser: NgForm): void{
      console.log(formUser);
}

  filterServers(status: Status): void {
    this.appState$ = this.serverService.filter$(status, this.dataSubject.value)
      .pipe(
        map(response => {
          //this.notifier.onDefault(response.message);
          return { dataState: DataState.LOADED_STATE, appData: response };
        }),
        startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
        catchError((error: string) => {
          //this.notifier.onError(error);
          return of({ dataState: DataState.ERROR_STATE, error });
        })
      );
  }

  deleteServer(server: Server): void {
    this.appState$ = this.serverService.delete$(server.id)
      .pipe(
        map(response => {
          this.dataSubject.next(
            { ...response, data:
              { servers: this.dataSubject.value.data.servers.filter(s => s.id !== server.id)} }
          );
          //this.notifier.onDefault(response.message);
          return { dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }
        }),
        startWith({ dataState: DataState.LOADED_STATE, appData: this.dataSubject.value }),
        catchError((error: string) => {
          //this.notifier.onError(error);
          return of({ dataState: DataState.ERROR_STATE, error });
        })
      );
  }

  printReport(): void {
    //this.notifier.onDefault('Report downloaded');
    window.print();

    let dataType = 'application/vnd.ms-excel.sheet.macroEnabled.12';
    let tableSelect = document.getElementById('servers');
    let tableHtml = tableSelect.outerHTML.replace(/ /g, '%20');
    let downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    downloadLink.href = 'data:' + dataType + ', ' + tableHtml;
    downloadLink.download = 'server-report.xls';
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}

function sleep(arg0: number) {
  throw new Error('Function not implemented.');
}
