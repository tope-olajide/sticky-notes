import { InMemoryCache } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        /* Note: {
         fields: {
           content: {
             read(content) {
               return content.toUpperCase();
             }
           }
         }
       }, */ 
       Note: {
         fields: {
           isMaximized:{
             read(isMaximized = false) {
               return isMaximized ;
             },
             
           },
           isSaving:{
             read(isSaving = false) {
               return isSaving ;
             }
           },
            isError:{
             read(isError = false) {
               return isError ;
             }
           } 
         }
       }
     }
})