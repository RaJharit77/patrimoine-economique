class Patrimoine {
  constructor(possesseur, date, possessions) {
    this.possesseur  = possesseur;
    this.date = date
    this.possessions = possessions; // [Possession, Possession, ...]
  }
  getValeur(date) {
    return 
  }
  addPossession(possession) {
    this.possessions.push(possession);
  }

  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.libelle !== possession.libelle);
  }

  getValeur(date) {
      const targetDate = new Date(date);
      let totalValeur = 0;

      for (const possession of this.possessions) {
          totalValeur += possession.getValeurActuelle(targetDate);
      }

      return totalValeur;
  }
}

module.exports = Patrimoine;