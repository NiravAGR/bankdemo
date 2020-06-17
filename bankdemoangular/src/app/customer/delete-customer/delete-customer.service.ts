import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './delete-customer';


@Injectable()
export class DeleteCustomerService {

    private baseUrl = "http://localhost:8082/bankdemo/api/v1/";

    constructor(private httpService: HttpClient) {
    }


    getCustomer(customerId: number): Observable<any> {
        return this.httpService.get(`${this.baseUrl}` + "customer/" + `${customerId}`);
    }

    deleteCustomer(customerId: number): Observable<any> {
        return this.httpService.delete(`${this.baseUrl}` + "customer/" + `${customerId}`);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }


}