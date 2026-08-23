---
title: "TD 2 corrige - Espaces probabilises"
subject: "math"
type: "td"
target: "math-td2.html"
eyebrow: "TD 2"
heading: "Espaces probabilises"
summary: "Corrige maintenu en Markdown."
---
:::exercise label="Exercice 1" title="Exercice 1"
On note les Ã©vÃ©nements suivants : \(M_a\) : "la personne est prof de maths", \(M_e\) : "la personne est mÃ©decin", \(N\) : "la personne est normale". On note Ã©galement \(L\) : "le mot est lisible" et \(\bar{L}\) : "le mot est illisible".

D'aprÃ¨s l'Ã©noncÃ©, on a : \(P(M_a) = 0.15\), \(P(M_e) = 0.08\) et \(P(N) = 0.77\). Les probabilitÃ©s conditionnelles d'Ã©crire de faÃ§on illisible sont : \(P(\bar{L}|M_a) = 0.5\), \(P(\bar{L}|M_e) = 0.7\) et \(P(\bar{L}|N) = 0.3\).

#### 1. ProbabilitÃ© que le mot soit illisible

**Raisonnement :** La famille \(\{M_a, M_e, N\}\) forme un systÃ¨me complet d'Ã©vÃ©nements (SCE). On applique la formule des probabilitÃ©s totales : \[P(\bar{L}) = P(M_a \cap \bar{L}) + P(M_e \cap \bar{L}) + P(N \cap \bar{L})\] \[P(\bar{L}) = P(M_a)P(\bar{L}|M_a) + P(M_e)P(\bar{L}|M_e) + P(N)P(\bar{L}|N)\]

**Reponse :** \[P(\bar{L}) = 0.15 \times 0.5 + 0.08 \times 0.7 + 0.77 \times 0.3 = 0.075 + 0.056 + 0.231 = \mathbf{0.362}\]

#### 2. ProbabilitÃ© que l'auteur soit un prof de maths sachant que le mot est illisible

**Raisonnement :** Il s'agit de calculer la probabilitÃ© conditionnelle \(P(M_a|\bar{L})\) Ã  l'aide de la formule de Bayes.

**Reponse :** \[P(M_a|\bar{L}) = \frac{P(M_a \cap \bar{L})}{P(\bar{L})} = \frac{0.075}{0.362} = \mathbf{\frac{75}{362} \approx 0.207}\]

---
:::

:::exercise label="Exercice 2" title="Exercice 2"
#### 1. DÃ©monstration par rÃ©currence

**Raisonnement :** On procÃ¨de par rÃ©currence sur le nombre \(n\) d'Ã©vÃ©nements \(A_1, A_2, \dots, A_n\).

- **Initialisation :** Pour \(n=2\), la dÃ©finition de la probabilitÃ© conditionnelle donne bien \(P(A_1 \cap A_2) = P(A_1)P(A_2|A_1)\).
- **HÃ©rÃ©ditÃ© :** Supposons la propriÃ©tÃ© vraie pour un entier \(m \ge 2\).

Pour \(m+1\) Ã©vÃ©nements, on Ã©crit : \[P(A_1 \cap \dots \cap A_{m+1}) = P((A_1 \cap \dots \cap A_m) \cap A_{m+1}) = P(A_1 \cap \dots \cap A_m)P(A_{m+1} | A_1 \cap \dots \cap A_m)\] En utilisant l'hypothÃ¨se de rÃ©currence pour \(P(A_1 \cap \dots \cap A_m)\), on obtient directement la formule souhaitÃ©e au rang \(m+1\).

**Reponse :** L'hÃ©rÃ©ditÃ© est prouvÃ©e, la formule est donc vraie pour tout \(n \ge 2\).

#### 2. Tirage dans l'urne

**Raisonnement :** Notons \(A_k\) l'Ã©vÃ©nement "au \(k\)-iÃ¨me tirage, on obtient une boule blanche et une noire" (couleurs diffÃ©rentes) pour \(k \in \{1, \dots, n\}\). On cherche \(P(A_1 \cap A_2 \cap \dots \cap A_n)\).

