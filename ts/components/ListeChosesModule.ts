import { NgModule }         from "@angular/core";
import { FormsModule }      from "@angular/forms";
import { CommonModule }     from "@angular/common";
import {ListeChosesService} from "./nf/service";
import {ItemChose}          from "./Chose";
import {ListeChoses}        from "./ListeChoses";


@NgModule({
    imports     : [ CommonModule, FormsModule ],
    exports     : [ ListeChoses ],
    declarations: [ ListeChoses, ItemChose ],
    providers   : [ ListeChosesService ],

})
export class ListeChosesModule { }
