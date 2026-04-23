import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private http = inject(HttpClient);

  /**
   * GET Request
   * @param url API Endpoint
   * @param params Key-value pairs for query strings
   */
  get<T>(url: string, params?: Record<string, any>): Observable<T> {
    const options = { params: this.createParams(params) };
    return this.http.get<T>(url, options);
  }

  /**
   * POST Request
   * @param url API Endpoint
   * @param body Payload
   */
  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body);
  }

  /**
   * PUT Request
   * @param url API Endpoint
   * @param body Payload
   */
  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body);
  }

  /**
   * DELETE Request
   * @param url API Endpoint
   */
  delete<T>(url: string, params?: Record<string, any>): Observable<T> {
    const options = { params: this.createParams(params) };
    return this.http.delete<T>(url, options);
  }

  /**
   * Maps a standard JS Object to Angular HttpParams
   */
  private createParams(params?: Record<string, any>): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          httpParams = httpParams.append(key, value.toString());
        }
      });
    }
    return httpParams;
  }
}