Au premier tirage, on choisit 2 boules parmi \(2n\). Il y a \(n^2\) faÃ§ons de choisir une blanche et une noire : \[P(A_1) = \frac{n^2}{\binom{2n}{2}} = \frac{n^2}{n(2n-1)} = \frac{n}{2n-1}\] Sachant \(A_1\), il reste \(2n-2\) boules dont \(n-1\) de chaque couleur. Donc : \[P(A_2|A_1) = \frac{(n-1)^2}{\binom{2n-2}{2}} = \frac{n-1}{2n-3}\] De maniÃ¨re gÃ©nÃ©rale, \(P(A_k | A_1 \cap \dots \cap A_{k-1}) = \frac{n-k+1}{2(n-k+1)-1}\).

**Reponse :** En appliquant la formule du 1., on a le produit : \[P(A_1 \cap \dots \cap A_n) = \frac{n}{2n-1} \times \frac{n-1}{2n-3} \times \dots \times \frac{1}{1}\] En multipliant le numÃ©rateur et le dÃ©nominateur par \((n!) \times 2^n\) pour reconstituer les paires manquantes au dÃ©nominateur, on trouve : \[\mathbf{P = \frac{2^n(n!)^2}{(2n)!}}\]

---
:::

:::exercise label="Exercice 3" title="Exercice 3"
On note \(A\) : "l'auteur est anglais" et \(V\) : "la lettre tirÃ©e est une voyelle". On a \(P(A) = 0.40\) et \(P(\bar{A}) = 0.60\). Pour le mot "rigour" (anglais, 6 lettres, 3 voyelles), \(P(V|A) = \frac{3}{6} = 0.5\). Pour le mot "rigor" (amÃ©ricain, 5 lettres, 2 voyelles), \(P(V|\bar{A}) = \frac{2}{5} = 0.4\).

**Raisonnement :** Le systÃ¨me \(\{A, \bar{A}\}\) est un SCE. Par la formule des probabilitÃ©s totales : \[P(V) = P(A)P(V|A) + P(\bar{A})P(V|\bar{A}) = 0.4 \times 0.5 + 0.6 \times 0.4 = 0.44\] On cherche la probabilitÃ© \(P(A|V)\) via la formule de Bayes : \(P(A|V) = \frac{P(A \cap V)}{P(V)}\).

**Reponse :** \[P(A|V) = \frac{0.2}{0.44} = \mathbf{\frac{5}{11}}\]

---
:::

:::exercise label="Exercice 4" title="Exercice 4"
#### 1. Famille de trois enfants

**Raisonnement :** L'univers est \(\Omega = \{F, G\}^3\) avec Ã©quiprobabilitÃ©, donc \(|\Omega| = 8\). \(A\) : "enfants des deux sexes" correspond Ã  \(\Omega\) privÃ© de \(\{(G,G,G), (F,F,F)\}\). Donc \(|A| = 6\) et \(P(A) = \frac{6}{8} = \frac{3}{4}\). \(B\) : "au plus un garÃ§on" correspond Ã  \(\{(F,F,F), (G,F,F), (F,G,F), (F,F,G)\}\). Donc \(|B| = 4\) et \(P(B) = \frac{4}{8} = \frac{1}{2}\). L'intersection \(A \cap B\) correspond aux cas "exactement 1 garÃ§on", soit \(\{(G,F,F), (F,G,F), (F,F,G)\}\). \(|A \cap B| = 3\), donc \(P(A \cap B) = \frac{3}{8}\).

**Reponse :** Puisque \(P(A) \times P(B) = \frac{3}{4} \times \frac{1}{2} = \frac{3}{8} = P(A \cap B)\), les Ã©vÃ©nements sont **indÃ©pendants**.

#### 2. Famille de deux enfants

**Raisonnement :** Ici \(\Omega = \{F, G\}^2\) avec \(|\Omega| = 4\). \(A\) = \(\{(G,F), (F,G)\}\) d'oÃ¹ \(P(A) = \frac{2}{4} = \frac{1}{2}\). \(B\) ("au plus un garÃ§on") = \(\{(F,F), (G,F), (F,G)\}\) d'oÃ¹ \(P(B) = \frac{3}{4}\). L'intersection \(A \cap B = \{(G,F), (F,G)\}\), d'oÃ¹ \(P(A \cap B) = \frac{1}{2}\).

**Reponse :** \(P(A) \times P(B) = \frac{1}{2} \times \frac{3}{4} = \frac{3}{8} \neq P(A \cap B)\), les Ã©vÃ©nements ne sont **pas indÃ©pendants**.

