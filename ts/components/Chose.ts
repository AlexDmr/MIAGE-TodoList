import { Component, Input, Output, EventEmitter, ViewChild, Renderer } from "@angular/core";
import * as NF from "./nf/nf";

const htmlTemplate = `
	<div class="view">
		<input 	class			= "toggle" 
				type			= "checkbox" 
				[ngModel]		= "nf.fait" 
				(ngModelChange)	= "setFait($event)"/>
		<label 	class="texte"
				(dblclick)="edit();"
				>{{nf.texte}}</label>
		<button class="destroy" (click)="dispose()"></button>
	</div>
	<form (ngSubmit)="setText(newText.value)">
		<input 	class		= "edit"
				(blur)		= "editing = false;"
				#newText
				/>
	</form>
`;

@Component({
  selector		: "item-chose",
  template		: htmlTemplate
})
export class ItemChose {
	@Input() 	nf		: NF.Chose;
	@Output()	onedit	: EventEmitter<boolean> = new EventEmitter<boolean>();
	@ViewChild("newText") newTextInput;
	editing			: boolean = false;
	constructor(private _renderer:Renderer) {}
	dispose	() {
		this.nf.dispose();
	}
	edit() {
		this.editing 	= true;
		this._renderer.setElementProperty	(this.newTextInput.nativeElement, "value", this.nf.texte);
		setTimeout( () => {
			this._renderer.invokeElementMethod	(this.newTextInput.nativeElement, "focus");
		}, 50 );
		this.onedit.emit(true);
	}
	setText( texte: string ) {
		this.editing 	= false;
		this.nf.Texte( texte );
		this.onedit.emit(false);
	}
	setFait( fait: boolean ) {
		this.nf.Fait( fait );
	}
};

