# Anestesia Vault 🗂️

App per **raccogliere, classificare e ritrovare** documenti, protocolli e linee guida di
anestesia che ti arrivano dai colleghi di vari ospedali. Stessa filosofia di *Periop Vault*
(catalogazione + classificazione + backup), ma pensata per dare ordine ai documenti invece
che estrarre DOI e classificare studi.

> Esempio d'uso: categoria **Locoregionale** → ci raccogli i protocolli dei vari ospedali
> e hai subito un colpo d'occhio per confrontarli al bisogno.

Interfaccia **mobile-native** (Material You): barra di navigazione in basso, schede,
bottom sheet, tema chiaro/scuro — la stessa esperienza di Periop Vault.

## Installazione su Android (PWA)

L'app è una **Progressive Web App installabile**:

1. Apri l'URL del sito (es. su Cloudflare Pages / Netlify) con **Chrome** su Android.
2. Menu **⋮** → **Aggiungi a schermata Home** / **Installa app**.
3. Si apre come un'app vera, a tutto schermo e **offline**, con la sua icona.

> Funziona allo stesso modo su iPhone (Safari → Condividi → "Aggiungi a Home").

## Come si usa

- **🏠 Home** — riepilogo: numero documenti, categorie, ospedali, ripartizione per area e
  ultimi aggiunti.
- **＋ Nuovo** (pulsante centrale) — aggiungi un documento: titolo, categoria, ospedale/fonte,
  collega che l'ha inviato, data, tag, note e **uno o più file allegati** (PDF, foto, Word…):
  puoi caricare più documenti sullo stesso protocollo.
- **📚 Documenti** — ricerca (titolo, ospedale, tag, note), filtro per categoria e ordinamento;
  i documenti sono raggruppati per categoria.
- **🗂️ Categorie** — il *colpo d'occhio*: quanti protocolli hai per ogni area; tocca per aprirli.
- Tocca un documento per il **dettaglio**: **Apri** il file, **Scarica**, **Modifica**, **Elimina**.

## Classificazione

- Categorie predefinite utili in anestesia (Locoregionale, Anestesia generale, Vie aeree,
  Terapia del dolore, Ostetricia, Pediatria, Terapia intensiva, ERAS, ecc.).
- Puoi **creare categorie nuove** col pulsante ＋ accanto al campo Categoria.
- **Tag** liberi e campo **Ospedale/Fonte** per filtrare e confrontare protocolli tra reparti.

## Backup e ripristino

Scheda **💾 Backup**:

- **Esporta tutto (JSON)** — salva *tutto*, file inclusi, in un unico file.
- **Condividi / salva su Drive** — usa la condivisione di sistema (utile da telefono).
- **Importa / Ripristina** — ricarica un backup, scegliendo se **unire** o **sostituire**.
- **Esporta elenco (CSV)** — solo l'elenco (senza file) per Excel.
- **Carica esempi** / **Svuota archivio**.

## Dove finiscono i dati

Tutto è salvato **localmente sul dispositivo** (IndexedDB), inclusi i file allegati: nessun
dato esce da casa tua. Poiché i dati sono legati a quel browser/URL, **esporta un backup
periodicamente** — è il modo per conservarli e trasferirli tra dispositivi.

## Note tecniche

- App a file singolo (`index.html`), HTML/CSS/JavaScript vanilla, **zero dipendenze**.
- PWA: `manifest.json` + `sw.js` (service worker) + icone. Il service worker e l'installazione
  richiedono **HTTPS** (quindi funzionano online su Cloudflare/Netlify, non da `file://`).
- Più file per documento; limite consigliato per singolo file: ~40 MB.
- Per rigenerare le icone: `node tools/genicon.js`.

## Deploy su Cloudflare Pages (consigliato, gratis)

Banda illimitata sul piano gratuito. Sito statico, nessuna build.

1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Seleziona il repo `awesome-agent-skills`.
3. Impostazioni di build:
   - **Framework preset**: `None`
   - **Build command**: *vuoto*
   - **Build output directory**: `anestesia-vault`
4. **Save and Deploy**. Il file `_redirects` gestisce il fallback SPA.

## Deploy su Netlify

Sito separato dedicato a quest'app:

1. Netlify → *Add new site* → *Import from Git* → repo `awesome-agent-skills`.
2. **Base/Publish directory**: `anestesia-vault`.
3. Nessun *build command*. Il file `_redirects` gestisce il fallback SPA.