---
:::

:::exercise label="Exercice 5" title="Exercice 5"
**Raisonnement :** C'est la rÃ©pÃ©tition de \(n\) Ã©preuves de Bernoulli indÃ©pendantes (succÃ¨s = marquer, avec probabilitÃ© \(p\)). L'univers est \(\Omega = \{S, E\}^n\). Le nombre de tirages rÃ©ussis suit une loi binomiale. L'Ã©vÃ©nement "rÃ©ussir \(k\) tirs" correspond aux issues avec \(k\) succÃ¨s et \(n-k\) Ã©checs. Chaque issue a une probabilitÃ© \(p^k(1-p)^{n-k}\). Il y a \(\binom{n}{k}\) faÃ§ons de placer ces succÃ¨s.

**Reponse :** La probabilitÃ© est : \[\mathbf{P(X=k) = \binom{n}{k}p^k(1-p)^{n-k}}\]

---
:::

:::exercise label="Exercice 6" title="Exercice 6"
#### 1. ProbabilitÃ© de dÃ©couvrir le truquage

**Raisonnement :** Le jeu possÃ¨de 33 cartes. L'univers \(\Omega\) est l'ensemble des parties Ã  \(n\) Ã©lÃ©ments de ces 33 cartes, \(|\Omega| = \binom{33}{n}\). Pour s'apercevoir que le jeu est truquÃ©, il faut tirer *simultanÃ©ment* les 2 dames de cÅ“ur. Le nombre de tirages contenant ces 2 cartes est le choix des \(n-2\) autres cartes parmi les 31 restantes, soit \(\binom{31}{n-2}\).

**Reponse :** \[P(\text{truquÃ©}) = \frac{\binom{31}{n-2}}{\binom{33}{n}} = \frac{31!}{(n-2)!(33-n)!} \times \frac{n!(33-n)!}{33!} = \mathbf{\frac{n(n-1)}{33 \times 32}}\]

#### 2. Nombre d'expÃ©riences avec \(n=4\)

**Raisonnement :** Pour \(n=4\), \(P(\text{truquÃ©}) = \frac{4 \times 3}{33 \times 32} = \frac{1}{88}\). En rÃ©pÃ©tant \(k\) fois, la probabilitÃ© de ne *jamais* s'en apercevoir est \((1 - \frac{1}{88})^k = (\frac{87}{88})^k\). On cherche \(k\) tel que \(1 - (\frac{87}{88})^k \ge 0.95\), soit \((\frac{87}{88})^k \le 0.05\). En passant au logarithme : \(k \ln(87/88) \le \ln(0.05) \implies k \ge \frac{\ln(0.05)}{\ln(87/88)}\) (le sens de l'inÃ©galitÃ© change car \(\ln(87/88) < 0\)).

**Reponse :** On trouve \(\mathbf{k \ge 263}\).

---
:::

:::exercise label="Exercice 7" title="Exercice 7"
**Raisonnement :** On note \(V\) : "vaccinÃ©" et \(M\) : "tombe malade". L'Ã©noncÃ© donne \(P(V) = \frac{1}{4}\) (donc \(P(\bar{V}) = \frac{3}{4}\)) et \(P(M|V) = \frac{1}{20}\). De plus, parmi les malades, 4 sont non-vaccinÃ©s pour 1 vaccinÃ©, ce qui signifie que \(P(\bar{V}|M) = \frac{4}{5}\) et \(P(V|M) = \frac{1}{5}\).

On cherche \(P(M|\bar{V})\). On sait que : \[P(V|M) = \frac{P(M \cap V)}{P(M)} = \frac{P(M|V)P(V)}{P(M \cap V) + P(M \cap \bar{V})} = \frac{P(M|V)P(V)}{P(M|V)P(V) + P(M|\bar{V})P(\bar{V})}\] En injectant les valeurs : \[\frac{1}{5} = \frac{\frac{1}{20} \times \frac{1}{4}}{\frac{1}{20} \times \frac{1}{4} + P(M|\bar{V}) \times \frac{3}{4}} = \frac{\frac{1}{80}}{\frac{1}{80} + \frac{3}{4}P(M|\bar{V})}\] On obtient : \[\frac{1}{80} + \frac{3}{4}P(M|\bar{V}) = \frac{5}{80} \implies \frac{3}{4}P(M|\bar{V}) = \frac{4}{80} = \frac{1}{20}\]

