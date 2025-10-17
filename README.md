# Agilo Medusa Projekt

Ovaj repozitorij sadrži Medusa backend i Next.js storefront u jednom repu. 
Cilj je implementirati Product stranicu prema priloženom Figma dizajnu te je integrirati s Medusa sustavom koristeći Medusa JS SDK.

## Features i zahtjevi zadatka

Potrebno je izraditi Product stranicu koristeći Next.js, TypeScript i TailwindCSS te je povezati s Medusa backendom putem Medusa JS SDK-a. Repozitorij sadrži oba projekta:
- Medusa 
- Next.js

Cilj je što vjernije reproducirati dizajn na desktop i mobilnim uređajima, uz naglasak na strukturu i čitljivost koda. Osnovne funkcionalnosti koje je potrebno implementirati su:
- Prikaz detalja proizvoda na Product stranici.
- Dodavanje odabrane varijante proizvoda u košaricu.
- Prikaz broja artikala u košarici u headeru.
- Materijale i boje na proizvodima potrebno je dodati kao varijante proizvoda u Medusa Adminu.
 Za prikaz boja u obliku color pickera može se hardkodirati mapiranje naziva boje i pripadnog HEX koda.

## Preduvjeti

- Node.js ≥ 20
- Yarn ≥ 3.5 za Medusa (Yarn Berry), Yarn v1 za Storefront
- PostgreSQL 16 (lokalno: `localhost:5432`, korisnik: `postgres`, lozinka: `postgres`)

## Brzi početak

git clone "git@github.com:BDelic11/agilo-medusa.git"

cd agilo-medusa

cd medusa

# 1) Kreiranje .env datoteke
cp .env.template .env

# 2) Instalacija dependencija
yarn

# 3) Build projekta
yarn build

# 4) Seed baze (demo podaci)
yarn db:seed

# 5) Kreiranje admin korisnika
yarn medusa user -e "admin@medusa.local" -p "supersecret"

# 6) Pokretanje dev servera
yarn dev

Nakon što se backend pokrene, Medusa Admin je dostupan na http://localhost:9000/app. 
Prijavite se s korisnikom kojeg ste upravo kreirali. U Adminu otvorite Settings → Publishable API Keys, napravite ključ i kopirajte ga za storefront konfiguraciju.

Storefront (Next.js)

cd ../storefront

# 1) Kreiranje .env.local datoteke
cp .env.template .env.local

# U .env.local postaviti:
# NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
# NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_test_xxx   # ključ iz Medusa Admina

# 2) Instalacija ovisnosti
yarn

# 3) Pokretanje dev servera
yarn dev
Storefront je dostupan na http://localhost:8000.

Struktura repozitorija

agilo-medusa/
├─ medusa/        # Medusa v2 
├─ storefront/    # Next.js storefront
└─ README.md
