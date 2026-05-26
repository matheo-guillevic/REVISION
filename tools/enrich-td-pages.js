const fs = require("fs");
const path = require("path");

const tdDir = path.join(process.cwd(), "src", "subjects", "probabilites", "td");

const pages = {
  "td1.html": [
    ["td1-e1", ["combinaison", "cartes", "cas contraints"], "Comme le tirage est simultane, on compte des ensembles de cartes : la combinaison est l'outil naturel. Quand plusieurs contraintes se croisent, on separe les cas pour eviter les doubles comptes."],
    ["td1-e2", ["combinaison", "parite", "arrangement"], "La constitution du comite ne tient pas compte de l'ordre, mais les postes du bureau sont des roles distincts : on passe donc des combinaisons aux arrangements."],
    ["td1-e3", ["probabilite contraire", "anniversaires", "p-listes"], "L'evenement demande est complique a compter directement. Son contraire, tous les anniversaires distincts, se compte comme une liste sans repetition."],
    ["td1-e4", ["permutation", "blocs", "factorielle"], "Quand des objets doivent rester groupes, on les remplace temporairement par un bloc, puis on multiplie par les arrangements internes du bloc."],
    ["td1-e5", ["combinaison", "contraire", "paires"], "Les gants sont tous distincts, mais la notion de paire impose de compter d'abord les paires choisies, puis les choix gauche/droite."],
    ["td1-e6", ["hypergeometrique", "tirage sans remise", "combinaison"], "Un tirage sans remise avec deux couleurs conduit a une loi hypergeometrique : on choisit les succes et les echecs separement, puis on divise par le total."],
    ["td1-e7", ["poker", "combinaison", "cas exclusifs"], "Pour les mains de poker, on choisit d'abord les hauteurs, puis les couleurs. Il faut exclure les configurations plus fortes quand l'enonce dit 'une seule paire' ou 'brelan'."],
    ["td1-e8", ["anagrammes", "permutations avec repetitions", "blocs"], "Les lettres repetees imposent de diviser par les factorielles des multiplicites. Pour regrouper les voyelles, on cree un bloc de voyelles."],
    ["td1-e9", ["urne", "ordre", "remise"], "Le modele change selon que l'ordre est conserve et selon qu'il y a remise. Avant de calculer, on decrit toujours l'univers choisi."],
    ["td1-e10", ["probabilite contraire", "independance", "des"], "Pour 'au moins un', le contraire 'aucun' donne une formule directe grace a l'independance des lancers."],
    ["td1-e11", ["probabilites conditionnelles", "jeu interrompu", "esperance de gain"], "Une repartition equitable correspond aux probabilites de victoire finales, pas au score actuel seul."],
    ["td1-e12", ["combinaison", "contraire", "hypergeometrique"], "Pour 'au moins une panne', le contraire 'aucune panne' est plus court. Pour 'exactement deux', on choisit les pannes et les voitures valides."],
    ["td1-e13", ["partitions", "classements", "ex-aequo"], "Les ex-aequo creent des groupes de meme rang. On partitionne les coureurs, puis on ordonne les groupes."],
    ["td1-e14", ["des", "issues ordonnees", "equiprobabilite"], "Les decompositions non ordonnees ne sont pas equiprobables. Les issues elementaires sont les triples ordonnes de resultats de des."]
  ],
  "td2.html": [
    ["td2-e1", ["probabilites totales", "Bayes", "conditionnement"], "On connait les probabilites conditionnelles dans chaque categorie. La probabilite totale donne la frequence globale, puis Bayes inverse l'information observee."],
    ["td2-e2", ["formule du produit", "conditionnement", "urne"], "La formule du produit vient de la definition de la probabilite conditionnelle appliquee plusieurs fois."],
    ["td2-e3", ["Bayes", "probabilites totales", "voyelles"], "La lettre observee est une information partielle. On compare la vraisemblance de cette observation selon chaque origine possible."],
    ["td2-e4", ["independance", "equiprobabilite", "familles"], "Tester l'independance demande de comparer \(P(A\\cap B)\) avec \(P(A)P(B)\), pas seulement de juger intuitivement les evenements."],
    ["td2-e5", ["loi binomiale", "independance", "succes"], "On compte un nombre de reussites dans des essais identiques et independants : c'est exactement le schema binomial."],
    ["td2-e6", ["combinaison", "probabilite contraire", "repetition"], "Detecter la fraude revient a tirer les deux cartes dupliquees ensemble. Pour plusieurs experiences, on utilise le contraire : ne jamais detecter."],
    ["td2-e7", ["Bayes", "rapport", "conditionnement"], "Le rapport donne une information sur les malades deja observes. On le transforme en probabilites d'intersection avant de reconditionner."],
    ["td2-e8", ["arbre de probabilites", "depistage", "probabilites totales"], "La situation contient des faux positifs et faux negatifs. Un arbre permet de ne pas oublier les morts dues au traitement a tort."],
    ["td2-e9", ["combinaison", "equiprobabilite"], "Le tirage est simultane et sans ordre : le total est un nombre de groupes de 4 personnes."],
    ["td2-e10", ["Bayes", "a posteriori", "fouille imparfaite"], "Ne rien trouver n'elimine pas le secteur fouille : cela diminue seulement sa probabilite selon la fiabilite de la fouille."],
    ["td2-e11", ["chaine de Markov", "recurrence", "limite"], "Les probabilites du lendemain se calculent par decomposition selon l'etat du jour. On obtient ensuite des suites arithmetico-geometriques."]
  ],
  "td3.html": [
    ["td3-e1", ["loi binomiale", "esperance", "jeu"], "On commence par la variable intermediaire : le nombre de des qui affichent le numero choisi. Le gain est ensuite une fonction de cette variable."],
    ["td3-e2", ["Bernoulli", "esperance", "variance"], "Un entier code en binaire est une combinaison lineaire de bits de Bernoulli. La linearite de l'esperance et l'independance simplifient tout."],
    ["td3-e3", ["loi binomiale", "complementaire", "esperance"], "Un appareil est bon seulement si tous ses composants fonctionnent. Ensuite, le nombre d'appareils defectueux suit une loi binomiale."],
    ["td3-e4", ["loi binomiale", "erreurs", "esperance"], "Chaque bit est un essai de Bernoulli rare. Le nombre total d'erreurs est donc binomial."],
    ["td3-e5", ["loi binomiale", "probabilite contraire"], "Pour 'au moins un', on evite la somme de nombreux cas en retirant la probabilite de n'avoir aucun centenaire."],
    ["td3-e6", ["Poisson", "conditionnement", "independance"], "On conditionne par le nombre total d'enfants : sachant \(N=n\), le nombre avec le gene est binomial. La somme sur \(n\) donne une loi de Poisson amincie."],
    ["td3-e7", ["loi discrete", "serie", "esperance"], "La probabilite de continuer change a chaque tirage car l'urne evolue. On ecrit donc le produit des probabilites conditionnelles successives."],
    ["td3-e8", ["esperance", "variance", "entropie"], "La longueur du code est une variable aleatoire. On compare les codes avec la longueur moyenne et l'ecart-type, puis avec la borne d'entropie."],
    ["td3-e9", ["esperance infinie", "serie", "paradoxe"], "La loi donne des gains tres grands avec de tres petites probabilites. Leur produit reste constant, ce qui fait diverger l'esperance."],
    ["td3-e10", ["loi binomiale", "approximation de Poisson", "surbooking"], "On compte des absences rares parmi beaucoup de passagers. La binomiale est exacte, la Poisson de parametre \(np\) est une approximation naturelle."]
  ]
};

