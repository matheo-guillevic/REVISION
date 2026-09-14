---
title: TP 1 corrige - Arithmetique flottante et stabilite numerique
subject: MT461-Methode-numerique
type: tp
target: MT461-Methode-numerique-tp1.html
eyebrow: MT461 - TP 1
heading: Arithmetique en virgule flottante et stabilite numerique
summary: Preparation theorique et experimentation R interactive avec WebR.
---

:::quicklinks
- [Preparation](#tp1-preparation)
- [Archimede](#tp1-archimede)
- [Exponentielle](#tp1-exponentielle)
- [Forward / backward](#tp1-forward-backward)
- [Synthese](#tp1-synthese)
:::

:::block type="neutral" title="Objectif du TP"
Ce TP illustre une idee centrale du calcul scientifique : deux formules mathematiquement equivalentes peuvent avoir des comportements numeriques tres differents en arithmetique flottante.

Les blocs **WebR** ci-dessous executent le code R directement dans le navigateur. Le premier lancement peut prendre quelques secondes car le runtime R en WebAssembly est charge a la demande.
:::

:::section id="tp1-preparation" eyebrow="Preparation" title="Resultats theoriques utiles" summary="Relations de recurrence, stabilite et ordres de grandeur a garder sous les yeux pendant les manipulations R."

:::exercise label="Preparation 1" title="Methode d'Archimede"
On approche $\pi$ par le demi-perimetre $y_k$ d'un polygone regulier inscrit dans le cercle unite, avec $n=2^k$ cotes.

:::block type="method" title="Relation de recurrence"
Si $\ell_k$ est la longueur d'un cote du polygone au rang $k$, alors :

\[
\ell_k = 2^{1-k}y_k
\]

En doublant le nombre de cotes, on obtient :

\[
y_{k+1}
=
2^k\sqrt{2\left(1-\sqrt{1-(2^{-k}y_k)^2}\right)}
\qquad y_1=2.
\]

La formule exacte associee est :

\[
y_k = 2^k \sin\left(\frac{\pi}{2^k}\right)
\quad\Longrightarrow\quad
y_k \to \pi.
\]
:::

:::block type="warning" title="Point numerique sensible"
La quantite

\[
1-\sqrt{1-u_k^2}
\qquad\text{avec}\qquad
u_k=2^{-k}y_k
\]

devient une soustraction entre deux nombres presque egaux lorsque $k$ augmente. C'est une situation typique d'annulation catastrophique.
:::
:::

:::exercise label="Preparation 2" title="Moyenne arithmetico-geometrique"
Pour $a>b>0$, on definit :

\[
a_{n+1}=\frac{a_n+b_n}{2},
\qquad
b_{n+1}=\sqrt{a_nb_n}.
\]

:::block type="theorem" title="Suites adjacentes et convergence quadratique"
Les suites $(a_n)$ et $(b_n)$ restent positives, verifient $b_n\le a_n$, puis $a_n$ decroit et $b_n$ croit. Elles convergent vers une limite commune :

\[
\operatorname{agm}(a,b).
\]

De plus :

\[
a_{n+1}-b_{n+1}
=
\frac{(a_n-b_n)^2}{2(\sqrt{a_n}+\sqrt{b_n})^2}
\le
\frac{1}{8b}(a_n-b_n)^2.
\]

L'ecart est donc essentiellement mis au carre a chaque etape : c'est une convergence quadratique.
:::
:::

:::exercise label="Preparation 3" title="Serie de l'exponentielle"
On utilise :

\[
e^x = \sum_{k=0}^{+\infty}\frac{x^k}{k!}
=
\sum_{k=0}^{n}\frac{x^k}{k!}+R_n(x).
\]

:::block type="method" title="Borne de troncature"
Pour $n>2|x|$, la queue de serie verifie :

\[
|R_n(x)| \le \frac{|x|^n}{n!}.
\]

Cette borne mesure l'erreur de troncature en arithmetique exacte. Elle ne controle pas les pertes de precision dues aux annulations en machine.
:::
:::

:::exercise label="Preparation 4" title="Recurrence forward / backward"
On considere :

\[
I_n=\int_0^1\frac{x^n}{a+x}\,dx
\qquad a>0.
\]

:::block type="method" title="Relations utiles"
On a :

\[
I_0=\ln\left(\frac{1+a}{a}\right),
\qquad
I_n=\frac{1}{n}-aI_{n-1}.
\]

Comme $0\le x^n/(a+x)\le x^n/a$, on obtient :

\[
0\le I_n\le \frac{1}{a(n+1)}
\qquad\Longrightarrow\qquad
I_n\to0.
\]

Le schema forward propage une erreur selon :

\[
e_n=-ae_{n-1}.
\]

Il est donc instable si $a>1$.
:::

:::block type="remember" title="Schema backward"
La recurrence inverse est :

\[
I_{n-1}=\frac{1}{a}\left(\frac{1}{n}-I_n\right).
\]

Si on initialise $I_m^{(m)}=0$ pour $m$ assez grand, l'erreur est multipliee a chaque pas par $1/a$. Pour $a>1$, le backward attenue donc les erreurs.
:::
:::
:::

:::section id="tp1-archimede" eyebrow="Travail en seance" title="Calcul de pi" summary="Comparer une formule mathematiquement correcte mais instable avec une reecriture stable, puis tester une methode plus rapide fondee sur l'AGM."

:::exercise label="Manipulation 1" title="Archimede : formule naive"
Calculer $y_{20}$ et $y_{100}$ avec la recurrence directe.

:::rplayground id="tp1-r-archimede-naif" title="Archimede - formule naive" caption="Modifier K ou tracer l'erreur pour observer la degradation numerique."
```r
archimede_naif <- function(K) {
  y <- 2
  if (K == 1) return(y)

  for (k in 1:(K - 1)) {
    y <- 2^k * sqrt(2 * (1 - sqrt(1 - (2^(-k) * y)^2)))
  }
  y
}

K <- 1:60
valeurs <- sapply(K, archimede_naif)

print(data.frame(
  K = c(20, 30, 40, 50, 60),
  approximation = sapply(c(20, 30, 40, 50, 60), archimede_naif),
  erreur = abs(sapply(c(20, 30, 40, 50, 60), archimede_naif) - pi)
))

plot(K, abs(valeurs - pi), type = "b", log = "y",
     xlab = "K", ylab = "|y_K - pi|",
     main = "Archimede naive : l'erreur finit par remonter")
abline(h = .Machine$double.eps, col = "red", lty = 2)
```
:::

:::block type="warning" title="Observation attendue"
Le resultat s'ameliore d'abord, puis se degrade. Pour de grands $k$, le terme $\sqrt{1-u_k^2}$ est arrondi a une valeur trop proche de $1$, et la soustraction $1-\sqrt{1-u_k^2}$ perd ses chiffres significatifs.
:::
:::

:::exercise label="Manipulation 2" title="Archimede : formule stabilisee"
On evite la soustraction instable avec :

\[
1-X=\frac{1-X^2}{1+X},
\qquad
X=\sqrt{1-(2^{-k}y_k)^2}.
\]

On obtient :

\[
y_{k+1}
=
y_k
\sqrt{
\frac{2}
{1+\sqrt{1-(2^{-k}y_k)^2}}
}.
\]

:::rplayground id="tp1-r-archimede-stable" title="Archimede - formule stabilisee"
```r
archimede_naif <- function(K) {
  y <- 2
  if (K == 1) return(y)

  for (k in 1:(K - 1)) {
    y <- 2^k * sqrt(2 * (1 - sqrt(1 - (2^(-k) * y)^2)))
  }
  y
}

archimede_stable <- function(K) {
  y <- 2
  if (K == 1) return(y)

  for (k in 1:(K - 1)) {
    u <- 2^(-k) * y
    y <- y * sqrt(2 / (1 + sqrt(1 - u^2)))
  }
  y
}

K <- 1:100
stable <- sapply(K, archimede_stable)
naif <- sapply(K, archimede_naif)

print(data.frame(
  K = c(20, 50, 100),
  naive = sapply(c(20, 50, 100), archimede_naif),
  stable = sapply(c(20, 50, 100), archimede_stable),
  pi = pi
))

plot(K, abs(stable - pi), type = "l", log = "y",
     col = "darkgreen", lwd = 2,
     xlab = "K", ylab = "Erreur absolue",
     main = "Formule stabilisee")
lines(K, abs(naif - pi), col = "orange", lwd = 2)
legend("bottomleft", legend = c("stable", "naive"),
       col = c("darkgreen", "orange"), lwd = 2)
```
:::

:::block type="remember" title="Conclusion"
Les deux formules sont algebriquement equivalentes. La seconde est pourtant beaucoup plus fiable car elle supprime la soustraction entre deux nombres presque egaux.
:::
:::

:::exercise label="Manipulation 3" title="Calcul de pi par AGM"
On utilise l'approximation asymptotique :

\[
\pi_N=\frac{2\ln(N)\operatorname{agm}(N,4)}{N}.
\]

:::rplayground id="tp1-r-agm" title="AGM - convergence rapide vers pi"
```r
agm <- function(a, b, tol = 1e-15, maxit = 100) {
  for (i in 1:maxit) {
    an <- (a + b) / 2
    bn <- sqrt(a * b)

    if (abs(an - bn) <= tol * max(1, abs(an))) {
      return((an + bn) / 2)
    }

    a <- an
    b <- bn
  }
  (a + b) / 2
}

pi_agm <- function(N) {
  2 * log(N) * agm(N, 4) / N
}

Nvalues <- c(10, 100, 1000, 10000, 1e6)
res <- data.frame(
  N = Nvalues,
  approximation = sapply(Nvalues, pi_agm),
  erreur = abs(sapply(Nvalues, pi_agm) - pi)
)
print(res)

plot(res$N, res$erreur, type = "b", log = "xy",
     xlab = "N", ylab = "|pi_N - pi|",
     main = "Erreur de la formule AGM")
grid()
```
:::

:::block type="method" title="Lecture"
Lorsque $N$ est multiplie par $10$, l'erreur est environ divisee par $100$ dans la zone asymptotique. Le calcul de l'AGM lui-meme converge en tres peu d'iterations grace a la convergence quadratique.
:::
:::
:::

:::section id="tp1-exponentielle" eyebrow="Travail en seance" title="Calcul de e^x par serie" summary="Comprendre pourquoi la serie directe est bonne pour x positif mais dangereuse pour x negatif."

:::exercise label="Manipulation 4" title="Serie directe pour x=20 et x=-20"
On calcule les termes de la serie par recurrence :

\[
t_0=1,
\qquad
t_k=t_{k-1}\frac{x}{k},
\qquad
S_n=\sum_{k=0}^{n}t_k.
\]

:::rplayground id="tp1-r-exp-serie" title="Exponentielle - serie directe"
```r
exp_serie <- function(x, n) {
  terme <- 1
  somme <- 1

  for (k in 1:n) {
    terme <- terme * x / k
    somme <- somme + terme
  }

  somme
}

n <- 60

comparaison <- data.frame(
  x = c(20, -20),
  serie = c(exp_serie(20, n), exp_serie(-20, n)),
  reference = c(exp(20), exp(-20))
)
comparaison$erreur_absolue <- abs(comparaison$serie - comparaison$reference)
comparaison$erreur_relative <- comparaison$erreur_absolue / abs(comparaison$reference)
print(comparaison)

k <- 0:n
termes_m20 <- (-20)^k / factorial(k)
plot(k, termes_m20, type = "h",
     xlab = "k", ylab = "Terme de la serie",
     main = "Termes alternes pour exp(-20)")
abline(h = 0, col = "gray40")
```
:::

:::block type="warning" title="Observation"
Pour $x=20$, les termes sont positifs et le calcul est coherent avec la borne de troncature. Pour $x=-20$, les termes alternent et de grands nombres se compensent pour produire un resultat final tres petit. Les arrondis restants deviennent dominants.
:::
:::

:::exercise label="Manipulation 5" title="Correction par changement de formule"
Pour $x<0$, on calcule :

\[
e^x=\frac{1}{e^{-x}}.
\]

:::rplayground id="tp1-r-exp-stable" title="Exponentielle - version stable"
```r
exp_serie <- function(x, n) {
  terme <- 1
  somme <- 1

  for (k in 1:n) {
    terme <- terme * x / k
    somme <- somme + terme
  }

  somme
}

exp_stable <- function(x, n = 60) {
  if (x >= 0) {
    exp_serie(x, n)
  } else {
    1 / exp_serie(-x, n)
  }
}

print(data.frame(
  x = c(-20, -10, 10, 20),
  serie_directe = sapply(c(-20, -10, 10, 20), exp_serie, n = 60),
  stable = sapply(c(-20, -10, 10, 20), exp_stable, n = 60),
  reference = exp(c(-20, -10, 10, 20))
))
```
:::

:::block type="remember" title="Conclusion"
La correction est simple mais fondamentale : on choisit l'expression qui evite les annulations. La stabilite numerique depend autant de la forme de l'algorithme que de la formule mathematique.
:::
:::
:::

:::section id="tp1-forward-backward" eyebrow="Travail en seance" title="Schemas forward et backward" summary="Observer l'amplification des erreurs dans une recurrence et choisir le sens stable."

:::exercise label="Manipulation 6" title="Forward instable pour a=10"
:::rplayground id="tp1-r-forward" title="Recurrence forward"
```r
forward <- function(a, N) {
  I <- numeric(N + 1)
  I[1] <- log((1 + a) / a)

  for (n in 1:N) {
    I[n + 1] <- 1 / n - a * I[n]
  }

  I
}

I_reference <- function(a, n) {
  integrate(function(x) x^n / (a + x), 0, 1,
            rel.tol = 1e-12)$value
}

a <- 10
N <- 25
Ifwd <- forward(a, N)
Iref <- sapply(0:N, function(n) I_reference(a, n))

print(data.frame(
  n = 0:N,
  I_forward = Ifwd,
  I_reference = Iref,
  erreur = abs(Ifwd - Iref)
))

plot(0:N, abs(Ifwd - Iref), type = "b", log = "y",
     xlab = "n", ylab = "Erreur absolue",
     main = "Forward : amplification des erreurs pour a=10")
grid()
```
:::

:::block type="warning" title="Observation"
Les valeurs devraient rester positives et tendre vers $0$. Le schema forward finit pourtant par produire des valeurs negatives puis tres grandes en valeur absolue, car les erreurs sont multipliees par $a=10$ a chaque pas.
:::
:::

:::exercise label="Manipulation 7" title="Backward stable pour a=10"
:::rplayground id="tp1-r-backward" title="Recurrence backward et strategie stable"
```r
forward <- function(a, N) {
  I <- numeric(N + 1)
  I[1] <- log((1 + a) / a)

  for (n in 1:N) {
    I[n + 1] <- 1 / n - a * I[n]
  }

  I
}

backward <- function(a, m) {
  I <- numeric(m + 1)
  I[m + 1] <- 0

  for (n in m:1) {
    I[n] <- (1 / n - I[n + 1]) / a
  }

  I
}

I_reference <- function(a, n) {
  integrate(function(x) x^n / (a + x), 0, 1,
            rel.tol = 1e-12)$value
}

In_stable <- function(a, N, marge = 30) {
  if (a <= 0) stop("a doit etre strictement positif")

  if (a <= 1) {
    forward(a, N)[N + 1]
  } else {
    m <- N + marge
    backward(a, m)[N + 1]
  }
}

In_stable_tol <- function(a, N, tol = 1e-12) {
  if (a <= 0) stop("a doit etre strictement positif")

  if (a <= 1) return(forward(a, N)[N + 1])

  m <- max(N + 1, 2)
  borne <- 1 / (a^(m - N + 1) * (m + 1))

  while (borne > tol) {
    m <- m + 1
    borne <- 1 / (a^(m - N + 1) * (m + 1))
  }

  backward(a, m)[N + 1]
}

a <- 10
m <- 30
Ibwd <- backward(a, m)

print(data.frame(
  n = 0:15,
  backward = Ibwd[1:16],
  reference = sapply(0:15, function(n) I_reference(a, n))
))

N <- 0:25
stable <- sapply(N, function(n) In_stable_tol(10, n))
ref <- sapply(N, function(n) I_reference(10, n))

plot(N, abs(stable - ref), type = "b", log = "y",
     xlab = "n", ylab = "Erreur absolue",
     main = "Backward : erreur attenuee")
grid()
```
:::

:::block type="method" title="Algorithme stable"
Le bon sens de recurrence depend de $a$ :

\[
\begin{cases}
0<a\le1 :& \text{forward},\\
a>1 :& \text{backward}.
\end{cases}
\]

On choisit le sens qui multiplie les erreurs par un facteur strictement inferieur a $1$.
:::
:::
:::

:::section id="tp1-synthese" eyebrow="Synthese" title="Ce qu'il faut retenir" summary="Les messages numeriques communs aux trois experiences."

:::block type="remember" title="Principes de stabilite numerique"
1. Une formule mathematiquement correcte peut etre mauvaise en machine.
2. Les soustractions entre nombres presque egaux sont dangereuses.
3. Un changement algebrique simple peut supprimer une annulation catastrophique.
4. Une recurrence doit etre utilisee dans le sens qui attenue les erreurs.
5. Une borne de troncature ne suffit pas : il faut aussi regarder les erreurs d'arrondi.
:::
:::
