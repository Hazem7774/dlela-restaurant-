"""
Edlala — الدلالة  |  Application Flask complète
Poissonnerie & Restaurant · Mrezga, Nabeul, Tunisie
"""

import os, json, uuid, hashlib, secrets
from flask import (Flask, render_template, request, redirect,
                   url_for, flash, jsonify, session, abort)
from werkzeug.utils import secure_filename
from PIL import Image
from functools import wraps
from datetime import datetime

# ── Config ────────────────────────────────────────────────────────────────────
BASE        = os.path.dirname(os.path.abspath(__file__))
UPLOAD_DIR  = os.path.join(BASE, "static", "uploads")
DATA_DIR    = os.path.join(BASE, "data")
ALLOWED_EXT = {"png", "jpg", "jpeg", "webp", "gif"}

app = Flask(__name__)
app.secret_key = secrets.token_hex(32)          # change en prod
app.config["MAX_CONTENT_LENGTH"] = 8 * 1024 * 1024

# Mot de passe admin (hash sha256 de "edlala2025")
ADMIN_PASS_HASH = hashlib.sha256(b"edlala2025").hexdigest()

# ── Helpers fichiers ──────────────────────────────────────────────────────────
def allowed(f): return "." in f and f.rsplit(".",1)[1].lower() in ALLOWED_EXT

def jload(name, default=None):
    p = os.path.join(DATA_DIR, name)
    if not os.path.exists(p): return default if default is not None else []
    with open(p, encoding="utf-8") as f: return json.load(f)

