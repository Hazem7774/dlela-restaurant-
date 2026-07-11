EDLALA — الدلالة — SITE STATIQUE
=================================

Ce site est 100% HTML/CSS/JS. Aucun serveur Python/Flask requis.
Compatible avec l'hébergement Ooredoo (ou n'importe quel hébergement
statique classique).


1. STRUCTURE DES FICHIERS
--------------------------
edlala/
├── index.html          <- la page du site (tout est dedans)
├── css/style.css        <- les couleurs, polices, mise en page
├── js/script.js          <- le menu, la galerie, le formulaire de réservation
└── images/               <- VOS PHOTOS vont ici


2. AJOUTER VOS VRAIES PHOTOS
------------------------------
Le site est déjà prêt à afficher vos photos. Il vous suffit de déposer
vos fichiers dans le dossier /images en respectant EXACTEMENT ces noms :

  images/hero.jpg          -> grande photo d'accueil (poisson, étal, plat...)
  images/interieur.jpg     -> photo de la salle ou de la poissonnerie
  images/galerie-1.jpg     -> photo galerie (plateau de fruits de mer)
  images/galerie-2.jpg     -> photo galerie (poisson grillé)
  images/galerie-3.jpg     -> photo galerie (étal du jour)
  images/galerie-4.jpg     -> photo galerie (salle du restaurant)
  images/galerie-5.jpg     -> photo galerie (crevettes grillées)
  images/galerie-6.jpg     -> photo galerie (terrasse)

Tant qu'une photo n'est pas encore ajoutée, le site affiche
automatiquement un espace réservé bleu avec le nom du fichier attendu
— ce n'est pas un bug, c'est voulu, ça vous montre ce qu'il manque.
Dès que vous ajoutez le bon fichier, l'espace réservé disparaît tout
seul (pas besoin de toucher au code).

Conseil : compressez vos photos avant de les envoyer (max ~500 Ko
chacune) pour que le site reste rapide. Des outils gratuits comme
tinypng.com ou squoosh.app font ça en 10 secondes.

Vous pouvez aussi m'envoyer les photos directement ici dans la
conversation et je les intègre pour vous.


3. MODIFIER LE MENU / LES PRIX
--------------------------------
Ouvrez js/script.js avec un éditeur de texte (Bloc-notes, VS Code...)
et cherchez le bloc "const MENU = {". Chaque plat ressemble à ça :

  { name:'Loup de mer grillé', desc:'Poisson entier grillé...', price:'Selon poids' },

Modifiez le texte entre guillemets ('...') : nom, description, prix.
Les prix actuels sont indicatifs — à ajuster avec vos vrais tarifs.


4. LE FORMULAIRE DE RÉSERVATION
----------------------------------
Comme il n'y a pas de serveur, les réservations partent directement
vers WhatsApp avec le message déjà rempli, prêt à envoyer au numéro
25 035 034. C'est fiable à 100% et ne dépend d'aucun hébergement.

Si vous changez de numéro, ouvrez js/script.js et modifiez la ligne :
  const RESTAURANT_WHATSAPP = '21625035034';
(format : indicatif pays + numéro, sans le +)


5. METTRE LE SITE EN LIGNE SUR OOREDOO
------------------------------------------
1. Connectez-vous à votre espace d'hébergement Ooredoo (cPanel ou
   gestionnaire de fichiers).
2. Allez dans le dossier public_html (ou www / htdocs selon l'offre).
3. Uploadez TOUT le contenu du dossier edlala/ (pas le dossier
   lui-même, son contenu : index.html, css/, js/, images/).
4. Vérifiez que index.html est bien à la racine.
5. Ouvrez votre nom de domaine dans un navigateur — le site est en
   ligne, sans configuration supplémentaire.


6. À FAIRE ENSUITE
---------------------
- Ajouter vos vraies photos (voir point 2)
- Vérifier/ajuster les prix du menu (voir point 3)
- Vérifier les horaires d'ouverture dans la section Contact
  (index.html, cherchez "Horaires")
