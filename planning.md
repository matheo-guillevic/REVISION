# Planning de creation du site de revision

## Objectif

Creer une premiere base de site de revision en mathematiques pour preparer un examen de fin de semestre. Le site doit rester ferme, guide, academique et centre sur un parcours impose.

Les contenus de cours reels ne sont pas ajoutes pour l'instant. La structure prevoit les emplacements necessaires pour les integrer ensuite.

## Etapes realisees

- Lire le cahier des charges dans `prompt.txt`.
- Definir une structure statique simple pour demarrer vite.
- Creer une page unique navigable avec sections principales.
- Prevoir les composants essentiels : progression, chapitres, blocs pedagogiques, exercices, annotations, sujet blanc et revision finale.
- Ajouter les interactions de base : afficher/masquer les indices, corrections et annotations, marquer un exercice comme "a refaire".
- Integrer les quatre chapitres du semestre : denombrement, espaces probabilises, variables aleatoires discretes, variables aleatoires continues.
- Ajouter des aides de comprehension, des exemples commentes et des exercices corriges modeles pour chaque chapitre.
- Organiser les methodes transversales autour des automatismes attendus a l'examen.
- Extraire le texte des PDF de cours et TD avec un outil local Node.
- Completer le contenu du site en suivant les plans reels extraits des PDF.
- Ajouter les notions absentes de la premiere synthese : tribu, systeme complet, continuite des probabilites, covariance, variables centrees reduites, lois geometrique et Poisson, approximation binomiale-Poisson, lois normales et sommes de normales.
- Ajouter une section TD reliant les PDF d'exercices au parcours.
- Diviser la source HTML en fichiers partiels pour ameliorer la lisibilite.
- Ajouter des scripts npm pour reconstruire `index.html` depuis `src/`.
- Creer des pages corrigees pour TD1, TD2 et TD3 avec enonces reformules, corrections detaillees et rappels de formules.
- Ajouter des tags de notions et des notes de raisonnement dans chaque correction TD.
- Ajouter des explications par question ou sous-question dans chaque correction TD.
- Ajouter un bloc Questions visible et un bloc Reponse masquable pour chaque exercice TD.
- Restructurer les reponses TD pour chaque question : raisonnement affichable independamment de la solution.

## Actions a faire ensuite

1. Relire le site en parallele des PDF pour corriger les notations encodees bizarrement par l'extraction automatique.
2. Ajouter les demonstrations completes qui seront explicitement demandees a l'examen.
3. Transformer davantage d'exercices TD en cartes interactives avec indices et corrections.
4. Construire un vrai sujet blanc avec bareme et correction detaillee.
5. Tester l'affichage des formules LaTeX et ajuster les contenus trop longs.
6. Eventuellement separer le site en plusieurs pages si le volume de contenu devient important.
7. Modifier en priorite les fichiers de `src/sections/`, puis lancer `npm run build`.
8. Relire les corrections TD avec les PDF originaux pour ajuster les conventions ou interpretations du professeur si necessaire.
9. Ajouter, si besoin, un filtre par tags dans les pages TD.
10. Continuer a enrichir les explications TD avec des schemas ou arbres de probabilites lorsque ce sera utile.
11. Relire les blocs Questions pour harmoniser la formulation avec les enonces originaux si le professeur utilise une notation precise.
12. Reprendre certaines solutions TD si le professeur attend une convention de notation particuliere.

## Priorites de contenu

- Priorite 1 : verifier les notations exactes des PDF apres extraction.
- Priorite 2 : ajouter les demonstrations exigibles.
- Priorite 3 : convertir les TD en exercices interactifs.
- Priorite 4 : finaliser le sujet blanc.
- Priorite 5 : affiner la fiche de revision finale.

## Verification technique

- Ouvrir `index.html` dans un navigateur.
- Tester la navigation laterale sur ordinateur.
- Tester l'affichage mobile.
- Verifier les boutons d'affichage des indices, corrections et annotations.
- Verifier que la progression se met a jour quand des exercices sont marques comme faits ou a refaire.
