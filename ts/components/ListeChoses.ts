import { Component, Input 	} 	from "@angular/core";
import { ItemChose }			from "./Chose";
import * as NF 					from "./nf/nf";
import {ListeChosesService}     from "./nf/service";

const htmlTemplate = `
	<section class="todoapp" *ngIf="nf">
		<header class="header">
			<h1>{{titre}}</h1>
			<form (ngSubmit)="Ajouter(newTodo.value); newTodo.value='';">
				<input class="new-todo" placeholder="Que faire?" #newTodo autofocus>
			</form>
		</header>
		<section class="main">
			<input  class="toggle-all" 
			        type="checkbox"
			        [ngModel]="toutEstFait()"
			        (ngModelChange)="toutFaireOuDefaire()"
			        />
			<label for="toggle-all">Mark all as complete</label>
			<ul class="todo-list" *ngIf="nf">
			    <li *ngFor="let chose of getChoses()" 
			        [class.editing]="item.editing" 
			        [class.completed]="chose.fait"
			        >
			        <item-chose #item [nf]="chose"></item-chose>
                </li>
            </ul>
		</section>
        <footer class="footer">
            <span class="todo-count"><strong>{{NbchosesAFaire()}}/{{nf.choses.length}}</strong> restantes</span>
            <ul class="filters">
                <li>
                    <a  [class.selected]="filtre === filtreTous" 
                        (click)="filtre = filtreTous" >Tous</a>
                </li>
                <li>
                    <a  [class.selected]="filtre === filtreNonFait"
                        (click)="filtre = filtreNonFait">Actifs</a>
                </li>
                <li>
                    <a  [class.selected]="filtre === filtreFait"
                        (click)="filtre = filtreFait"
                        >Complétés</a>
                </li>
            </ul>
            <button class="clear-completed"
                    (click)="disposeFait()"
                    >Supprimer cochées</button>
        </footer>
	</section>
	<hr/>
	<section *ngIf="nf">
	    <section *ngFor="let chose of getChoses()">
	        {{chose.fait}} : {{chose.texte}}
        </section>
	</section>
`;

type filterChose = (c : NF.Chose) => boolean;
@Component({
  selector		: "liste-choses",
  template		: htmlTemplate,
  directives	: [ItemChose]
})
export class ListeChoses {
    @Input() titre	: string;
    filtre          : filterChose;
    private nf      : NF.ListeChoses;
    filtreTous      : filterChose = (c) => true;
    filtreFait      : filterChose = (c) => c.fait;
    filtreNonFait   : filterChose = (c) => !c.fait;
	constructor		(private serviceListe: ListeChosesService) {
		console.log(this);
        this.filtre = this.filtreTous;
        serviceListe.getData().then( (nf) => {
            this.nf = nf;
        });
	};
	Ajouter			(texte: string   ) {this.nf.Ajouter(texte);}
	Retirer			(chose: NF.Chose ) {this.nf.Retirer(chose);}
    NbchosesAFaire() : number {
        return this.nf.choses.filter( c => !c.fait ).length;
    }
	toutEstFait() : boolean {
        for(let c of this.nf.choses) {
            if(c.fait === false) {return false;}
        }
        return true;
    }
    toutFaireOuDefaire() {
        let b = !this.toutEstFait();
        this.nf.choses.forEach( c => c.Fait(b) );
    }
    getChoses() : NF.Chose[] {
        return this.nf.choses.filter( this.filtre );
    }
    disposeFait() {
        this.nf.choses.filter( c => c.fait ).forEach( c => c.dispose() );
    }
};

