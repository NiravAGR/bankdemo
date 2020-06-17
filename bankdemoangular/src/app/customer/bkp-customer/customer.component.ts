import {Component, OnInit} from '@angular/core'
import {Customer} from './customer'
import { CustomerService } from './customer.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit{

    customers: Customer[];
    customer = new Customer();
    customerIdField: number;
    apiResponse: string;
    registerForm: FormGroup;
    actionTitle1 = "Add New Customer:";
    saved = false;
    mobNumberPattern = "^[0-9]{10}$";
    ssnPattern = "^[0-9]{9}$";

    constructor(private customerService: CustomerService, 
        private formBuilder: FormBuilder){        
    }

    ngOnInit(): void{
        this.getCustomerList();
        this.registerForm = this.formBuilder.group({
            customerId: [null, []],
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            mobileNumber: [null, [Validators.required]],
            emailID: [null, [Validators.required, Validators.email]],
            address: [null, [Validators.required]],
            city: [null, [Validators.required]],
            ssn: [null, [Validators.required]]
        });
    }

    formRegistration(): void{
        this.registerForm = this.formBuilder.group({
            customerId: [this.customer.customerId, []],
            firstName: [this.customer.firstName, [Validators.required]],
            lastName: [this.customer.lastName, [Validators.required]],
            mobileNumber: [this.customer.mobileNumber, [Validators.required]],
            emailID: [this.customer.emailID, [Validators.required, Validators.email]],
            address: [this.customer.address, [Validators.required]],
            city: [this.customer.city, [Validators.required]],
            ssn: [this.customer.ssn, [Validators.required]]
        });
    }

    get fields() { 
        return this.registerForm.controls; 
    }

    getCustomerList(): void{
        this.customerService.getCustomerList()
            .subscribe((customerList) => {
                    this.customers = customerList, 
                    console.log(customerList);
            }, (error) => {
                    console.log(error);
                }
            );
    }

    getCustomer(customerId: number): void{
        this.reset();
        this.actionTitle1 = "Edit Customer Details:";
        window.scroll(0,0);
        this.customerService.getCustomer(customerId)
            .subscribe((customerDetails) => {
                    this.customer = customerDetails, 
                    this.registerForm.setValue = customerDetails;
                    this.formRegistration();
                    console.log("customerDetails" + JSON.stringify(customerDetails));
                    console.log("registerForm" + JSON.stringify(this.registerForm.value));
            }, (error) => {
                    console.log(error);
                }
            );   
    }

    saveCustomerDetails(): void{
        console.log("customer" + JSON.stringify(this.customer));
        console.log("registerForm" + JSON.stringify(this.registerForm.value));
        this.saved = true;
        console.log("save before");
        if (this.registerForm.invalid) {
            console.log("save in");
            return;
        }
        this.customerService.saveCustomerDetails(this.registerForm.value)
            .subscribe((response: JSON) => {
                console.log(response);
                this.apiResponse = Object.values(response)[0];
                this.actionTitle1 = "Add New Customer:";
                this.reset();
                this.getCustomerList();
            },
                        (error) => {
                            console.log(error);
                        }
            )
    }

    updateCustomerDetails(): void{
        if (this.registerForm.invalid) {
            return;
        }
        this.customerService.saveCustomerDetails(this.customer)
            .subscribe((response: JSON) => {
                console.log(response);
                this.apiResponse = Object.values(response)[0];
                this.reset();
                this.getCustomerList();
            },
                        (error) => {
                            console.log(error);
                        }nfg
            )
    }

    deleteCustomer(customerId: number){
        window.scroll(0,0);
        this.customerService.deleteCustomer(customerId)
            .subscribe((response: JSON) => {
                console.log(response);                
                this.getCustomerList();
                this.apiResponse = Object.values(response)[0];
            },
                        (error) => {console.log(error)}
            )
    }

    private reset(): void{
        console.log("inside reset");
        this.customer.customerId = null;
	    this.customer.firstName = null;
	    this.customer.lastName = null;
	    this.customer.mobileNumber = null;
	    this.customer.emailID = null;
	    this.customer.address = null;
	    this.customer.city = null;
        this.customer.ssn = null;
        this.saved = false;
    }
}