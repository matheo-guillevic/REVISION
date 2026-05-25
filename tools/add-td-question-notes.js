const fs = require("fs");
const path = require("path");

const notes = {
  "td1.html": {
    "td1-e1": [
      "Q1-Q2 : on tire une main sans ordre, donc chaque contrainte se traduit par un choix de cartes dans un sous-ensemble.",
      "Q3 : imposer les 4 as signifie que la seule liberte restante est la cinquieme carte, qui ne doit pas etre un as.",
      "Q4 : la contrainte 'dont 3 noires' separe naturellement les figures noires et les figures rouges.",
      "Q5 : quand plusieurs contraintes portent sur les memes cartes, on raisonne par cas pour ne pas compter deux fois la meme main."
    ],
    "td1-e2": [
      "Q1 : un comite est un groupe, donc l'ordre des personnes ne compte pas.",
      "Q2 : la parite impose exactement 3 hommes et 3 femmes, ce qui cree deux choix independants.",
      "Q3 : on retire les comites interdits contenant simultanement Madame A et Monsieur B.",
      "Q4 : un bureau attribue des roles distincts, donc l'ordre des personnes choisies compte."
    ],
    "td1-e3": [
      "Question unique : l'evenement 'au moins deux anniversaires identiques' est difficile a compter directement.",
      "On utilise donc le contraire : tous les anniversaires sont differents.",
      "Le denominateur autorise toutes les dates pour chaque personne, tandis que le numerateur interdit les repetitions."
    ],
    "td1-e4": [
      "Q1 : si les deux matieres sont groupees, on cree deux blocs, puis on range les livres a l'interieur de chaque bloc.",
      "Q2 : si seuls les livres de maths sont groupes, le bloc maths devient un seul objet parmi les livres de physique."
    ],
    "td1-e5": [
      "Q1 : deux paires assorties signifie choisir directement 2 paires completes.",
      "Q2 : pour 'au moins une paire', le contraire 'aucune paire' est plus simple.",
      "Q3 : exactement une paire impose une paire complete et deux gants provenant de deux autres paires differentes."
    ],
    "td1-e6": [
      "Question unique : le tirage est sans remise et simultane, donc la loi est hypergeometrique.",
      "On choisit separement les boules noires voulues et les boules blanches restantes.",
      "La division par le nombre total de tirages transforme le comptage en probabilite."
    ],
    "td1-e7": [
      "Q1 : une seule paire impose une hauteur double et trois hauteurs toutes distinctes.",
      "Q2 : deux paires impose deux hauteurs doubles et une cinquieme carte d'une autre hauteur.",
      "Q3 : un brelan impose trois cartes d'une hauteur et deux cartes de hauteurs differentes.",
      "Q4 : un carre impose les quatre couleurs d'une hauteur, puis une carte libre hors de cette hauteur."
    ],
    "td1-e8": [
      "Q1 : les anagrammes avec lettres repetees se comptent par permutation avec division par les multiplicites.",
      "Q2 : commencer et finir par une voyelle oblige a traiter les types de voyelles places aux extremites.",
      "Q3 : grouper les voyelles revient a remplacer toutes les voyelles par un bloc, puis a ranger l'interieur du bloc."
    ],
    "td1-e9": [
      "Q1 : un tirage simultane se modelise par des combinaisons.",
      "Q2 : un tirage successif sans remise avec ordre se modelise par des couples ordonnes sans repetition.",
      "Q3 : sans ordre, on revient a des paires non ordonnees.",
      "Q4 : avec remise, les tirages deviennent independants, mais l'univers non ordonne n'est pas equiprobable."
    ],
    "td1-e10": [
      "Question unique : les deux paris sont des evenements 'au moins une fois'.",
      "La bonne strategie est de calculer la probabilite de ne jamais obtenir le resultat cherche, puis de prendre le complement."
    ],
    "td1-e11": [
      "Question unique : on ne partage pas selon le score brut, mais selon les chances de victoire si le jeu continuait.",
      "Comme le premier joueur n'a besoin que d'une victoire, il faut seulement analyser les prochaines parties possibles."
    ],
    "td1-e12": [
      "Q1 : choisir 4 voitures parmi 20 est une combinaison.",
      "Q2 : 'au moins une en panne' se traite efficacement par le contraire 'aucune en panne'.",
      "Q3 : 'exactement deux' impose de choisir 2 voitures en panne et 2 voitures valides."
    ],
    "td1-e13": [
      "Question unique : les ex-aequo creent des groupes de concurrents ayant le meme rang.",
      "Il faut donc partitionner les coureurs en groupes, puis ordonner ces groupes du premier au dernier rang."
    ],
    "td1-e14": [
      "Question unique : le piege vient du fait que les decompositions non ordonnees ne sont pas equiprobables.",
      "Avec trois des, les issues equiprobables sont les triplets ordonnes, donc certaines decompositions comptent plus que d'autres."
    ]
  },
  "td2.html": {
    "td2-e1": [
      "Q1 : on cherche une probabilite globale issue de plusieurs categories, donc on applique les probabilites totales.",
      "Q2 : on connait l'effet observe, le mot illisible, et on remonte a la cause probable : c'est une formule de Bayes."
    ],
    "td2-e2": [
      "Q1 : la formule du produit est une application iterative de la definition de \(P(B\\mid A)\).",
      "Q2 : chaque tirage modifie l'urne ; il faut donc multiplier des probabilites conditionnelles successives."
    ],
    "td2-e3": [
      "Question unique : la voyelle observee est plus ou moins probable selon le mot ecrit.",
      "On utilise Bayes pour transformer cette vraisemblance en probabilite sur l'origine de l'auteur."
    ],
    "td2-e4": [
      "Q1 : pour trois enfants, on liste les issues equiprobables et on compare \(P(A\\cap B)\) a \(P(A)P(B)\).",
      "Q2 : pour deux enfants, le meme test donne une valeur differente, donc l'independance disparait."
    ],
    "td2-e5": [
      "Question unique : chaque penalty est un essai de Bernoulli de meme probabilite \(p\).",
      "Le nombre de penaltys reussis suit donc une loi binomiale."
    ],
    "td2-e6": [
      "Q1 : voir la fraude signifie tirer les deux cartes identiques dans le meme echantillon.",
      "Q2 : les experiences sont repetees avec remise globale, donc elles sont independantes ; on utilise le complement de 'jamais detecte'."
    ],
    "td2-e7": [
      "Question unique : le rapport parmi les malades donne une information conditionnelle sur les intersections.",
      "On calcule d'abord les probabilites conjointes, puis on divise par la probabilite d'etre non vaccine."
    ],
    "td2-e8": [
      "Q1 : sans test, seul le cas 'malade puis deces' intervient.",
      "Q2 : avec depistage, il faut separer vrais positifs, faux negatifs et faux positifs, car chacun a une probabilite de deces differente."
    ],
    "td2-e9": [
      "Question unique : on tire un groupe de 4 personnes sans ordre.",
      "L'evenement favorable est unique : les quatre femmes sont toutes choisies."
    ],
    "td2-e10": [
      "Question unique : ne rien trouver est une information, mais pas une preuve que le secteur fouille est vide.",
      "Bayes met a jour les probabilites des secteurs en tenant compte du risque d'echec de la fouille."
    ],
    "td2-e11": [
      "Q1 : on decompose l'etat du lendemain selon l'etat du jour.",
      "Q2 : comme les trois etats couvrent tout, leurs probabilites somment a 1.",
      "Q3 : les relations obtenues sont des recurrences arithmetico-geometriques que l'on resout par leur point fixe."
    ]
  },
  "td3.html": {
    "td3-e1": [
      "Q1 : la loi du gain se deduit de la loi du nombre d'apparitions du numero choisi.",
      "Q2 : l'esperance du gain est la moyenne ponderee des gains possibles."
    ],
    "td3-e2": [
      "Q1 : \(Z\) est une somme ponderee de bits de Bernoulli, donc on utilise linearite et independance.",
      "Q2 : la parite depend uniquement du bit de poids faible.",
      "Q3 : l'evenement \(Z>3\) depend des deux bits de poids fort."
    ],
    "td3-e3": [
      "Q1 : l'appareil est defectueux si au moins un composant ne fonctionne pas ; on passe par le contraire.",
      "Q2 : sur 10 appareils, on compte le nombre d'appareils defectueux, donc une loi binomiale apparait.",
      "Q3 : le nombre moyen se calcule par \(E(X)=np\)."
    ],
    "td3-e4": [
      "Q1 : chaque bit peut etre faux ou correct, donc le nombre d'erreurs est binomial.",
      "Q2-Q4 : les probabilites exactes s'obtiennent avec la formule binomiale, et 'au moins une erreur' se traite par le complement.",
      "Q5 : l'esperance d'une binomiale vaut \(np\)."
    ],
    "td3-e5": [
      "Question unique : on compte le nombre de centenaires dans un echantillon.",
      "La probabilite 'au moins un' est plus simple avec le complement 'aucun centenaire'."
    ],
    "td3-e6": [
      "Q1 : chaque enfant a ou n'a pas le gene, donc \(N=X+Y\).",
      "Q2 : conditionnellement a \(N=n\), \(X\) est binomiale.",
      "Q3 : le meme raisonnement donne la loi de \(Y\).",
      "Q4 : la factorisation de la loi jointe prouve l'independance.",
      "Q5 : on applique directement les deux lois de Poisson independantes."
    ],
    "td3-e7": [
      "Q1 : la composition de l'urne change apres chaque blanche, donc la loi de \(X\) vient d'un produit conditionnel.",
      "Q2 : l'esperance se calcule avec une serie, apres simplification du terme general.",
      "Q3 : le gain depend a la fois du nombre de parties et du nombre de bonnes reponses."
    ],
    "td3-e8": [
      "Q1 : avec le code fixe, la longueur est constante.",
      "Q2 : moyenne et ecart-type mesurent le cout moyen et la variabilite du codage.",
      "Q3-Q4 : le code variable attribue des mots courts aux valeurs probables, ce qui reduit la longueur moyenne.",
      "Q5-Q6 : l'entropie donne la limite theorique minimale de longueur moyenne."
    ],
    "td3-e9": [
      "Q1 : le paiement double a chaque lancer supplementaire.",
      "Q2 : le premier face au rang \(n\) a probabilite \(2^{-n}\).",
      "Q3-Q5 : l'esperance diverge car chaque rang contribue 1 a la somme.",
      "Q6 : le paradoxe montre la limite d'une decision fondee seulement sur l'esperance."
    ],
    "td3-e10": [
      "Q1 : chaque reservation donne absence ou presence, donc la loi exacte est binomiale.",
      "Q2-Q4 : les probabilites ponctuelles se calculent avec la formule binomiale, puis se comparent a l'approximation de Poisson.",
      "Q5 : il y a surbooking effectif si le nombre d'absents est trop faible pour liberer 5 places."
    ]
  }
};

function notesHtml(id, items) {
  return `            <div class="question-notes" data-question-notes-for="${id}">\n              <strong>Explications par question</strong>\n              <ul>\n${items.map((item) => `                <li>${item}</li>`).join("\n")}\n              </ul>\n            </div>\n`;
}

for (const [file, pageNotes] of Object.entries(notes)) {
  const filePath = path.join(process.cwd(), file);
  let html = fs.readFileSync(filePath, "utf8");

  for (const [id, items] of Object.entries(pageNotes)) {
    if (!html.includes(`id="${id}"`)) throw new Error(`${id} introuvable dans ${file}`);
    if (html.includes(`data-question-notes-for="${id}"`)) continue;

    const reasoningEnd = html.indexOf("</div>", html.indexOf(`data-reasoning-for="${id}"`));
    if (reasoningEnd === -1) throw new Error(`reasoning-note introuvable pour ${id}`);
    const insertAt = reasoningEnd + "</div>".length + 1;
    html = `${html.slice(0, insertAt)}${notesHtml(id, items)}${html.slice(insertAt)}`;
  }

  fs.writeFileSync(filePath, html, "utf8");
  console.log(`${file} complete avec explications par question.`);
}
