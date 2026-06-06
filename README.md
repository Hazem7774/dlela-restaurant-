# 🐟 Edlala — الدلالة | Site Web Flask Complet

Poissonnerie & Restaurant · Mrezga, Nabeul 8050, Tunisie

---

## 🚀 Installation rapide

```bash
# 1. Installer les dépendances
pip install -r requirements.txt

# 2. Lancer
python app.py
```

Ouvrir : http://localhost:5000

---

## 🔑 Accès Admin

URL : http://localhost:5000/admin/login
Mot de passe : **edlala2025**

> ⚠️ Changez le mot de passe en production dans app.py :
> ```python
> ADMIN_PASS_HASH = hashlib.sha256(b"VOTRE_MOT_DE_PASSE").hexdigest()
> ```

---

## 📄 Pages du site

| URL | Description |
|-----|-------------|
| `/` | Page d'accueil |
| `/menu` | Menu complet avec filtres par catégorie |
| `/galerie` | Galerie photos avec lightbox |
| `/reservation` | Formulaire de réservation |
| `/admin/login` | Connexion admin |
| `/admin` | Dashboard (stats + réservations récentes) |
| `/admin/galerie` | Gestion des photos |
| `/admin/menu` | Gestion des plats et prix |
| `/admin/reservations` | Gestion des réservations |

---

## 📁 Structure

```
edlala/
├── app.py                    # Application Flask principale
├── requirements.txt
├── data/
│   ├── gallery.json          # Photos de la galerie
│   ├── menu.json             # Plats du menu
│   └── reservations.json     # Réservations clients
├── static/
│   ├── images/logo.png       # Logo Edlala
│   └── uploads/
│       ├── original/         # Photos originales
│       └── thumbs/           # Miniatures optimisées
└── templates/
    ├── base.html             # Template de base (nav + footer)
    ├── index.html            # Accueil
    ├── menu.html             # Menu public
    ├── galerie.html          # Galerie publique
    ├── reservation.html      # Formulaire réservation
    ├── reservation_confirm.html
    ├── admin_login.html      # Connexion admin
    ├── admin_dashboard.html  # Dashboard
    ├── admin_galerie.html    # Gestion galerie
    ├── admin_menu.html       # Gestion menu
    └── admin_reservations.html
```

---

## ✏️ Modifier les informations

Toutes les infos du restaurant sont dans `templates/base.html` et `templates/index.html` :
- Téléphone, adresse, horaires, liens réseaux sociaux

---

## 🌐 Déploiement en ligne (gratuit)

### Option A — Render.com
```bash
# Créer un fichier Procfile
echo "web: gunicorn app:app" > Procfile
pip install gunicorn
# Pousser sur GitHub → connecter à Render
```

### Option B — PythonAnywhere
1. Uploader le dossier
2. Configurer une Web App Flask
3. Pointer vers `app.py`

---

## 📞 Contact
Edlala · 25 035 034 · CMF8+M9 Mrezga, Nabeul 8050, Tunisie
