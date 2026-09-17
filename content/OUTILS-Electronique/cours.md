---
title: OUTILS-Electronique - Revision ESISAR
subject: OUTILS-Electronique
type: course
---

:::section id="outils-elec-intro" eyebrow="Outils" title="Methodes electroniques transverses" summary="Fiches hors semestre pour comprendre les montages reutilises dans les cours d'electronique, capteurs et automatique."
:::dashboard
:::card class="progress-card" kicker="Role" title="Lire un montage"
L'objectif est de rendre explicites les methodes de calcul : choix du modele, loi des noeuds, hypothese ideale, linearisation et interpretation physique.
:::

:::card class="priority-card" kicker="Ordre conseille"
1. Reconnaitre le montage.
2. Poser les hypotheses.
3. Ecrire les equations.
4. Simplifier seulement apres avoir garde les grandeurs utiles.
:::
:::

:::quicklinks
- [Bases de circuits](#outils-elec-bases)
- [AOP](#outils-elec-aop)
- [Capteurs](#outils-elec-capteurs)
- [Composants](#outils-elec-composants)
- [Filtres](#outils-elec-filtres)
:::
:::

:::section id="outils-elec-bases" eyebrow="Methodes" title="Bases de circuits" summary="Diviseurs, impedances et methode statique-dynamique."
:::grid variant="two-col"
:::block type="definition" title="Diviseur de tension"
Deux impedances en serie donnent :

\[
V_s=V_e\frac{Z_2}{Z_1+Z_2}
\]

Cette formule marche en continu avec des resistances, mais aussi en regime harmonique avec des impedances complexes.
:::

:::block type="method" title="Utiliser un diviseur"
1. Identifier la sortie : sur quel composant est mesuree la tension ?
2. Remplacer les composants par leurs impedances.
3. Appliquer la formule.
4. Verifier les limites : basse frequence, haute frequence, resistance tres grande ou tres petite.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Methode statique dynamique"
On separe une grandeur en point de repos et petite variation :

\[
x(t)=X_0+\tilde x(t)
\]

Le calcul statique fixe les polarisations. Le calcul dynamique garde seulement les petites variations autour du point de repos.
:::

:::block type="warning" title="Erreur frequente"
Ne pas melanger le modele statique et le modele dynamique : une diode, un transistor ou une Zener n'ont pas le meme schema equivalent dans les deux lectures.
:::
:::
:::

:::section id="outils-elec-aop" eyebrow="Methodes" title="Amplificateurs operationnels" summary="AOP ideal, contre-reaction, soustracteur et instrumentation."
:::grid variant="two-col"
:::block type="definition" title="AOP ideal et contre reaction"
En regime lineaire avec contre-reaction negative :

\[
i_+=i_-=0,\qquad v_+=v_-
\]

Ces deux relations suffisent souvent a calculer le gain du montage.
:::

:::block type="method" title="Analyser un montage AOP"
1. Verifier qu'il existe une contre-reaction negative.
2. Poser \(v_+=v_-\) et \(i_+=i_-=0\).
3. Ecrire la loi des noeuds sur l'entree inverseuse ou non-inverseuse.
4. Isoler \(V_s/V_e\) ou l'expression demandee.
5. Controler le signe et la saturation possible.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Amplificateur differentiel"
Un amplificateur differentiel amplifie une difference :

\[
v_d=v_2-v_1
\]

Le montage est utile quand le signal utile est porte par deux fils et qu'une perturbation commune se superpose aux deux entrees.
:::

:::block type="definition" title="Amplificateur d instrumentation"
L'amplificateur d'instrumentation ajoute une forte impedance d'entree, un gain reglable et un bon rejet du mode commun. Il est adapte aux signaux faibles de capteurs, surtout avec pont de Wheatstone.
:::
:::
:::

:::section id="outils-elec-capteurs" eyebrow="Methodes" title="Conditionnement des capteurs" summary="Ponts, sensibilite, bruit et chaine de mesure."
:::grid variant="two-col"
:::block type="definition" title="Pont de Wheatstone"
Un pont de Wheatstone compare deux diviseurs de tension. La sortie differentielle vaut :

\[
V_s=V_e\left(\frac{R_2}{R_1+R_2}-\frac{R_4}{R_3+R_4}\right)
\]

Il est tres utile pour transformer une petite variation de resistance en petite tension differentielle.
:::

:::block type="method" title="Lineariser un pont"
1. Ecrire la formule exacte de sortie.
2. Remplacer la resistance variable par \(R+\Delta R\).
3. Developper au premier ordre si \(|\Delta R|\ll R\).
4. Identifier la sensibilite \(dV_s/dR\).
5. Verifier si le montage compense temperature ou fils.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="Sensibilite et etalonnage"
La sensibilite mesure la variation de sortie par variation du mesurande :

\[
S=\frac{\Delta y}{\Delta x}
\]

L'etalonnage sert a relier experimentalement la grandeur physique a la grandeur electrique.
:::

:::block type="definition" title="Bruit et incertitude de mesure"
Une mesure est toujours accompagnee d'une incertitude. Le bruit aleatoire se reduit parfois par filtrage ou moyenne ; les erreurs systematiques demandent correction, etalonnage ou changement de montage.
:::
:::
:::

:::section id="outils-elec-composants" eyebrow="Methodes" title="Composants et modeles" summary="Diodes, Zener, BJT et modeles petits signaux."
:::grid variant="two-col"
:::block type="definition" title="Diode et modele affine"
Le modele affine remplace la diode conductrice par une tension seuil et une resistance dynamique :

\[
v_D=V_\gamma+r_di_D
\]

Il est plus realiste que la diode ideale, tout en restant calculable a la main.
:::

:::block type="definition" title="Diode Zener"
En inverse, une Zener maintient approximativement une tension constante. Le modele dynamique ajoute une petite resistance \(r_z\), importante pour calculer l'ondulation residuelle.
:::
:::

:::grid variant="two-col"
:::block type="definition" title="BJT petits signaux"
Autour du point de repos, un transistor bipolaire peut etre remplace par un modele lineaire. On calcule d'abord le point \(Q\), puis le gain dynamique.
:::

:::block type="method" title="Calculer un amplificateur BJT"
1. Faire le calcul statique en continu.
2. Determiner \(I_{C0}\), \(V_{CE0}\) et le regime.
3. Construire le schema petits signaux.
4. Remplacer les condensateurs de liaison selon la frequence.
5. Calculer gain, impedances d'entree et de sortie.
:::
:::
:::

:::section id="outils-elec-filtres" eyebrow="Methodes" title="Filtres analogiques" summary="RC, ordre, coupure et lecture frequentielle."
:::grid variant="two-col"
:::block type="definition" title="Filtre RC passe bas"
Un passe-bas RC conserve les basses frequences et attenue les hautes :

\[
H(j\omega)=\frac{1}{1+j\omega RC}
\]

Sa pulsation de coupure vaut \(\omega_c=1/RC\).
:::

:::block type="definition" title="Filtre RC passe haut"
Un passe-haut RC bloque le continu et laisse passer les variations rapides :

\[
H(j\omega)=\frac{j\omega RC}{1+j\omega RC}
\]
:::
:::

:::grid variant="two-col"
:::block type="method" title="Lire un Bode de filtre"
1. Chercher le gain basse frequence.
2. Chercher le gain haute frequence.
3. Identifier les pulsations de cassure.
4. Ajouter ou retirer 20 dB/dec par pole ou zero du premier ordre.
5. Lire la phase pour confirmer le type de filtre.
:::

:::block type="remember" title="Ordre d'un filtre"
Chaque pole ajoute environ \(-20\) dB/dec a la pente asymptotique. Un filtre d'ordre 2 peut donc couper plus vite qu'un ordre 1, mais il peut aussi resonner.
:::
:::
:::
