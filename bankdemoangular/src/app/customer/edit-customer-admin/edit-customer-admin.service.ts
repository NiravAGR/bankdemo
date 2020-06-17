import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './edit-customer-admin';


@Injectable()
export class EditCustomerAdminService{
    
    private baseUrl = "http://localhost:8082/bankdemo/api/v1/";

    constructor(private httpService: HttpClient){
    }

    getCustomer(customerId: number): Observable<any>{
        return this.httpService.get(`${this.baseUrl}` + "customer/" + `${customerId}`);
    }

    saveCustomerDetails(customer: Customer): Observable<Object>{
        if(customer.customerId) {
            return this.httpService.put(`${this.baseUrl}` + "customer/" + `${customer.customerId}`, customer);
        }
    }

    private handleError(error: Response){
        return Observable.throw(error);
    }           
    
    
}