**Reponse :** \[P(M|\bar{V}) = \frac{1}{20} \times \frac{4}{3} = \mathbf{\frac{1}{15}}\]

---
:::

:::exercise label="Exercice 8" title="Exercice 8"
On note \(M\) : "Ãªtre malade" (\(P(M) = 0.01\)), \(T\) : "le test est positif", et \(D\) : "dÃ©cÃ©der". On a \(P(T|M) = 0.8\), \(P(\bar{T}|M) = 0.2\), \(P(T|\bar{M}) = 0.03\), \(P(\bar{T}|\bar{M}) = 0.97\). ProbabilitÃ©s de dÃ©cÃ¨s selon le statut et le traitement (on est traitÃ© ssi le test est positif) : \(P(D|M \cap \bar{T}) = 0.5\) (malade non traitÃ©), \(P(D|M \cap T) = 0.1\) (malade traitÃ©), \(P(D|\bar{M} \cap T) = 0.02\) (sain traitÃ©), \(P(D|\bar{M} \cap \bar{T}) = 0\) (sain non traitÃ©).

#### 1. Sans test de dÃ©pistage

**Raisonnement :** Le dÃ©cÃ¨s ne survient que chez les malades avec probabilitÃ© \(0.5\).

**Reponse :** \[P(D) = P(M \cap D) = P(M)P(D|M) = 0.01 \times 0.5 = \mathbf{0.005}\]

#### 2. Avec dÃ©pistage gÃ©nÃ©ralisÃ©

**Raisonnement :** La famille \(\{M \cap T, M \cap \bar{T}, \bar{M} \cap T, \bar{M} \cap \bar{T}\}\) forme un SCE. La formule des probabilitÃ©s totales donne : \[P(D) = P(M)P(T|M)P(D|M \cap T) + P(M)P(\bar{T}|M)P(D|M \cap \bar{T}) + P(\bar{M})P(T|\bar{M})P(D|\bar{M} \cap T) + 0\]

**Reponse :** \[P(D) = 0.01 \times 0.8 \times 0.1 + 0.01 \times 0.2 \times 0.5 + 0.99 \times 0.03 \times 0.02 = 0.0008 + 0.001 + 0.000594 = \mathbf{0.002394}\]

---
:::

:::exercise label="Exercice 9" title="Exercice 9"
**Raisonnement :** Il y a 9 personnes au total. On choisit 4 personnes. Le nombre de cas possibles est \(\binom{9}{4} = 126\). L'Ã©vÃ©nement "choisir 4 femmes" n'est possible que d'une seule faÃ§on, car il n'y a que 4 femmes dans le groupe (on les prend toutes) : \(\binom{4}{4} = 1\).

**Reponse :** \[P = \mathbf{\frac{1}{126}}\]

---
:::

