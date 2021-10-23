import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  private getRoute(route: string) {
    return `/api${route}`;
  }

  public async get(route: string) {
    return this.httpClient.get(this.getRoute(route));
  }

  public async post(route: string, payload: any) {
    return this.httpClient.post(this.getRoute(route), payload);
  }
}
