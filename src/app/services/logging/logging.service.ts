import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  private isNotProduction = !environment.production;

  log(message: any) {
    if (this.isNotProduction) {
      console.log(message);
    }
  }

  error(message: any) {
    if (this.isNotProduction) {
      console.error(message);
    }
  }

  warn(message: any) {
    if (this.isNotProduction) {
      console.warn(message);
    }
  }

  info(message: any) {
    if (this.isNotProduction) {
      console.info(message);
    }
  }

  debug(message: any) {
    if (this.isNotProduction) {
      console.debug(message);
    }
  }

  trace(message: any) {
    if (this.isNotProduction) {
      console.trace(message);
    }
  }
}
