public class OpportunityTriggerHandler {
    
   public static void updateAccountRating(List<Opportunity> oppList)
    {
        List<Account> accList= new List<Account>();
        Set<Id> accIds = new Set<Id>();
        for (Opportunity opp : oppList)
        {
            if(opp.StageName=='Closed Won')
            {
            	accIds.add(opp.AccountId);    
            }
        }
        
        if(!accIds.isEmpty())
        {
       	accList = [SELECT ID,Custom_Rating__c FROM ACCOUNT WHERE ID IN :accIds ];     
        } 
        
        for(Account acc:accList)
        {
            acc.Custom_Rating__c='Hot';
        }
        
        update accList;
       
        
       
    }

}