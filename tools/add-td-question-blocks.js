const fs = require("fs");
const path = require("path");

const questionBlocks = {
  "td1.html": {
    "td1-e1": [
      "Calculer le nombre de mains composees seulement de cartes noires.",
      "Calculer le nombre de mains composees seulement de figures.",
      "Calculer le nombre de mains contenant exactement les 4 as.",
      "Calculer le nombre de mains contenant 5 figures, dont exactement 3 noires.",
      "Calculer le nombre de mains contenant 3 as, 2 dames et exactement 1 carreau."
    ],
    "td1-e2": [
      "Combien de comites de 6 membres peut-on constituer ?",
      "Combien de comites paritaires, avec autant d'hommes que de femmes, peut-on constituer ?",
      "Combien de comites paritaires peut-on constituer si Madame A refuse de sieger avec Monsieur B ?",
      "Une fois le comite elu, combien de bureaux president/secretaire/tresorier peut-on former ?"
    ],
    "td1-e3": [
      "Pour un groupe de \(n\) personnes, exprimer la probabilite qu'au moins deux personnes aient le meme anniversaire.",
      "Preciser le cas \(n>365\)."
    ],
    "td1-e4": [
      "Compter les rangements si les livres de maths sont tous groupes et les livres de physique aussi.",
      "Compter les rangements si seule la contrainte 'les livres de maths sont groupes' est imposee."
    ],
    "td1-e5": [
      "Calculer la probabilite d'obtenir deux paires assorties.",
      "Calculer la probabilite d'obtenir au moins une paire assortie.",
      "Calculer la probabilite d'obtenir exactement une paire assortie."
    ],
    "td1-e6": [
      "Modeliser le tirage sans remise de \(r\) boules parmi \(n\).",
      "Calculer la probabilite d'obtenir exactement \(k\) boules noires."
    ],
    "td1-e7": [
      "Calculer la probabilite d'obtenir une seule paire.",
      "Calculer la probabilite d'obtenir deux paires.",
      "Calculer la probabilite d'obtenir un brelan.",
      "Calculer la probabilite d'obtenir un carre."
    ],
    "td1-e8": [
      "Compter tous les anagrammes du mot ANNIVERSAIRE.",
      "Compter les anagrammes qui commencent et finissent par une voyelle.",
      "Compter les anagrammes dans lesquels toutes les voyelles sont groupees."
    ],
    "td1-e9": [
      "Pour un tirage simultane de 5 boules, decrire l'univers et calculer la probabilite de tirer 2 blanches et 3 noires.",
      "Pour deux tirages successifs sans remise avec ordre, decrire l'univers et calculer la probabilite de tirer une blanche puis une noire.",
      "Reprendre la question precedente sans tenir compte de l'ordre.",
      "Pour deux tirages avec remise avec ordre, decrire l'univers et calculer la probabilite de tirer une blanche puis une noire.",
      "Reprendre le cas avec remise sans tenir compte de l'ordre."
    ],
    "td1-e10": [
      "Calculer la probabilite d'obtenir au moins un 6 en lancant 4 fois un de.",
      "Calculer la probabilite d'obtenir au moins un double 6 en lancant 24 fois deux des.",
      "Dire quel pari est le plus favorable."
    ],
    "td1-e11": [
      "Lister les issues possibles si le jeu continue apres l'interruption.",
      "Calculer les probabilites finales de victoire de chaque joueur.",
      "En deduire la repartition equitable de la mise."
    ],
    "td1-e12": [
      "Combien de choix de 4 voitures peut-on faire parmi 20 ?",
      "Calculer de deux manieres la probabilite d'avoir au moins une voiture en panne.",
      "Calculer la probabilite d'avoir exactement deux voitures en panne."
    ],
    "td1-e13": [
      "Representer un classement avec ex-aequo comme des groupes de meme rang.",
      "Compter tous les classements possibles pour quatre personnes."
    ],
    "td1-e14": [
      "Lister les decompositions non ordonnees donnant 9 et 10 avec trois des.",
      "Compter le nombre de triples ordonnes correspondant a chaque somme.",
      "Expliquer pourquoi 10 sort plus souvent que 9."
    ]
  },
  "td2.html": {
    "td2-e1": [
      "Calculer la probabilite qu'un mot choisi au hasard soit illisible.",
      "Sachant que le mot est illisible, calculer la probabilite qu'il ait ete ecrit par un professeur de mathematiques."
    ],
    "td2-e2": [
      "Demontrer la formule du produit pour \(P(A_1\cap\cdots\cap A_n)\).",
      "Appliquer cette formule a l'urne contenant \(n\) boules noires et \(n\) boules blanches tirees deux par deux.",
      "Calculer la probabilite d'obtenir deux boules de couleurs differentes a chaque tirage."
    ],
    "td2-e3": [
      "Calculer la probabilite de tirer une voyelle si l'auteur est anglais.",
      "Calculer la probabilite de tirer une voyelle si l'auteur est americain.",
      "Sachant que la lettre tiree est une voyelle, calculer la probabilite que l'auteur soit anglais."
    ],
    "td2-e4": [
      "Pour une famille de trois enfants, calculer \(P(A)\), \(P(B)\), \(P(A\cap B)\) et conclure sur l'independance.",
      "Refaire le meme test pour une famille de deux enfants."
    ],
    "td2-e5": [
      "Identifier la variable aleatoire qui compte le nombre de penaltys reussis.",
      "Donner sa loi.",
      "Calculer la probabilite de reussir exactement \(k\) penaltys."
    ],
    "td2-e6": [
      "Pour un tirage de \(n\) cartes, calculer la probabilite de detecter que le jeu est truque.",
      "Dans le cas \(n=4\), calculer la probabilite de detection lors d'une experience.",
      "Determiner le nombre minimal d'experiences pour que la detection ait une probabilite au moins 0,95."
    ],
    "td2-e7": [
      "Traduire l'information '4 non-vaccines pour 1 vaccine parmi les malades' en probabilites d'intersection.",
      "Calculer la probabilite qu'un non-vaccine tombe malade."
    ],
    "td2-e8": [
      "Sans depistage, calculer la probabilite de mourir de la maladie.",
      "Avec depistage generalise, separer les cas : malade positif, malade negatif, sain positif, sain negatif.",
      "Additionner les contributions qui menent a un deces."
    ],
    "td2-e9": [
      "Decrire l'univers du tirage de 4 personnes parmi 9.",
      "Calculer la probabilite que les 4 femmes soient choisies."
    ],
    "td2-e10": [
      "Definir les evenements : alliance dans chaque secteur et fouille infructueuse.",
      "Calculer la probabilite de ne rien trouver.",
      "Calculer les probabilites a posteriori pour les trois secteurs."
    ],
    "td2-e11": [
      "Exprimer \(p_{n+1}\) et \(q_{n+1}\) en fonction de \(p_n,q_n,r_n\).",
      "Utiliser \(p_n+q_n+r_n=1\) pour eliminer \(r_n\).",
      "Montrer que \(p_n\) et \(q_n\) sont arithmetico-geometriques.",
      "Resoudre les suites et interpreter leur limite."
    ]
  },
  "td3.html": {
    "td3-e1": [
      "Determiner la loi du nombre d'apparitions du numero choisi.",
      "En deduire la loi du gain \(X\).",
      "Calculer le gain moyen \(E(X)\)."
    ],
    "td3-e2": [
      "Ecrire \(Z\) comme combinaison lineaire des 4 bits.",
      "Calculer \(E(Z)\) et \(V(Z)\).",
      "Calculer la probabilite que \(Z\) soit pair.",
      "Calculer \(P(Z>3)\)."
    ],
    "td3-e3": [
      "Calculer la probabilite qu'un appareil soit defectueux.",
      "Pour 10 appareils, donner la loi du nombre d'appareils defectueux.",
      "Calculer la probabilite d'avoir au moins 7 bons appareils.",
      "Pour 100 appareils, calculer le nombre moyen d'appareils defectueux."
    ],
    "td3-e4": [
      "Identifier la loi du nombre d'erreurs dans le message.",
      "Calculer la probabilite d'une unique erreur.",
      "Calculer la probabilite d'exactement quatre erreurs.",
      "Calculer la probabilite d'au moins une erreur.",
      "Calculer le nombre moyen d'erreurs."
    ],
    "td3-e5": [
      "Modeliser le nombre de centenaires dans un groupe de \(n\) personnes.",
      "Calculer la probabilite d'au moins un centenaire parmi 100 personnes.",
      "Calculer la probabilite d'au moins un centenaire parmi 200 personnes."
    ],
    "td3-e6": [
      "Donner la relation entre \(N\), \(X\) et \(Y\).",
      "Calculer \(P(X=k\mid N=n)\), puis la loi de \(X\).",
      "Determiner la loi de \(Y\).",
      "Montrer que \(X\) et \(Y\) sont independantes.",
      "Appliquer avec \(\lambda=2\) et \(p=0,4\)."
    ],
    "td3-e7": [
      "Determiner la loi de \(X\), le nombre de parties jouees.",
      "Calculer \(E(X)\).",
      "Determiner la loi du gain \(Y\)."
    ],
    "td3-e8": [
      "Determiner la loi de la longueur du code \(C_1\).",
      "Calculer la longueur moyenne et l'ecart-type pour \(C_1\).",
      "Reprendre les calculs pour le code \(C_2\).",
      "Choisir le code le plus efficace.",
      "Calculer l'entropie \(H(X)\).",
      "Comparer les codes a la borne d'entropie."
    ],
    "td3-e9": [
      "Calculer le paiement si le premier face apparait au 16e lancer.",
      "Determiner la loi du gain \(X\).",
      "Discuter une mise initiale de 150 euros.",
      "Discuter une mise initiale de 5 euros.",
      "Calculer \(E(X)\).",
      "Expliquer ce que montre le paradoxe."
    ],
    "td3-e10": [
      "Determiner la loi du nombre \(X\) de passagers absents.",
      "Calculer \(P(X=0)\) et \(P(X=1)\).",
      "Comparer avec une variable de Poisson de parametre 3.",
      "Calculer \(P(X'=0)\) et \(P(X'=1)\).",
      "Calculer la probabilite qu'il y ait plus de passagers que de places."
    ]
  }
};

