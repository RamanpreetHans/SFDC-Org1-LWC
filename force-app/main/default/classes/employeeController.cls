public with sharing class employeeController {
    
    @AuraEnabled(cacheable=true)
    public static List<Employee__c> getEmployees(){
            return [
                SELECT Employee_Code__c	, Name, Last_Name__c, Email__c
                FROM Employee__c
                WITH SECURITY_ENFORCED
                ORDER BY CreatedDate Desc
            ];
    
    }

    @AuraEnabled
    public static Employee__c createEmployee(Employee__c employee){
        try {
            
            insert employee;
            return employee;
        } 
        
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}