function tagHtml(tags) {
  return `          <div class="topic-tags">\n${tags
    .map((tag) => `            <span class="topic-tag">${tag}</span>`)
    .join("\n")}\n          </div>\n`;
}

for (const [file, items] of Object.entries(pages)) {
  const filePath = path.join(tdDir, file);
  let html = fs.readFileSync(filePath, "utf8");

  for (const [id, tags, note] of items) {
    if (!html.includes(`id="${id}"`)) {
      throw new Error(`${id} introuvable dans ${file}`);
    }

    const panelMarker = `          <div id="${id}" class="hidden-panel">\n`;
    if (!html.includes(`data-tags-for="${id}"`)) {
      const articleStart = html.lastIndexOf("<article", html.indexOf(`data-toggle="${id}"`));
      const statementStart = html.indexOf('          <p class="statement">', articleStart);
      html = `${html.slice(0, statementStart)}${tagHtml(tags).replace("<div", `<div data-tags-for="${id}"`)}${html.slice(statementStart)}`;
    }

    if (!html.includes(`data-reasoning-for="${id}"`)) {
      html = html.replace(
        panelMarker,
        `${panelMarker}            <div class="reasoning-note" data-reasoning-for="${id}"><strong>Raisonnement</strong><p>${note}</p></div>\n`
      );
    }
  }

  fs.writeFileSync(filePath, html, "utf8");
  console.log(`${file} enrichi (${items.length} exercices).`);
}
