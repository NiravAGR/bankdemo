import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './new-customer';


@Injectable()
export class NewCustomerService {

    private baseUrl = "http://localhost:8082/bankdemo/api/v1/";

    constructor(private httpService: HttpClient) {
    }


    saveCustomerDetails(customer: Customer): Observable<Object> {
        return this.httpService.post(`${this.baseUrl}` + "save-customer", customer);
    }

    private handleError(error: Response) {
        return Observable.throw(error);
    }


}