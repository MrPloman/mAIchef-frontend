import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderFacade } from '../../store/facades/loader.facade';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private readonly loaderFacade: LoaderFacade) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    if (request.headers.get('X-Skip-Loader') === 'true') {
      return next.handle(request);
    }

    this.loaderFacade.show();

    return next.handle(request).pipe(finalize(() => this.loaderFacade.hide()));
  }
}
