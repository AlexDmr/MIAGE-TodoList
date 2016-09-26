import { ComponentFixture, TestBed, ComponentFixtureAutoDetect
        , tick, async, fakeAsync }    from "@angular/core/testing";
import {By}                             from "@angular/platform-browser";
import { DebugElement }                 from "@angular/core";

import { FormsModule }                  from "@angular/forms";

import { ListeChosesService }           from "./nf/service";
import { ItemChose }                    from "./Chose";
import { ListeChoses }                  from "./ListeChoses";
import * as NF                          from "./nf/nf";

describe("Composant Angular2 ListeChose", function () {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports     : [ FormsModule ],
            declarations: [ ListeChoses, ItemChose ], // declare the test component
            providers   : [
                { provide   : ListeChosesService,
                    useValue: new ListeChosesService() },
                {   provide : ComponentFixtureAutoDetect,
                    useValue: true }
            ]
        });

    });
    it("Initialisation", fakeAsync( () => {
        let fixture = TestBed.createComponent(ListeChoses);
        let comp = fixture.componentInstance;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        expect( comp.nf ).toBeDefined("Le noyau devrait être définit");
        expect(comp.filtre).toBe(comp.filtreTous, "Le filtre devrait être initialisé à filtreTous.");
    }));
    it("Calcul du nombre de choses", fakeAsync( () => {
        let fixture = TestBed.createComponent(ListeChoses);
        let comp = fixture.componentInstance;

        fixture.detectChanges();
        tick();
        fixture.detectChanges();        // update view with nf

        // Simuler ajout de choses
        let inputNewTodo = fixture.debugElement.query(By.css('input.new-todo'));
        inputNewTodo.properties['value'] = "1";
        let formNewTodo = fixture.debugElement.query(By.css('form'));
        formNewTodo.triggerEventHandler("submit", null);


        expect(inputNewTodo).toBeDefined("il manque la balise input.new-todo");
        expect(comp.Nbchoses()).toEqual(1, "Il devrait y avoir trois choses");
        expect(comp.NbchosesAFaire()).toEqual(1, "Il devrait y avoir trois choses restantes");
    })) ;
    /*
    it("Calcul du nombre de choses restantes à faire après toggle", async( () => {
        let fixture = TestBed.createComponent(ListeChoses);

    })) ;
    */

});
