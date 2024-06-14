import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SidebarParameters } from 'src/app/models/components/common/sidebarParameter.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private sidebarInitParams: SidebarParameters = {
    position: 'end',
    mode: 'over',
    disableClose: true,
  };
  
  private sidebarSwitch = new BehaviorSubject<boolean>(false);
  sidebarSwitch$ = this.sidebarSwitch.asObservable();

  private sidebarParams = new BehaviorSubject<SidebarParameters>(this.sidebarInitParams);
  sidebarParams$ = this.sidebarParams.asObservable();

  private sidebarContent = new BehaviorSubject<any>(null);
  sidebarContent$ = this.sidebarContent.asObservable();

  private callbackFunctionUsuario?: (idUsuario: string, aplicacion: string, usuario: string) => void;

  /* To Comunicate data between Sidebar and ChildComponent */
  private dataToSidebar = new BehaviorSubject<any>(null);
  dataToSidebar$ = this.dataToSidebar.asObservable();

  private dataToChildComponent = new BehaviorSubject<any>(null);
  dataToChildComponent$ = this.dataToChildComponent.asObservable();

  private dataToTicket = new BehaviorSubject<any>(null);
  dataToTicket$ = this.dataToTicket.asObservable();

  
  public openSidebar() {
    this.sidebarSwitch.next(true);
  }

  public closeSidebar() {
    this.sidebarSwitch.next(false);
  }

  public setSidebarParams(
    position: 'start'|'end' = 'end',
    mode: 'over'|'push'|'side' = 'over',
    disableClose: boolean = false,
  ) {
    const params: SidebarParameters = {
      position: position,
      mode: mode,
      disableClose: disableClose,
    };

    this.sidebarParams.next(params);
  }

  public setSidebarContent(component: any) {
    this.sidebarContent.next(component);
  }

  setCallbackFunctionUsuario(callback: (idUsuario: string, aplicacion: string, usuario: string) => void): void {
    this.callbackFunctionUsuario = callback;
  }


  invokeCallbackFunctionUsuario(idUsuario: string, aplicacion: string, usuario: string): void {
    if (this.callbackFunctionUsuario) {
      this.callbackFunctionUsuario(idUsuario, aplicacion, usuario);
    }
  }

  
  /* To Comunicate data between ChildComponent --> Sidebar*/
  public setDataToSidebarUse(data: any) {
    this.dataToSidebar.next(data);
    }
    
    /* To Comunicate data between Sidebar --> ChildComponent */
  public setDataToChildUse(data: any) {
    this.dataToChildComponent.next(data);
  }
}
