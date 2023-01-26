import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data: any) {
    return this.httpClient.post(this.url +
      "/product/add", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  update(data: any) {
    return this.httpClient.post(this.url +
      "/product/update", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  getProducts() {
    return this.httpClient.get(this.url + "/product/get");
  }

  getByCategory(id: any) {
    return this.httpClient.get(this.url + "/product/getByCategory/" + id);
  }

  getById(id: any) {
    return this.httpClient.get(this.url + "/product/getById/" + id);
  }

  updateStatus(data: any) {
    return this.httpClient.post(this.url +
      "/product/updateStatus", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  delete(id: any) {
    return this.httpClient.post(this.url +
      "/product/delete/" + id, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  public getPDF(data: any): Observable<Blob> {
    //const options = { responseType: 'blob' }; there is no use of this
    let uri = this.url + "/bill/getPdf";
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.httpClient.post(uri, data, { responseType: 'blob' });
  }
}
