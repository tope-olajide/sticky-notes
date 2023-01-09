import { InMemoryCache } from '@apollo/client';

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
       Note: {
         fields: {
           isMaximized:{
             read(isMaximized = false) {
               return isMaximized ;
             },
           },
           isDeleteNoteConfirmationVisible:{
            read(isDeleteNoteConfirmationVisible = false) {
              return isDeleteNoteConfirmationVisible ;
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
           },
           isSaved:{
            read(isSaved = true) {
              return isSaved ;
            }
          } 
         }
       }
     }
})