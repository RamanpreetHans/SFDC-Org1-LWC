public with sharing class UserController {
    
    @AuraEnabled(cacheable=true)
    public static List<TaskUser__c> getUsers() {
        return [ SELECT Id, Name FROM TaskUser__c ];

}

}