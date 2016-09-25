import {ComponentFixture, TestBed, ComponentFixtureAutoDetect}    from "@angular/core/testing";
import {By, BrowserModule}                           from "@angular/platform-browser";
import { DebugElement }                 from "@angular/core";

import { FormsModule, ReactiveFormsModule }                  from "@angular/forms";
import { CommonModule }                 from "@angular/common";

import { ListeChosesService }           from "./nf/service";
import { ItemChose }                    from "./Chose";
import { ListeChoses }                  from "./ListeChoses";
import * as NF                          from "./nf/nf";

let comp:    ListeChoses;
let fixture: ComponentFixture<ListeChoses>;
let el:      DebugElement;
let ListeChosesServiceStub = {
    nf  : new NF.ListeChoses(),
    getData	() : Promise<NF.ListeChoses> {
        return Promise.resolve( this.nf );
    }
};

describe("Composant Angular2 ListeChose", function () {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports     : [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule],
            declarations: [ ListeChoses, ItemChose ], // declare the test component
            providers   : [
                {   provide : ListeChosesService,
                    useValue: ListeChosesServiceStub },
                {   provide : ComponentFixtureAutoDetect,
                    useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ListeChoses);
        comp = fixture.componentInstance; // BannerComponent test instance
        // get title DebugElement by element name
        el = fixture.debugElement.query(By.css("h1"));
        // Get the injected service
        let serviceListe = fixture.debugElement.injector.get(ListeChosesService);
        serviceListe.nf.Ajouter("1").Ajouter("2").Ajouter("3");
    });
    it("2 Filtre initialisé à TOUS", () => {
        expect(comp.filtre).toBe(comp.filtreTous, "Le filtre devrait être initialisé à filtreTous.");
    });
    it("2 Calcul du nombre de choses à faire", () => {
        expect(comp.NbchosesAFaire()).toEqual(3, "Il reste trois choses à faire");
    });

});
