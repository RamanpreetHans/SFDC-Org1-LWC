import { LightningElement } from 'lwc';
import EMPLOYEE_OBJECT from '@salesforce/schema/Employee__c';
import FIRST_NAME from '@salesforce/schema/Employee__c.Name';
import LAST_NAME from '@salesforce/schema/Employee__c.Last_Name__c';
import EMAIL from '@salesforce/schema/Employee__c.Email__c';
import PHONE from '@salesforce/schema/Employee__c.Phone__c';
import DOB from '@salesforce/schema/Employee__c.Date_of_Birth__c';
import EMPLOYEE_CODE from '@salesforce/schema/Employee__c.Employee_Code__c';
import COUNTRY from '@salesforce/schema/Employee__c.Country__c';
import STATE from '@salesforce/schema/Employee__c.State__c';
import POSTAL_CODE from '@salesforce/schema/Employee__c.Postal_Code__c';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import createEmployee from '@salesforce/apex/employeeController.createEmployee'; 
export default class EmployeeExercise extends LightningElement {

    employeeId;
    employeeRecord = {
        Name: FIRST_NAME,
        Last_Name__c: LAST_NAME,
        Email__c:EMAIL,
        Phone__c:PHONE,
        Date_of_Birth__c:DOB,
        Employee_Code__c:EMPLOYEE_CODE,
        Country__c:COUNTRY,
        State__c:STATE,
        Postal_Code__c:POSTAL_CODE
    }
    

    refreshList()
    {
        this.template.querySelector('c-employee-list').refresh();
    }
    
    handleFirstName(event)
    {
        this.employeeRecord.Name = event.target.value;
    }


    handleLastName(event)
    {
        this.employeeRecord.Last_Name__c = event.target.value;
    }

    handleEmail(event)
    {
        this.employeeRecord.Email__c = event.target.value;
    }

    handlePhone(event)
    {
        this.employeeRecord.Phone__c = event.target.value;
    }

    handleDOB(event)
    {
        this.employeeRecord.Date_of_Birth__c = event.target.value;
    }

    handleEmployeeCode(event)
    {
        this.employeeRecord.Employee_Code__c = event.target.value;
    }

    handleCountry(event)
    {
        this.employeeRecord.Country__c = event.target.value;
    }

    handleState(event)
    {
        this.employeeRecord.State__c = event.target.value;
    }

    handlePostalCode(event)
    {
        this.employeeRecord.Postal_Code__c = event.target.value;
    }

    createEmployeeRecord()
    {
     
        createEmployee({ employee : this.employeeRecord })
        .then( result => 
            {
                this.employeeId=result.Id;
                this.employeeRecord = {};
                this.dispatchEvent( new ShowToastEvent({
                    title: 'Success '+result.Id,
                    message: 'Record Created',
                    variant: 'success'
                })
                );
                this.refreshList();

            })
        .catch( error => 
            {
                this.dispatchEvent( new ShowToastEvent({
                    title:'Error Occured',
                    message: error.body.message,
                    variant: 'error'
                }));
            });

    }

    cancelRecord()
    {
        this.employeeRecord = {};
    }
}