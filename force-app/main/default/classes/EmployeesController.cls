public with sharing class EmployeesController {
    
    @AuraEnabled
    public static List<Employee__c> getEmployees()
    {
        // U can per4m Accessibility Check here first for the fields
        return [Select Id, Employee_Code__c,Name, Last_Name__c,Email__c, Country__c,Postal_Code__c From Employee__c ORDER BY CreatedDate DESC];
    }
    
    @AuraEnabled
    public static Employee__c saveEmployeeRecord(Employee__c newEmployee)
    {
		upsert newEmployee;
		return newEmployee;   
    }
    
    @AuraEnabled
    public static Employee__c getEmployeeById(String recId)
    {
        return [SELECT ID, NAME, EMPLOYEE_CODE__C,LAST_NAME__C,EMAIL__C,PHONE__C,DATE_OF_BIRTH__C,STATE__C,POSTAL_CODE__C,COUNTRY__C FROM EMPLOYEE__C WHERE ID=:recId];
    }

}