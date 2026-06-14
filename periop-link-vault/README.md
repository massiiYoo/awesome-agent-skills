# Periop Link Vault

App **offline** (single-file, nessun build) per salvare e categorizzare DOI di articoli scientifici, estrarre DOI dai weekly report in PDF e fare backup. I dati restano in `localStorage` sul dispositivo.

## Avvio

Apri `index.html` con un server statico (necessario per il service worker):

```bash
npx serve periop-link-vault   # oppure: python3 -m http.server
```

Su Netlify: pubblica la cartella così com'è (il file `_redirects` gestisce l'SPA).

## Interfaccia

Design **Material You / mobile-native**: app bar con titolo grande, navigation bar in basso, segmented control per i filtri, **bottom sheet** per dettaglio e form, dark mode completa.

## Funzioni

- **Home dashboard**: metriche, progresso di lettura, ripartizione per categoria, ultimi aggiunti e scorciatoie.
- **Libreria** raggruppata per categoria, con ricerca, ordinamento (recenti / anno / titolo / priorità) e filtro di stato.
- **Vista dettaglio** a tutta pagina: metadati, abstract espandibile, note, tag e azioni.
- **Azioni rapide**: cambio stato con un tap sulla card, **selezione multipla** (long-press) con azioni in blocco (stato, categoria, esporta, elimina).
- **Import metadati** da **DOI (Crossref)** e da **PMID (PubMed)**, con autori e abstract; pulsante "aggiorna metadati" sulle schede esistenti.
- **PDF → DOI**: legge il PDF nel browser (PDF.js), drag & drop, "Crea scheda" con auto-fetch.
- **Backup**: JSON (con **unisci o sostituisci** + deduplica) ed export **BibTeX / RIS** per Zotero, Mendeley, EndNote.
- **PWA installabile** e offline (service worker + manifest, icone PNG 192/512 + maskable).

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

Le icone PNG (`icon-192.png`, `icon-512.png`) sono generate proceduralmente; per rigenerarle: `node tools/genicon.js` (vedi cronologia commit).
