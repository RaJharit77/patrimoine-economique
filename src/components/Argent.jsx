import Possession from './Possession';

const TYPE_ARGENT = {
    Courant: "Courant",
    Epargne: "Epargne",
    Espece: "Espece"
};

class Argent extends Possession {
    constructor(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement, type) {
        super(possesseur, libelle, valeur, dateDebut, dateFin, tauxAmortissement);
        try {
            this.type = type;
        }
        catch (e) {
            console.error(e);
        }
    }
}

export default Argent;
