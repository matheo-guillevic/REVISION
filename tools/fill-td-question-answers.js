const fs = require("fs");
const path = require("path");

const data = {
  "td1-e1": [
    ["Tirage simultane : on choisit 5 cartes parmi les 16 cartes noires.", "\\(\\binom{16}{5}\\)."],
    ["Les figures du TD sont valet, dame, roi et as : 4 valeurs dans 4 couleurs, donc 16 cartes.", "\\(\\binom{16}{5}\\)."],
    ["Les 4 as sont imposes ; la cinquieme carte doit etre choisie parmi les 28 non-as.", "\\(\\binom44\\binom{28}{1}=28\\)."],
    ["On separe les figures noires et rouges pour respecter exactement 3 noires.", "\\(\\binom83\\binom82\\)."],
    ["Les contraintes as/dames/carreau se recoupent ; on compte les cas ou l'unique carreau est l'as de carreau ou la dame de carreau.", "\\(\\binom31\\binom31+\\binom31\\binom31=18\\)."]
  ],
  "td1-e2": [
    ["Un comite est un groupe sans ordre.", "\\(\\binom{27}{6}\\)."],
    ["Parite : choisir 3 hommes parmi 12 et 3 femmes parmi 15.", "\\(\\binom{12}{3}\\binom{15}{3}\\)."],
    ["On retire les comites paritaires contenant simultanement Madame A et Monsieur B.", "\\(\\binom{12}{3}\\binom{15}{3}-\\binom{11}{2}\\binom{14}{2}\\)."],
    ["Les postes sont distincts : l'ordre des trois personnes choisies compte.", "\\(A_6^3=6\\times5\\times4=120\\)."]
  ],
  "td1-e3": [
    ["On passe par le contraire : tous les anniversaires sont distincts.", "Si \(n\\le365\), \(P=1-\\frac{A_{365}^n}{365^n}\\)."],
    ["Avec plus de personnes que de jours, le principe des tiroirs impose une coincidence.", "Si \(n>365\), la probabilite vaut 1."]
  ],
  "td1-e4": [
    ["On cree deux blocs, Maths et Physique, puis on range l'interieur des blocs.", "\\(2!\\,12!\\,10!\\)."],
    ["Le bloc Maths compte comme un objet avec les 10 livres de physique.", "\\(11!\\,12!\\)."]
  ],
  "td1-e5": [
    ["Deux paires assorties : choisir directement les 2 paires completes.", "\\(\\frac{\\binom{10}{2}}{\\binom{20}{4}}\\)."],
    ["Au moins une paire : on retire le cas ou les 4 gants viennent de 4 paires differentes.", "\\(1-\\frac{\\binom{10}{4}2^4}{\\binom{20}{4}}\\)."],
    ["Exactement une paire : choisir la paire complete, puis deux paires differentes dont on prend un seul gant.", "\\(\\frac{10\\binom92 2^2}{\\binom{20}{4}}\\)."]
  ],
  "td1-e6": [
    ["Sans remise et sans ordre : le total est un choix de \(r\) boules parmi \(n\).", "Total : \\(\\binom nr\\)."],
    ["On choisit les \(k\) noires puis les \(r-k\) blanches.", "\\(\\frac{\\binom mk\\binom{n-m}{r-k}}{\\binom nr}\\)."]
  ],
  "td1-e7": [
    ["Une seule paire : une hauteur double, puis trois hauteurs simples distinctes.", "\\(\\frac{8\\binom42\\binom73 4^3}{\\binom{32}{5}}\\)."],
    ["Deux paires : deux hauteurs doubles et une carte d'une autre hauteur.", "\\(\\frac{\\binom82\\binom42^2\\cdot 6\\cdot4}{\\binom{32}{5}}\\)."],
    ["Brelan : une hauteur triple et deux cartes simples de hauteurs differentes.", "\\(\\frac{8\\binom43\\binom72 4^2}{\\binom{32}{5}}\\)."],
    ["Carre : les 4 couleurs d'une hauteur, puis une cinquieme carte hors de cette hauteur.", "\\(\\frac{8\\cdot28}{\\binom{32}{5}}\\)."]
  ],
  "td1-e8": [
    ["On permute 12 lettres avec repetitions : \(A,N,I,E,R\) apparaissent deux fois.", "\\(\\frac{12!}{(2!)^5}\\)."],
    ["On traite les voyelles placees aux extremites par cas, selon qu'elles sont de meme type ou non.", "\\(9\\frac{10!}{(2!)^4}\\)."],
    ["On remplace toutes les voyelles par un bloc, puis on arrange le bloc et les consonnes.", "\\(\\frac{7!}{2!2!}\\frac{6!}{2!2!2!}\\)."]
  ],
  "td1-e9": [
    ["Tirage simultane : l'univers est l'ensemble des parties de 5 boules parmi 16.", "\\(P=\\frac{\\binom62\\binom{10}{3}}{\\binom{16}{5}}\\)."],
    ["Successif sans remise avec ordre : les issues sont les couples ordonnes de boules distinctes.", "\\(P=\\frac6{16}\\frac{10}{15}\\)."],
    ["Sans ordre : l'univers est l'ensemble des paires non ordonnees.", "\\(P=\\frac{\\binom61\\binom{10}{1}}{\\binom{16}{2}}\\)."],
    ["Avec remise et ordre : les deux tirages sont independants.", "\\(P=\\frac6{16}\\frac{10}{16}\\)."],
    ["Avec remise sans ordre : on revient aux issues ordonnees car les paires non ordonnees ne sont pas equiprobables.", "\\(P=2\\frac6{16}\\frac{10}{16}\\)."]
  ],
  "td1-e10": [
    ["On utilise le contraire : aucun 6 en 4 lancers.", "\\(1-(5/6)^4\\approx0,5177\\)."],
    ["Un double 6 a probabilite \(1/36\), donc son contraire a probabilite \(35/36\).", "\\(1-(35/36)^{24}\\approx0,4914\\)."],
    ["On compare les deux probabilites obtenues.", "Le premier pari est plus favorable."]
  ],
  "td1-e11": [
    ["Le premier joueur A mene 2 a 1 : A doit gagner une partie, B doit en gagner deux.", "Issues utiles : A ; puis BA ; puis BB."],
    ["Les parties sont supposees equitables.", "\\(P(A\\text{ gagne})=1/2+1/4=3/4\\), \\(P(B\\text{ gagne})=1/4\\)."],
    ["La mise se partage selon les probabilites finales de victoire.", "Rapport \\(3:1\\), donc 75% pour A et 25% pour B."]
  ],
  "td1-e12": [
    ["On choisit un groupe de 4 voitures sans ordre.", "\\(\\binom{20}{4}\\)."],
    ["Methode 1 : contraire aucune panne. Methode 2 : somme des cas 1,2,3,4 pannes.", "\\(1-\\frac{\\binom{15}{4}}{\\binom{20}{4}}\\)."],
    ["Exactement deux pannes : choisir 2 voitures parmi les 5 en panne et 2 parmi les 15 bonnes.", "\\(\\frac{\\binom52\\binom{15}{2}}{\\binom{20}{4}}\\)."]
  ],
  "td1-e13": [
    ["Un classement avec ex-aequo est une partition des coureurs en groupes de meme rang.", "On utilise les nombres de Stirling \\(S(4,k)\\)."],
    ["On ordonne ensuite les groupes de rang.", "\\(\\sum_{k=1}^4 k!S(4,k)=1+14+36+24=75\\)."]
  ],
  "td1-e14": [
    ["Les decompositions non ordonnees sont aussi nombreuses, mais pas equiprobables.", "Il faut compter les permutations de chaque decomposition."],
    ["Somme 9 donne 25 triples ordonnes ; somme 10 donne 27 triples ordonnes.", "\\(P(9)=25/216\\), \\(P(10)=27/216\\)."],
    ["La somme 10 correspond a plus d'issues elementaires ordonnees.", "Donc 10 sort plus souvent que 9."]
  ],
  "td2-e1": [
    ["On additionne les contributions de chaque categorie.", "\\(P(I)=0,08\\cdot0,70+0,15\\cdot0,50+0,77\\cdot0,30=0,362\\)."],
    ["On inverse la condition avec Bayes.", "\\(P(P\\mid I)=\\frac{0,15\\cdot0,50}{0,362}\\approx0,207\\)."]
  ],
  "td2-e2": [
    ["On reecrit chaque intersection avec la definition du conditionnement.", "\\(P(A_1\\cap\\cdots\\cap A_n)=P(A_1)\\prod_{k=2}^nP(A_k\\mid A_1\\cap\\cdots\\cap A_{k-1})\\)."],
    ["A chaque paire, l'urne a change : on conditionne par les tirages precedents.", "Au stade ou il reste \(m\) noires et \(m\) blanches, la probabilite d'avoir deux couleurs differentes vaut \\(\\frac{m}{2m-1}\\)."],
    ["On multiplie ces probabilites conditionnelles.", "\\(\\prod_{m=1}^n\\frac{m}{2m-1}\\)."]
  ],
  "td2-e3": [
    ["Dans rigour, il y a 3 voyelles sur 6.", "\\(P(V\\mid A)=1/2\\)."],
    ["Dans rigor, il y a 2 voyelles sur 5.", "\\(P(V\\mid U)=2/5\\)."],
    ["On applique Bayes avec \(P(A)=0,4\) et \(P(U)=0,6\).", "\\(P(A\\mid V)=\\frac{0,4\\cdot1/2}{0,4\\cdot1/2+0,6\\cdot2/5}=5/11\\)."]
  ],
  "td2-e4": [
    ["Avec 3 enfants, les 8 issues sont equiprobables.", "\\(P(A)=3/4\\), \\(P(B)=1/2\\), \\(P(A\\cap B)=3/8=P(A)P(B)\\)."],
    ["Avec 2 enfants, on refait le meme test.", "\\(P(A)=1/2\\), \\(P(B)=3/4\\), \\(P(A\\cap B)=1/2\\ne3/8\\)."]
  ],
  "td2-e5": [
    ["La variable compte les succes.", "Soit \(X\) le nombre de penaltys reussis."],
    ["Les tirs sont independants et de meme probabilite \(p\).", "\\(X\\sim\\mathcal B(n,p)\\)."],
    ["On applique la formule binomiale.", "\\(P(X=k)=\\binom nkp^k(1-p)^{n-k}\\)."]
  ],
  "td2-e6": [
    ["Detecter la fraude signifie tirer les deux dames de coeur.", "\\(P(D)=\\frac{\\binom{31}{n-2}}{\\binom{33}{n}}\\)."],
    ["Pour \(n=4\), on remplace dans la formule.", "\\(q=\\frac{\\binom{31}{2}}{\\binom{33}{4}}\\)."],
    ["Sur \(r\) experiences independantes, on passe par le contraire jamais detecte.", "\\(1-(1-q)^r\\ge0,95\\), donc \\(r\\ge\\frac{\\ln(0,05)}{\\ln(1-q)}\\)."]
  ],
  "td2-e7": [
    ["Le rapport 4 pour 1 donne \(P(\\overline V\\cap M)=4P(V\\cap M)\).", "\\(P(V\\cap M)=\\frac14\\cdot\\frac1{20}=\\frac1{80}\\), donc \(P(\\overline V\\cap M)=\\frac1{20}\\)."],
    ["On conditionne par le fait de ne pas etre vaccine.", "\\(P(M\\mid\\overline V)=\\frac{1/20}{3/4}=1/15\\)."]
  ],
  "td2-e8": [
    ["Sans test, il faut etre malade puis mourir.", "\\(0,01\\cdot0,5=0,005\\)."],
    ["On separe vrais positifs, faux negatifs et faux positifs.", "Contributions : \(0,01\\cdot0,8\\cdot0,1\), \(0,01\\cdot0,2\\cdot0,5\), \(0,99\\cdot0,03\\cdot0,02\)."],
    ["On additionne les cas de deces.", "\\(0,0008+0,001+0,000594=0,002394\\)."]
  ],
  "td2-e9": [
    ["Le tirage est un groupe de 4 parmi 9.", "Total \\(\\binom94\\)."],
    ["Le cas favorable est de choisir les 4 femmes.", "\\(P=1/\\binom94=1/126\\)."]
  ],
  "td2-e10": [
    ["On pose \(S_i\) : alliance dans le secteur \(i\), et \(E\) : rien trouve.", "\\(P(S_i)=1/3\\), \(P(E\\mid S_1)=p\\), \(P(E\\mid S_2)=P(E\\mid S_3)=1\\)."],
    ["On utilise les probabilites totales.", "\\(P(E)=(p+2)/3\\)."],
    ["Bayes donne les probabilites mises a jour.", "\\(P(S_1\\mid E)=p/(p+2)\\), \\(P(S_2\\mid E)=P(S_3\\mid E)=1/(p+2)\\)."]
  ],
  "td2-e11": [
    ["On decompose selon l'etat courant.", "\\(p_{n+1}=(1-2a)p_n+aq_n+ar_n\\), \\(q_{n+1}=ap_n+(1-2a)q_n+ar_n\\)."],
    ["Les trois etats forment un systeme complet.", "\\(p_n+q_n+r_n=1\\), donc \\(r_n=1-p_n-q_n\\)."],
    ["On remplace \(r_n\).", "\\(p_{n+1}=a+(1-3a)p_n\\), \\(q_{n+1}=a+(1-3a)q_n\\)."],
    ["Le point fixe est \(1/3\).", "\\(p_n=\\frac13-\\frac13(1-3a)^{n-1}\\), \\(q_n=\\frac13+\\frac23(1-3a)^{n-1}\\), \\(r_n=\\frac13-\\frac13(1-3a)^{n-1}\\)."]
  ],
  "td3-e1": [
    ["Le nombre d'apparitions du numero choisi est binomial.", "\\(N\\sim\\mathcal B(3,1/6)\\)."],
    ["Le gain est une fonction de \(N\).", "\\(X=-1,1,2,3\\) selon que \(N=0,1,2,3\\)."],
    ["On calcule la moyenne ponderee.", "\\(E(X)=-\\frac{125}{216}+\\frac{75}{216}+\\frac{30}{216}+\\frac3{216}=-\\frac{17}{216}\\)."]
  ],
  "td3-e2": [
    ["On decompose l'entier en bits.", "\\(Z=8B_3+4B_2+2B_1+B_0\\)."],
    ["Lineairite et independance.", "\\(E(Z)=15p\\), \\(V(Z)=85p(1-p)\\)."],
    ["La parite depend du dernier bit.", "\\(P(Z\\text{ pair})=1-p\\)."],
    ["Avoir \(Z>3\) signifie qu'un des deux bits de poids fort vaut 1.", "\\(P(Z>3)=1-(1-p)^2\\)."]
  ],
  "td3-e3": [
    ["L'appareil est bon si tous les composants sont bons.", "\\(q=P(\\text{defectueux})=1-(0,9985)^{20}\\)."],
    ["Pour 10 appareils, on compte les defectueux.", "\\(X\\sim\\mathcal B(10,q)\\)."],
    ["Au moins 7 bons signifie au plus 3 defectueux.", "\\(P(X\\le3)=\\sum_{k=0}^3\\binom{10}{k}q^k(1-q)^{10-k}\\)."],
    ["L'esperance d'une binomiale vaut \(np\).", "Nombre moyen pour 100 appareils : \\(100q\\)."]
  ],
  "td3-e4": [
    ["Chaque bit est un essai erreur/succes.", "\\(X\\sim\\mathcal B(32,10^{-5})\\)."],
    ["Une unique erreur.", "\\(\\binom{32}{1}10^{-5}(1-10^{-5})^{31}\\)."],
    ["Quatre erreurs.", "\\(\\binom{32}{4}(10^{-5})^4(1-10^{-5})^{28}\\)."],
    ["Au moins une erreur : complement de zero erreur.", "\\(1-(1-10^{-5})^{32}\\)."],
    ["Esperance binomiale.", "\\(E(X)=32\\cdot10^{-5}\\)."]
  ],
  "td3-e5": [
    ["Le nombre de centenaires suit une binomiale.", "\\(X_n\\sim\\mathcal B(n,0,01)\\)."],
    ["Au moins un parmi 100.", "\\(1-0,99^{100}\\)."],
    ["Au moins un parmi 200.", "\\(1-0,99^{200}\\)."]
  ],
  "td3-e6": [
    ["Chaque enfant est soit avec gene, soit sans gene.", "\\(N=X+Y\\)."],
    ["Sachant \(N=n\), \(X\) est binomial.", "\\(P(X=k\\mid N=n)=\\binom nkp^k(1-p)^{n-k}\\), puis \\(X\\sim\\mathcal P(\\lambda p)\\)."],
    ["Par symetrie.", "\\(Y\\sim\\mathcal P(\\lambda(1-p))\\)."],
    ["La loi jointe se factorise.", "\\(P(X=k,Y=l)=P(X=k)P(Y=l)\\), donc independance."],
    ["On applique avec \(\lambda p=0,8\) et \(\lambda(1-p)=1,2\).", "\\(P(X=3,Y=2)=e^{-2}\\frac{0,8^3}{3!}\\frac{1,2^2}{2!}\\)."]
  ],
  "td3-e7": [
    ["La probabilite de continuer change avec le nombre de noires ajoutees.", "Pour \(n\\ge2\), \\(P(X=n)=\\frac{n-1}{n!}\\)."],
    ["On somme \(nP(X=n)\).", "\\(E(X)=\\sum_{n=2}^{\\infty}n\\frac{n-1}{n!}=e\\)."],
    ["Sachant le nombre de parties, les bonnes reponses suivent une binomiale.", "\\(P(Y=1000k)=\\sum_{n\\ge k}P(X=n)\\binom nk2^{-n}\\)."]
  ],
  "td3-e8": [
    ["Le code fixe utilise toujours 2 bits.", "\\(L_1=2\\) presque surement."],
    ["Longueur constante.", "\\(E(L_1)=2\\), \\(V(L_1)=0\\)."],
    ["Le code variable a longueurs 1,2,3,3.", "\\(E(L_2)=7/4\\), \\(V(L_2)=11/16\\), \\(\\sigma=\\sqrt{11}/4\\)."],
    ["On choisit le code de plus petite longueur moyenne.", "Le code \(C_2\) est meilleur en moyenne."],
    ["Entropie de la loi.", "\\(H(X)=7/4\\)."],
    ["Comparaison a la borne theorique.", "Le code \(C_2\) atteint l'entropie : il est optimal en longueur moyenne."]
  ],
  "td3-e9": [
    ["Le paiement double a chaque echec supplementaire.", "\\(2^{16}=65536\\)."],
    ["Premier face au rang \(n\).", "\\(P(X=2^n)=2^{-n}\\)."],
    ["L'esperance mathematique est infinie, mais le risque est enorme.", "Selon le critere d'esperance pure, toute mise finie serait acceptable."],
    ["Meme remarque pour 5 euros.", "L'esperance pure dit oui, mais ce critere est discutable."],
    ["Chaque terme de l'esperance vaut 1.", "\\(E(X)=\\sum_{n\\ge1}2^n2^{-n}=+\\infty\\)."],
    ["Le paradoxe critique l'usage naif de l'esperance.", "Il faut tenir compte du risque, de la richesse et de l'utilite."]
  ],
  "td3-e10": [
    ["On compte les absents parmi 210 passagers.", "\\(X\\sim\\mathcal B(210,1/70)\\)."],
    ["Probabilites ponctuelles binomiales.", "\\(P(X=0)=(69/70)^{210}\\), \\(P(X=1)=210\\frac1{70}(69/70)^{209}\\)."],
    ["Comme \(np=3\), une approximation de Poisson est naturelle.", "\\(X'\\sim\\mathcal P(3)\\)."],
    ["Probabilites ponctuelles de Poisson.", "\\(P(X'=0)=e^{-3}\\), \\(P(X'=1)=3e^{-3}\\)."],
    ["Il y a trop de passagers si moins de 5 personnes sont absentes.", "\\(P(X\\le4)=\\sum_{k=0}^4\\binom{210}{k}(1/70)^k(69/70)^{210-k}\\)."]
  ]
};

for (const [id, answers] of Object.entries(data)) {
  const file = id.startsWith("td1") ? "td1.html" : id.startsWith("td2") ? "td2.html" : "td3.html";
  const filePath = path.join(process.cwd(), file);
  let html = fs.readFileSync(filePath, "utf8");

  answers.forEach(([reasoning, solution], index) => {
    const n = index + 1;
    const reasoningPattern = new RegExp(`(<div id="${id}-q${n}-reasoning" class="hidden-panel reasoning-panel">\\s*<strong>Raisonnement<\\/strong>\\s*)([\\s\\S]*?)(\\s*<\\/div>)`);
    const solutionPattern = new RegExp(`(<div id="${id}-q${n}-solution" class="hidden-panel solution-panel">\\s*<strong>Solution<\\/strong>\\s*)([\\s\\S]*?)(\\s*<\\/div>)`);
    html = html.replace(reasoningPattern, `$1<p>${reasoning}</p>$3`);
    html = html.replace(solutionPattern, `$1<p>${solution}</p>$3`);
  });

  fs.writeFileSync(filePath, html, "utf8");
}

console.log("Solutions par question reinjectees.");
