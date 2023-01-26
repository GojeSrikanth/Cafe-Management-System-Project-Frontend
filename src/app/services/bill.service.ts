import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  generateReport(data: any) {
    return this.httpClient.post(this.url +
      "/bill/generateReport", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  getBills() {
    return this.httpClient.get(this.url + "/bill/getBills");
  }

  delete(id: any) {
    return this.httpClient.post(this.url +
      "/bill/delete/" + id, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
}