:::exercise label="Exercice 10" title="Exercice 10"
**Raisonnement :** Notons \(S_1, S_2, S_3\) les Ã©vÃ©nements "l'alliance est dans le secteur \(i\)". Ã€ l'origine, ces probabilitÃ©s sont Ã©quiprobables : \(P(S_1) = P(S_2) = P(S_3) = \frac{1}{3}\). Notons \(E\) l'Ã©vÃ©nement "les fouilles sur le secteur 1 ne donnent rien". D'aprÃ¨s l'Ã©noncÃ©, \(P(E|S_1) = p\) (probabilitÃ© de rater l'alliance si elle y est). Si l'alliance est ailleurs, on est sÃ»r de ne rien trouver dans le secteur 1 : \(P(E|S_2) = P(E|S_3) = 1\). On calcule la probabilitÃ© de \(E\) par les probabilitÃ©s totales : \[P(E) = P(E|S_1)P(S_1) + P(E|S_2)P(S_2) + P(E|S_3)P(S_3) = p(\frac{1}{3}) + 1(\frac{1}{3}) + 1(\frac{1}{3}) = \frac{p+2}{3}\] On utilise ensuite le thÃ©orÃ¨me de Bayes pour rÃ©Ã©valuer les probabilitÃ©s relatives.

**Reponse :**

- \(P(S_1|E) = \frac{P(E|S_1)P(S_1)}{P(E)} = \mathbf{\frac{p}{p+2}}\)
- \(P(S_2|E) = \frac{P(E|S_2)P(S_2)}{P(E)} = \mathbf{\frac{1}{p+2}}\)
- \(P(S_3|E) = \frac{P(E|S_3)P(S_3)}{P(E)} = \mathbf{\frac{1}{p+2}}\)

---
:::

:::exercise label="Exercice 11" title="Exercice 11"
#### 1. Expressions des probabilitÃ©s au jour \(n+1\)

**Raisonnement (a) :** Par la formule des probabilitÃ©s totales avec le SCE \(\{M_n, S_n, B_n\}\) : \[P(M_{n+1}) = P(M_{n+1}|M_n)P(M_n) + P(M_{n+1}|S_n)P(S_n) + P(M_{n+1}|B_n)P(B_n)\] On applique cette logique d'aprÃ¨s les rÃ¨gles de transition donnÃ©es.

**Reponse (a) :**

- \(\mathbf{p_{n+1} = (1-2a)p_n + a q_n + a r_n}\)
- \(\mathbf{q_{n+1} = a p_n + (1-2a)q_n + a r_n}\)

**Raisonnement (b) :** Ã€ tout jour \(n\), le titre doit soit monter, soit Ãªtre stable, soit baisser. Donc la somme des probabilitÃ©s vaut 1.

**Reponse (b) :** \[\mathbf{p_n + q_n + r_n = 1}\] On en dÃ©duit \(\mathbf{r_n = 1 - p_n - q_n}\).

#### 2. Suites arithmÃ©tico-gÃ©omÃ©triques

**Raisonnement :** On injecte l'expression de \(r_n\) dans \(p_{n+1}\) et \(q_{n+1}\) : \[p_{n+1} = (1-2a)p_n + a q_n + a(1 - p_n - q_n) = (1-2a)p_n - a p_n + a = (1-3a)p_n + a\] De mÃªme, \(q_{n+1} = a p_n + (1-2a)q_n + a(1 - p_n - q_n) = (1-3a)q_n + a\).

**Reponse :** Les suites \((p_n)\) et \((q_n)\) s'expriment sous la forme \(u_{n+1} = \alpha u_n + \beta\), elles sont donc **arithmÃ©tico-gÃ©omÃ©triques de raison** \(\mathbf{1-3a}\).

#### 3. Expression explicite et limites

**Raisonnement :** Le point fixe de ces suites est la solution de \(\ell = (1-3a)\ell + a \implies 3a\ell = a \implies \ell = \frac{1}{3}\) (puisque \(a \neq 0\)). On pose la suite auxiliaire \(u_n = p_n - 1/3\) (resp. \(v_n = q_n - 1/3\)) qui est gÃ©omÃ©trique de raison \(1-3a\). Donc \(p_n = \frac{1}{3} + (p_1 - \frac{1}{3})(1-3a)^{n-1}\). L'Ã©noncÃ© stipule qu'au premier jour le titre est stable, donc \(p_1 = 0\), \(q_1 = 1\), \(r_1 = 0\).

**Reponse (Expressions) :**

- \(\mathbf{p_n = \frac{1}{3} - \frac{1}{3}(1-3a)^{n-1}}\)
- \(\mathbf{q_n = \frac{1}{3} + \frac{2}{3}(1-3a)^{n-1}}\)
- \(\mathbf{r_n = 1 - p_n - q_n = \frac{1}{3} - \frac{1}{3}(1-3a)^{n-1}}\)

**Raisonnement (Limites) :** Puisque \(a \in ]0, 1/2[\), on a \(1-3a \in ]-1/2, 1[\). La suite \((1-3a)^{n-1}\) tend donc vers 0 quand \(n \to +\infty\).

**Reponse (Limites) :** Les limites des trois suites sont : \[\mathbf{\lim_{n \to \infty} p_n = \frac{1}{3}, \quad \lim_{n \to \infty} q_n = \frac{1}{3}, \quad \lim_{n \to \infty} r_n = \frac{1}{3}}\] **InterprÃ©tation :** Ã€ long terme, le systÃ¨me "oublie" sa condition initiale et chaque comportement (monter, stagner, baisser) devient Ã©quiprobable.
:::
