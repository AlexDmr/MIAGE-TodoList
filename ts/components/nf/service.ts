import { Injectable } from "@angular/core";
import * as NF from "./nf";

@Injectable()
export class ListeChosesService {
    nf: NF.ListeChoses;
    //constructor() {}
    getData	() : Promise<NF.ListeChoses> {
        this.nf = new NF.ListeChoses();
        return Promise.resolve( this.nf );
    }
};
