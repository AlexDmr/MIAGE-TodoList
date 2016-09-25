import * as NF from "./nf";

describe("Initlialisation, ajout et retrait de choses", function () {
  /*beforeEach(() => {

  });*/
  it("2 devrait instancier une Liste de choses vide", () => {
    let liste = new NF.ListeChoses();
    expect(liste.choses.length === 0).toBe(true, "Une liste nouvellement créée ne devrait pas contenir de choses");
  });
  it("2 devrait instancier une Liste de choses", () => {
    let liste = new NF.ListeChoses();
    liste.Ajouter( "1" ).Ajouter( "2" ).Ajouter( "3" );
    expect(liste.choses.length === 3).toBe(true, "Devrait avoir 3 choses après trois appels à Ajouter");
  });

});
