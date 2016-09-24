import { Component, NgModule }      from "@angular/core";
import { BrowserModule }            from "@angular/platform-browser";
import { ListeChosesModule }        from "./components/ListeChosesModule";
import { platformBrowserDynamic }   from "@angular/platform-browser-dynamic";
import {ListeChoses}                from "./components/ListeChoses";

@Component({
    selector		: "demo-m2m",
    template		: `
        <liste-choses titre="Démo M2"></liste-choses>
        `,
    directives	: [ ListeChoses ]
})
class CompDemoM2M {}


@NgModule({
    imports:      [ BrowserModule, ListeChosesModule ],
    declarations: [ CompDemoM2M ],
    bootstrap:    [ CompDemoM2M ]
})
export class AppModule { }

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