def jsave(name, data):
    os.makedirs(DATA_DIR, exist_ok=True)
    with open(os.path.join(DATA_DIR, name), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def make_thumb(src, size=(640, 480)):
    td = os.path.join(UPLOAD_DIR, "thumbs")
    os.makedirs(td, exist_ok=True)
    name = os.path.basename(src)
    dst  = os.path.join(td, name)
    with Image.open(src) as img:
        img = img.convert("RGB")
        img.thumbnail(size, Image.LANCZOS)
        img.save(dst, "JPEG", quality=85, optimize=True)
    return name

# ── Auth decorator ────────────────────────────────────────────────────────────
def login_required(f):
    @wraps(f)
    def decorated(*a, **kw):
        if not session.get("admin"):
            return redirect(url_for("admin_login"))
        return f(*a, **kw)
    return decorated

# ══════════════════════════════════════════════════════════════════════════════
#  ROUTES PUBLIQUES
# ══════════════════════════════════════════════════════════════════════════════

@app.route("/")
def index():
    photos = jload("gallery.json")[:8]
    menu   = jload("menu.json")
    return render_template("index.html", photos=photos, menu=menu)

@app.route("/galerie")
def galerie():
    photos = jload("gallery.json")
    cats   = sorted({p.get("category","Général") for p in photos})
    return render_template("galerie.html", photos=photos, categories=cats)

@app.route("/menu")
def menu():
    items = jload("menu.json")
    cats  = []
    seen  = set()
    for it in items:
        c = it.get("category","Plats")
        if c not in seen: cats.append(c); seen.add(c)
    return render_template("menu.html", items=items, categories=cats)

@app.route("/reservation", methods=["GET","POST"])
def reservation():
    if request.method == "POST":
        resa = {
            "id":        str(uuid.uuid4())[:8].upper(),
            "nom":       request.form.get("nom","").strip(),
            "tel":       request.form.get("tel","").strip(),
            "email":     request.form.get("email","").strip(),
            "date":      request.form.get("date","").strip(),
            "heure":     request.form.get("heure","").strip(),
            "personnes": request.form.get("personnes","2").strip(),
            "message":   request.form.get("message","").strip(),
            "statut":    "en attente",
            "created":   datetime.now().strftime("%Y-%m-%d %H:%M"),
        }
        if not resa["nom"] or not resa["tel"] or not resa["date"]:
            flash("Veuillez remplir tous les champs obligatoires.", "error")
            return render_template("reservation.html", form=request.form)
        resas = jload("reservations.json")
        resas.append(resa)
        jsave("reservations.json", resas)
        return render_template("reservation_confirm.html", resa=resa)
    return render_template("reservation.html", form={})

# ══════════════════════════════════════════════════════════════════════════════
#  AUTH ADMIN
# ══════════════════════════════════════════════════════════════════════════════

@app.route("/admin/login", methods=["GET","POST"])
def admin_login():
    if session.get("admin"): return redirect(url_for("admin_dashboard"))
    if request.method == "POST":
        pwd  = request.form.get("password","")
        h    = hashlib.sha256(pwd.encode()).hexdigest()
        if h == ADMIN_PASS_HASH:
            session["admin"] = True
            flash("Bienvenue dans l'espace admin !", "success")
            return redirect(url_for("admin_dashboard"))
        flash("Mot de passe incorrect.", "error")
    return render_template("admin_login.html")

@app.route("/admin/logout")
def admin_logout():
    session.pop("admin", None)
    return redirect(url_for("index"))

# ══════════════════════════════════════════════════════════════════════════════
#  ADMIN — DASHBOARD
# ══════════════════════════════════════════════════════════════════════════════

@app.route("/admin")
@login_required
def admin_dashboard():
    photos = jload("gallery.json")
    menu   = jload("menu.json")
    resas  = jload("reservations.json")
    nb_pending = sum(1 for r in resas if r.get("statut") == "en attente")
    return render_template("admin_dashboard.html",
        nb_photos=len(photos),
        nb_menu=len(menu),
        nb_resas=len(resas),
        nb_pending=nb_pending,
        resas=resas[-10:][::-1]
    )

# ══════════════════════════════════════════════════════════════════════════════
#  ADMIN — GALERIE
# ══════════════════════════════════════════════════════════════════════════════

@app.route("/admin/galerie")
@login_required
def admin_galerie():
    return render_template("admin_galerie.html", photos=jload("gallery.json"))

@app.route("/admin/upload", methods=["POST"])
@login_required
def upload_photo():
    f = request.files.get("photo")
    if not f or f.filename == "":
        flash("Aucun fichier.", "error"); return redirect(url_for("admin_galerie"))
    if not allowed(f.filename):
        flash("Format non supporté.", "error"); return redirect(url_for("admin_galerie"))

    ext   = f.filename.rsplit(".",1)[1].lower()
    uid   = str(uuid.uuid4())[:8]
    fname = secure_filename(f"{uid}.{ext}")
    orig  = os.path.join(UPLOAD_DIR, "original")
    os.makedirs(orig, exist_ok=True)
    path  = os.path.join(orig, fname)
    f.save(path)
    thumb = make_thumb(path)

    gallery = jload("gallery.json")
    gallery.append({
        "id": uid, "filename": fname, "thumb": thumb,
        "title":       request.form.get("title","").strip() or "Sans titre",
        "category":    request.form.get("category","Général").strip(),
        "price":       request.form.get("price","").strip(),
        "description": request.form.get("description","").strip(),
        "order":       len(gallery),
    })
    jsave("gallery.json", gallery)
    flash("Photo ajoutée !", "success")
    return redirect(url_for("admin_galerie"))

@app.route("/admin/photo/update/<uid>", methods=["POST"])
@login_required
def update_photo(uid):
    gallery = jload("gallery.json")
    for p in gallery:
        if p["id"] == uid:
            p["title"]       = request.form.get("title", p["title"]).strip()
            p["price"]       = request.form.get("price", p.get("price","")).strip()
            p["description"] = request.form.get("description", p.get("description","")).strip()
            p["category"]    = request.form.get("category", p["category"]).strip()
            break
    jsave("gallery.json", gallery)
    return jsonify({"ok": True})

@app.route("/admin/photo/delete/<uid>", methods=["POST"])
@login_required
def delete_photo(uid):
    gallery = jload("gallery.json")
    p = next((x for x in gallery if x["id"]==uid), None)
    if p:
        for folder in ("original","thumbs"):
            fp = os.path.join(UPLOAD_DIR, folder, p["filename"])
            if os.path.exists(fp): os.remove(fp)
        jsave("gallery.json", [x for x in gallery if x["id"] != uid])
    return jsonify({"ok": True})

# ══════════════════════════════════════════════════════════════════════════════
#  ADMIN — MENU
# ══════════════════════════════════════════════════════════════════════════════

@app.route("/admin/menu")
@login_required
def admin_menu():
    return render_template("admin_menu.html", items=jload("menu.json"))

@app.route("/admin/menu/add", methods=["POST"])
@login_required
def add_menu_item():
    items = jload("menu.json")
    items.append({
        "id":          str(uuid.uuid4())[:8],
        "name":        request.form.get("name","").strip(),
        "category":    request.form.get("category","Plats").strip(),
        "price":       request.form.get("price","").strip(),
        "description": request.form.get("description","").strip(),
        "available":   True,
        "emoji":       request.form.get("emoji","🐟").strip(),
    })
    jsave("menu.json", items)
    flash("Plat ajouté !", "success")
    return redirect(url_for("admin_menu"))

@app.route("/admin/menu/update/<uid>", methods=["POST"])
@login_required
def update_menu_item(uid):
    items = jload("menu.json")
    for it in items:
        if it["id"] == uid:
            it["name"]        = request.form.get("name", it["name"]).strip()
            it["price"]       = request.form.get("price", it.get("price","")).strip()
            it["description"] = request.form.get("description", it.get("description","")).strip()
            it["category"]    = request.form.get("category", it["category"]).strip()
            it["emoji"]       = request.form.get("emoji", it.get("emoji","🐟")).strip()
            it["available"]   = request.form.get("available") == "true"
            break
    jsave("menu.json", items)
    return jsonify({"ok": True})

@app.route("/admin/menu/delete/<uid>", methods=["POST"])
@login_required
def delete_menu_item(uid):
    items = [x for x in jload("menu.json") if x["id"] != uid]
    jsave("menu.json", items)
    return jsonify({"ok": True})

# ══════════════════════════════════════════════════════════════════════════════
#  ADMIN — RÉSERVATIONS
# ══════════════════════════════════════════════════════════════════════════════

@app.route("/admin/reservations")
@login_required
def admin_reservations():
    resas = jload("reservations.json")[::-1]
    return render_template("admin_reservations.html", resas=resas)

@app.route("/admin/reservations/update/<rid>", methods=["POST"])
@login_required
def update_reservation(rid):
    resas  = jload("reservations.json")
    statut = request.form.get("statut","en attente")
    for r in resas:
        if r["id"] == rid: r["statut"] = statut; break
    jsave("reservations.json", resas)
    return jsonify({"ok": True})

@app.route("/admin/reservations/delete/<rid>", methods=["POST"])
@login_required
def delete_reservation(rid):
    resas = [r for r in jload("reservations.json") if r["id"] != rid]
    jsave("reservations.json", resas)
    return jsonify({"ok": True})

# ══════════════════════════════════════════════════════════════════════════════
if __name__ == "__main__":
    for d in [UPLOAD_DIR, os.path.join(UPLOAD_DIR,"original"),
              os.path.join(UPLOAD_DIR,"thumbs"), DATA_DIR]:
        os.makedirs(d, exist_ok=True)
    print("\n🐟  Edlala — http://localhost:5000")
    print("🔑  Admin  — http://localhost:5000/admin/login  (mdp: edlala2025)\n")
    app.run(debug=True, port=5000)
