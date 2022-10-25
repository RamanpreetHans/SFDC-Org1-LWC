import { LightningElement,wire } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Employee__c.Name';
import EMPLOYEE_CODE_FIELD from '@salesforce/schema/Employee__c.Employee_Code__c';
import LAST_NAME_FIELD from '@salesforce/schema/Employee__c.Last_Name__c';
import getEmployees from '@salesforce/apex/employeeController.getEmployees';
const COLUMNS = [
    { label: 'Employee Code', fieldName: EMPLOYEE_CODE_FIELD.fieldApiName, type: 'text' },
    { label: 'First Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Last Name', fieldName: LAST_NAME_FIELD.fieldApiName, type: 'text' },
    { label: 'Email', fieldName: EMAIL_FIELD.fieldApiName, type: 'email'}
];
export default class EmployeeList2 extends LightningElement {

    columns = COLUMNS;
    @wire(getEmployees)
    employees;



}