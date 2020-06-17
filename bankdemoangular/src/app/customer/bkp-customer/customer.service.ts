import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './customer';


@Injectable()
export class CustomerService{
    
    private baseUrl = "http://localhost:8082/bankdemo/api/v1/";

    constructor(private httpService: HttpClient){
    }

    getCustomerList(): Observable<any>{
        return this.httpService.get(`${this.baseUrl}` + "all-customers");     
    }

    getCustomer(customerId: number): Observable<any>{
        return this.httpService.get(`${this.baseUrl}` + "customer/" + `${customerId}`);
    }

    saveCustomerDetails(customer: Customer): Observable<Object>{
          console.log("Inside save.."+ customer.customerId + customer.city);
        if(customer.customerId) {
            return this.httpService.put(`${this.baseUrl}` + "customer/" + `${customer.customerId}`, customer);
        }
        return this.httpService.post(`${this.baseUrl}` + "save-customer", customer);
    }

    updateCustomerSsn(customerId: number, customer: Customer): Observable<any>{
        return this.httpService.put(`${this.baseUrl}` + "customer/" + `${customerId}`, customer);
    }

    deleteCustomer(customerId: number): Observable<any>{
        return this.httpService.delete(`${this.baseUrl}` + "customer/" + `${customerId}`);
    }

    private handleError(error: Response){
        return Observable.throw(error);
    }           
    
    
}