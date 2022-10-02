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
           isDeleteNoteModalVisible:{
            read(isDeleteNoteModalVisible = false) {
              return isDeleteNoteModalVisible ;
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