function blockHtml(id, questions) {
  return `          <div class="question-block" data-question-block-for="${id}">\n            <h4>Questions</h4>\n            <ol>\n${questions.map((question) => `              <li>${question}</li>`).join("\n")}\n            </ol>\n          </div>\n`;
}

for (const [file, pageQuestions] of Object.entries(questionBlocks)) {
  const filePath = path.join(process.cwd(), file);
  let html = fs.readFileSync(filePath, "utf8");

  for (const [id, questions] of Object.entries(pageQuestions)) {
    if (!html.includes(`data-toggle="${id}"`)) throw new Error(`${id} introuvable dans ${file}`);

    if (!html.includes(`data-question-block-for="${id}"`)) {
      const insertAt = html.indexOf('          <div class="td-actions">', html.lastIndexOf("<article", html.indexOf(`data-toggle="${id}"`)));
      html = `${html.slice(0, insertAt)}${blockHtml(id, questions)}${html.slice(insertAt)}`;
    }

    html = html.replace(
      new RegExp(`<div id="${id}" class="hidden-panel(?! answer-block)">`),
      `<div id="${id}" class="hidden-panel answer-block">`
    );

    const panelOpen = `<div id="${id}" class="hidden-panel answer-block">\n`;
    if (!html.includes(`data-answer-title-for="${id}"`)) {
      html = html.replace(panelOpen, `${panelOpen}            <h4 data-answer-title-for="${id}">Reponse detaillee</h4>\n`);
    }
  }

  fs.writeFileSync(filePath, html, "utf8");
  console.log(`${file} complete avec blocs Questions/Reponse.`);
}
