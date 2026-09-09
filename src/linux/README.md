# Image Linux des laboratoires IN333

Les deux archives gzip sont des entrées de build figées, pas des snapshots de
mémoire v86. `src/build/build-linux.js` les décompresse et applique les correctifs.
Le build fonctionne sans téléchargement réseau et écrit les ressources dans
`out/vendor/v86/<empreinte>/`, puis `out/linux/manifest.json`.

Sources récupérées le 9 septembre 2026 :

- `arch-fs.json.gz` : https://i.copy.sh/fs.json (version de format 3,
  Last-Modified 22 octobre 2024). L’index conserve les noms de fichiers distants.
- `arch-initramfs.img.gz` : https://i.copy.sh/arch/84b4903a.bin
  (`/boot/initramfs-linux.img` dans cet index), archive cpio newc non compressée
  avant empaquetage gzip pour le dépôt.
- BIOS : commit v86 `d96be774e549a83371b038b86e819804c96b921f`, chemins
  `bios/seabios.bin` et `bios/vgabios.bin`. Chargés à la demande et mis en cache.
- Runtime : version installée par `package-lock.json`.

L’image et ses logiciels proviennent du projet v86 / Arch Linux et conservent
leurs licences respectives (notamment Linux et les composants GNU sous GPL).
Sources de construction amont : https://github.com/copy/v86/tree/master/tools
et https://github.com/copy/v86 ; sources des paquets Arch :
https://gitlab.archlinux.org/archlinux/packaging/packages.

## Correctifs appliqués

1. Dans l’initramfs, ne pas appeler `fsck_root` si la racine est `host9p` :
   c’est un système de fichiers 9p, pas un périphérique bloc. Le paramètre
   `fsck.mode=skip` seul ne suffit pas dans cette version : la vérification
   d’existence du périphérique précède ce paramètre dans `fsck_device`.
2. Ajouter `/etc/openrc/inittab.d`, chemin compilé dans `init-openrc`.
3. Retirer le script orphelin `/etc/openrc/init.d/syslog-ng` : le service n’est
   pas activé dans l’image et sa configuration est absente, mais OpenRC exécute
   sa fonction de dépendances au démarrage.
4. Injecter un `fstab` 9p avec passe fsck à zéro et un `.bashrc` émettant un
   marqueur de disponibilité sur le port série. Injection avant `emulator.run()`.

Le noyau reste celui référencé par l’index figé. Les messages normaux d’OpenRC
restent visibles : les erreurs ne sont pas masquées par un filtre d’affichage.
L’empreinte inclut le runtime, l’image préparée, les correctifs et le Service
Worker. Modifier l’un de ces éléments produit de nouvelles URL au build.

## Mettre à jour l’image

Récupérer ensemble l’index et l’initramfs qu’il référence, conserver leurs
sommes SHA-256, et empaqueter avec gzip déterministe (mtime=0). Revoir les
correctifs, puis tester le démarrage, GCC, fork/exec/wait et SIGINT. Ne pas
remplacer uniquement le noyau, l’index ou l’initramfs d’un ensemble validé.

## Sommes SHA-256 des sources décompressées

```text
a96773632a9f9bb5b8efb9724da24419fe72f5130d0b17857a5dc5f4d7f72035  arch-fs.json
84b4903a92b0932a79add28d07bdc35494cdd7684be70ffb3f6ec84ee79feec1  arch-initramfs.img
```
