---
title: reseau - Revision ESISAR
subject: reseau
type: course
---

:::section id="reseau-intro" eyebrow="IN363" title="Cours reseaux" summary="Cette page reprend le support pdf/reseau/cours/IN363_Reseau_3app_V4_2.pdf : bases de calcul, modele OSI, couches basses, Ethernet, adressage IP, protocoles de resolution, transport TCP/UDP et premiers protocoles applicatifs."
:::dashboard
:::card class="progress-card" kicker="Objectif" title="IN363"
Comprendre comment une donnee devient une trame, traverse un reseau, puis remonte vers une application.
:::

:::card class="priority-card" kicker="Priorites de revision"
1.  Revoir les conversions binaire, decimal et hexadecimal.
2.  Savoir replacer MAC, IP, TCP/UDP, ARP et HTTP dans les bonnes couches.
3.  Lire une trame Ethernet et identifier source, destination, donnees et controle.
4.  Calculer reseau, hote et masque par operation ET binaire.
:::
:::

:::quicklinks
- [Bases](#reseau-bases)
- [OSI](#reseau-osi)
- [Couche 1](#reseau-couche1)
- [Couche 2](#reseau-couche2)
- [Couche 3](#reseau-couche3)
- [Transport](#reseau-transport)
- [Fiche finale](#reseau-revision)
- [PDF](#reseau-pdfs)
:::

:::figure src="assets/reseau/pile-reseau.svg" alt="Pile reseau simplifiee : application, transport, IP, Ethernet et physique." caption="Reflexe central : chaque couche ajoute ou interprete une information differente autour des donnees utiles." label="Synthese de la pile reseau IN363"

:::
:::

:::section id="reseau-bases" eyebrow="Prelude" title="Calcul en bases 2, 10 et 16" summary="Le numerique manipule des bits. L'hexadecimal sert de notation compacte : un chiffre hexa represente exactement 4 bits."
:::grid variant="two-col"
:::block type="definition" title="Correspondances utiles"
*   Base 2 : chiffres \(0\) et \(1\), poids \(2^n\).
*   Base 10 : chiffres \(0\) a \(9\), poids \(10^n\).
*   Base 16 : chiffres \(0\) a \(9\), puis \(A=10\) a \(F=15\).
*   Un octet vaut 8 bits, donc 2 chiffres hexadecimaux.
:::

:::block type="method" title="Methode de conversion"
1.  Pour decimal vers binaire : decomposer en puissances de 2 ou diviser successivement par 2.
2.  Pour binaire vers decimal : sommer les bits actifs avec leur poids.
3.  Pour binaire vers hexa : grouper les bits par paquets de 4 depuis la droite.
4.  Pour hexa vers binaire : remplacer chaque chiffre par son quartet de bits.
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="Exemples du cours"
*   \(17_{10}=10001_2=11_{16}\).
*   \(1A_{16}=26_{10}=00011010_2\).
*   \(10001101_2=8D_{16}=141_{10}\).
:::

:::block type="remember" title="Pourquoi c'est partout"
Les adresses MAC, IPv6, champs de trames et captures Wireshark sont souvent lus en hexadecimal. Savoir repasser aux bits permet de verifier masques, tailles et controles.
:::
:::
:::

:::section id="reseau-osi" eyebrow="Chapitre 1" title="Modele OSI" summary="Le modele OSI separe une communication en couches. Le cours insiste surtout sur les couches basses, celles qui rendent le transfert possible."
:::grid variant="two-col"
:::block type="definition" title="Lecture par couches"
*   Couche 1 : support physique et signaux.
*   Couche 2 : liaison locale, adresses MAC et trames.
*   Couche 3 : reseau, adressage IP et acheminement.
*   Couche 4 : transport, fiabilite ou rapidite selon TCP/UDP.
*   Couches hautes : session, presentation, application.
:::

:::block type="method" title="Encapsulation"
Une application produit une donnee. En descendant la pile, chaque couche ajoute son en-tete : segment TCP/UDP, paquet IP, trame Ethernet, puis signal physique.

En reception, les couches retirent et interpretent ces informations dans l'ordre inverse.
:::
:::
:::

:::section id="reseau-couche1" eyebrow="Chapitre 2" title="Couche 1 et niveau 1.5" summary="La couche physique transporte des bits sur cuivre, fibre optique ou ondes radio. Le support ajoute un niveau pratique sur compression et verification."
:::grid variant="two-col"
:::block type="definition" title="Supports physiques"
*   Cuivre : paire torsadee, connecteur RJ45, signaux electriques.
*   Fibre : impulsions lumineuses emises par diode et recues par photodiode.
*   Air : Wi-Fi, 4G et propagation d'ondes.
*   Cables sous-marins : support essentiel des transferts intercontinentaux.
:::

:::block type="theorem" title="Compression"
*   Sans perte : les donnees initiales sont reconstruisibles exactement.
*   Avec perte : une partie de l'information est supprimee pour gagner en taille.
*   LZ78 construit un dictionnaire de motifs deja vus et remplace des repetitions par des references.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Verification d'erreur"
*   Un checksum ou CRC detecte qu'une trame a probablement ete alteree.
*   La detection signale un probleme, elle ne corrige pas toujours la donnee.
*   Le FCS Ethernet en fin de trame joue ce role de controle.
:::

:::block type="remember" title="Hamming 7,4"
Le codage Hamming 7,4 envoie 4 bits utiles et 3 bits de controle. Le syndrome indique la position d'un bit errone, ce qui permet de corriger une erreur simple.
:::
:::

:::block type="neutral" title="Exemple a la main : Hamming 7,4"
On code le mot utile \(1011\) avec une parite paire. Les positions \(1\), \(2\) et \(4\) portent les bits de controle ; les positions \(3\), \(5\), \(6\), \(7\) portent les donnees.

Position

1

2

3

4

5

6

7

Role

\(p_1\)

\(p_2\)

\(d_1\)

\(p_4\)

\(d_2\)

\(d_3\)

\(d_4\)

Valeur

0

1

1

0

0

1

1

1.  Placer les donnees : \(d_1=1\), \(d_2=0\), \(d_3=1\), \(d_4=1\), donc les cases \(3,5,6,7\) valent \(1,0,1,1\).
2.  Calculer \(p_1\) sur les positions \(1,3,5,7\) : pour que \(p_1,1,0,1\) ait une parite paire, il faut \(p_1=0\).
3.  Calculer \(p_2\) sur les positions \(2,3,6,7\) : pour que \(p_2,1,1,1\) ait une parite paire, il faut \(p_2=1\).
4.  Calculer \(p_4\) sur les positions \(4,5,6,7\) : pour que \(p_4,0,1,1\) ait une parite paire, il faut \(p_4=0\).
5.  Le mot transmis est donc \(0110011\).

Si le recepteur lit \(0110111\), les tests donnent \(s_1=1\), \(s_2=0\), \(s_4=1\). Le syndrome \(s_4s_2s_1=101_2=5\) designe la position 5 : on inverse ce bit et on retrouve \(0110011\).
:::

:::grid variant="two-col"
:::block type="method" title="Exemple a la main : Huffman"
On veut coder 10 symboles avec les frequences \(A:6\), \(B:2\), \(C:1\), \(D:1\).

1.  Trier les poids : \(C=1\), \(D=1\), \(B=2\), \(A=6\).
2.  Fusionner les deux plus petits : \(C+D=2\).
3.  Fusionner \(B=2\) avec \((C,D)=2\) : on obtient un bloc de poids 4.
4.  Fusionner ce bloc avec \(A=6\) : l'arbre est termine.
5.  En mettant 0 a gauche et 1 a droite, un code possible est \(A=0\), \(B=10\), \(C=110\), \(D=111\).

Pour \(AAAAAABBCD\), on obtient \(0000001010110111\), soit 16 bits. Avec un code fixe sur 4 symboles, il faudrait \(10\times2=20\) bits.
:::

:::block type="theorem" title="Exemple a la main : LZ78"
On compresse \(ABABABA\). Le dictionnaire commence vide ; chaque sortie est un couple \((index, symbole)\), ou \(index=0\) designe le mot vide.

Lecture

Sortie

Nouvelle entree

\(A\)

\((0,A)\)

1 : \(A\)

\(B\)

\((0,B)\)

2 : \(B\)

\(AB\)

\((1,B)\)

3 : \(AB\)

\(ABA\)

\((3,A)\)

4 : \(ABA\)

La sortie compressee est donc \((0,A),(0,B),(1,B),(3,A)\). Pour decoder, on reconstruit le meme dictionnaire dans le meme ordre.
:::
:::
:::

:::section id="reseau-couche2" eyebrow="Chapitre 2" title="Couche 2 : MAC, Ethernet et trames" summary="La couche liaison gere la communication locale. Elle s'appuie sur les adresses MAC et sur le format de trame Ethernet."
:::grid variant="two-col"
:::block type="definition" title="Adresse MAC"
*   Adresse physique d'une interface reseau, differente d'une adresse IP.
*   Longueur : 6 octets, souvent notes en hexadecimal.
*   Les 3 premiers octets identifient le constructeur, les 3 suivants l'interface.
*   Elle peut parfois etre modifiee logiciellement, avec risque de refus sur certains reseaux.
:::

:::block type="theorem" title="Trame Ethernet"
*   Debut : adresse MAC destination puis adresse MAC source.
*   Donnees : charge utile, eventuellement completee par du bourrage.
*   Fin : FCS, controle d'erreur base sur un CRC.
*   Wireshark permet d'observer ces champs dans des captures reelles.
:::
:::

:::block type="method" title="Lire une trame en revision"
1.  Prendre les 6 premiers octets : MAC destinataire.
2.  Prendre les 6 octets suivants : MAC source.
3.  Identifier le type ou la longueur selon la trame.
4.  Regarder la charge utile, puis verifier la presence du controle FCS.
:::
:::

:::section id="reseau-couche3" eyebrow="Chapitre 3" title="Couche 3 : reseaux, IP et resolution" summary="La couche reseau adresse les machines et choisit comment joindre un autre reseau. IP livre des paquets sans connexion et sans garantie absolue."
:::grid variant="two-col"
:::block type="definition" title="Types et topologies"
*   LAN : reseau local, maison, salle, batiment ou entreprise.
*   VLAN : regroupement logique independant de la position physique.
*   MAN : reseau a l'echelle d'une ville ou d'un campus.
*   WAN : reseau etendu, jusqu'a Internet.
*   Topologies : etoile, bus, anneau, maille.
:::

:::block type="theorem" title="IPv4 et masques"
*   IPv4 : 4 octets, par exemple \(192.168.1.2\).
*   Le masque separe partie reseau et partie hote.
*   Bits du masque a 1 : partie reseau.
*   Bits du masque a 0 : partie machine.
*   Adresse reseau : \(IP \\; ET \\; masque\).
:::
:::

:::grid variant="two-col"
:::block type="method" title="Exemple masque"
Avec \(192.168.1.2\) et \(255.255.255.0\), les 24 premiers bits sont le reseau.

reseau = 192.168.1.0

hote = 0.0.0.2
:::

:::block type="remember" title="IPv6"
IPv6 repond a la limite d'adresses IPv4. L'adresse passe a 16 octets et s'ecrit en groupes hexadecimaux separes par des deux-points.
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="ARP et RARP"
*   ARP retrouve une adresse MAC a partir d'une adresse IP sur le reseau local.
*   La requete ARP est diffusee ; la machine visee repond avec sa MAC.
*   RARP fait l'inverse pour une machine qui connait sa MAC mais pas son IP.
:::

:::block type="method" title="BOOTP et DHCP"
*   BOOTP fournit des informations de demarrage via UDP/IP.
*   DHCP attribue dynamiquement une adresse IP pour une duree negociee.
*   DHCP peut aussi transmettre routeur, serveur et options reseau.
:::
:::
:::

:::section id="reseau-transport" eyebrow="Couches 4 et 5" title="TCP, UDP, ICMP et HTTP" summary="IP ne garantit pas l'arrivee parfaite des paquets. La couche transport choisit entre fiabilite forte et simplicite rapide."
:::grid variant="two-col"
:::block type="theorem" title="TCP"
*   Connexion de bout en bout, full duplex et orientee flux d'octets.
*   Acquittement positif avec retransmission en cas de perte.
*   Fenetre d'emission pour envoyer plusieurs donnees avant les ACK.
*   Connexion par triple poignee de mains : SYN, SYN-ACK, ACK.
:::

:::block type="definition" title="UDP"
*   Protocole simple, sans synchronisation forte.
*   Envoie un datagramme et ne gere pas la retransmission.
*   Adapte au streaming, a la voix sur IP et aux usages tolerants aux pertes.
*   TCP est prefere pour mail, transfert de fichier et donnees critiques.
:::
:::

:::grid variant="two-col"
:::block type="warning" title="ICMP"
ICMP signale des erreurs IP : port inaccessible, TTL expire, machine ou route indisponible. Il informe l'emetteur mais ne corrige pas le probleme.
:::

:::block type="remember" title="HTTP"
*   Protocole applicatif interprete par le navigateur.
*   Port standard : TCP 80, meme si d'autres ports sont possibles.
*   Une URL contient protocole, serveur et chemin de ressource.
*   Methodes classiques : GET, HEAD, POST.
:::
:::
:::

:::section id="reseau-revision" eyebrow="Revision" title="Fiche de revision finale : reseaux et codage de l'information" summary="Les notions essentielles a revoir avant l'evaluation, avec les points pratiques a savoir refaire a la main."
:::grid variant="two-col"
:::block type="definition" title="Bloc 1 : representation et encodage physique"
*   **Binaire base 2** : langage natif de la machine, avec seulement \(0\) et \(1\).
*   **Decimal base 10** : systeme classique utilise au quotidien.
*   **Hexadecimal base 16** : chiffres de 0 a 9 puis A a F. Un chiffre hexadecimal vaut 4 bits ; on l'utilise pour raccourcir le binaire, notamment dans les adresses MAC et IPv6.
*   **NRZ** : un \(1\) est code par une tension haute, un \(0\) par une tension basse. Probleme : une longue suite de \(0\) ou de \(1\) peut faire perdre la synchronisation au recepteur.
*   **Manchester** : le signal change d'etat au milieu de chaque bit. Exemple : front montant = \(1\), front descendant = \(0\). Cette transition rend le signal auto-synchronisant.
:::

:::block type="method" title="Bloc 2 : controle d'erreur"
*   **Bit de parite** : on ajoute un bit pour que le nombre total de \(1\) soit pair en parite paire.
*   **Philosophie** : il detecte une erreur simple, mais ne permet pas de la corriger.
*   **Hamming 7,4 \[PRATIQUE\]** : 4 bits de donnees et 3 bits de controle places sur les positions puissances de 2.
*   **A savoir faire** : calculer les parites croisees, extraire le syndrome, trouver la position de l'erreur, puis inverser le bit pour corriger le message.
:::
:::

:::grid variant="two-col"
:::block type="theorem" title="Bloc 2 : compression de donnees"
*   **Sans perte** : ZIP ou texte. Apres decompression, on retrouve le fichier original au bit pres.
*   **Avec perte** : JPEG ou MP3. On supprime des donnees peu perceptibles par l'humain ; le fichier original exact ne peut pas etre retrouve.
*   **Huffman \[PRATIQUE\]** : arbre binaire base sur les statistiques. Les symboles les plus frequents recoivent les codes binaires les plus courts.
*   **A savoir faire pour Huffman** : compter les frequences, fusionner les plus petites valeurs pour construire l'arbre, puis lire les codes avec \(0\) a gauche et \(1\) a droite.
*   **LZ78 \[PRATIQUE\]** : compression par dictionnaire dynamique. Les suites de caracteres repetees sont ajoutees au dictionnaire au fur et a mesure.
*   **A savoir faire pour LZ78** : lire la chaine, creer les entrees du dictionnaire, puis produire les couples \((index_du_prefixe, nouveau_caractere)\).
:::

:::block type="definition" title="Bloc 3 : architecture des reseaux"
*   **Modele OSI** : 7 couches, dans l'ordre physique, liaison, reseau, transport, session, presentation, application.
*   **Topologie etoile** : toutes les machines sont reliees a un equipement central, souvent un switch. C'est la norme actuelle.
*   **Bus, anneau, maillee** : autres formes historiques ou specifiques.
*   **Adresse MAC** : couche 2 liaison. Adresse physique unique de la carte reseau, par exemple `00:1A:2B:3C:4D:5E`. Elle sert a communiquer sur le reseau local.
*   **Adresse IP** : couche 3 reseau. Adresse logique, par exemple `192.168.1.15`. Elle sert au routage sur Internet ou entre reseaux.
*   **Masque de sous-reseau** : il separe la partie reseau et la partie hote de l'adresse IP. Exemple : `255.255.255.0`.
:::
:::

:::grid variant="two-col"
:::block type="method" title="Bloc 3 : decouverte d'un reseau [PRATIQUE]"
*   **Objectif** : identifier les machines presentes sur un reseau local.
*   **Ping** : verifier si une machine repond.
*   **ARP** : trouver l'adresse MAC associee a une adresse IP sur le reseau local.
*   **Scanner reseau ou ports** : utiliser un outil comme `nmap` pour reperer des hotes ou des services ouverts.
:::

:::block type="remember" title="Bloc 4 : TCP three-way handshake [PRATIQUE]"
TCP, en couche 4, est fiable. Avant l'envoi de donnees, il etablit une connexion propre entre client et serveur en trois etapes.

1.  **SYN** : le client demande l'ouverture de connexion et envoie son numero de sequence de depart.
2.  **SYN-ACK** : le serveur acquitte la demande du client et envoie son propre numero de sequence.
3.  **ACK** : le client confirme la reponse du serveur. La connexion est ouverte.

Apres ce handshake, les donnees applicatives comme HTTP ou FTP peuvent commencer a circuler.
:::
:::
:::

:::section id="reseau-pdfs" eyebrow="Support" title="PDF original" summary="Le support ajoute dans pdf/reseau/cours reste accessible directement."
:::dashboard
:::card class="chapter-card" pill="IN363" title="Cours reseaux" href="pdf/reseau/cours/IN363_Reseau_3app_V4_2.pdf" link="Ouvrir le PDF"
Support complet : OSI, couches basses, Ethernet, IP, ARP, TCP/UDP, ICMP et HTTP.
:::
:::
:::
