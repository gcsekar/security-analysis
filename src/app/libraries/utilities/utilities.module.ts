import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class UtilitiesModule {

    /**
     * Returns the count of rows in the array with field matching specific value
     * 
     * Data: Array of data object
     * Field: to to apply the function
     * Compare: Value to match
     */
    getCount( data, field, compare ) {
        var count = 0;
        for ( var i = 0; i < data.length; i++ ) {
            var item = data[i];
            if ( item[field] == compare ) {
                count++;
            }
        }
        return count;
    }
    
}
