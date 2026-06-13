# Periop Link Vault

App **offline** (single-file, nessun build) per salvare e categorizzare DOI di articoli scientifici, estrarre DOI dai weekly report in PDF e fare backup. I dati restano in `localStorage` sul dispositivo.

## Avvio

Apri `index.html` con un server statico (necessario per il service worker):

```bash
npx serve periop-link-vault   # oppure: python3 -m http.server
```

Su Netlify: pubblica la cartella così com'è (il file `_redirects` gestisce l'SPA).

## Funzioni

- **Archivio** raggruppato per categoria, con ordinamento (recenti / anno / titolo / priorità) e filtro per stato.
- **Importa da DOI** via Crossref (titolo, autori, rivista, anno).
- **PDF → DOI**: legge il PDF nel browser (PDF.js) ed estrae i DOI; drag & drop supportato; "Crea scheda" recupera in automatico i metadati.
- **Backup**: esporta/importa JSON (con **unisci o sostituisci** + deduplica), oppure esporta **BibTeX / RIS** per Zotero, Mendeley, EndNote.
- **PWA installabile** e funzionante offline (service worker + manifest).

## Novità rispetto alla V9

| Area | Miglioramento |
|------|---------------|
| Sicurezza dati | Import con scelta unisci/sostituisci + deduplica, validazione JSON, conferma prima di eliminare, avviso sui duplicati |
| Offline | Service worker (`sw.js`) + `manifest.json` → app installabile e usabile senza rete |
| Ricerca | Auto-fetch Crossref dal PDF, export BibTeX/RIS, campo autori, ordinamento e filtri, ricerca anche per autore/rivista |
| UX | Toast al posto di `alert()`, stati di caricamento, drag & drop PDF, "copia tutti i DOI", etichette accessibili (aria) |
| Estetica | Animazioni leggere, hover sulle card, badge priorità colorati, tag e autori in scheda, empty state curati |

## Struttura

```
periop-link-vault/
├── index.html        # app (UI + logica)
├── manifest.json     # PWA
├── sw.js             # service worker (cache app shell)
├── icon.svg          # icona
├── _redirects        # SPA fallback Netlify
└── assets/           # PDF.js (pdf.min.js, pdf.worker.min.js)
```

> Nota icone: l'icona è in SVG. Per la massima compatibilità di installazione su iOS conviene aggiungere anche `icon-192.png` e `icon-512.png` e referenziarle nel `manifest.json`.
