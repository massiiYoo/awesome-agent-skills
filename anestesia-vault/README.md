# Anestesia Vault 🗂️

App per **raccogliere, classificare e ritrovare** documenti, protocolli e linee guida di
anestesia che ti arrivano dai colleghi di vari ospedali. Stessa filosofia di *Periop Vault*
(catalogazione + classificazione + backup), ma pensata per dare ordine ai documenti invece
che estrarre DOI e classificare studi.

> Esempio d'uso: categoria **Locoregionale** → ci raccogli i protocolli dei vari ospedali
> e hai subito un colpo d'occhio per confrontarli al bisogno.

## Come si usa

1. Apri il file **`index.html`** con un doppio clic (si apre nel browser). Nessuna
   installazione, nessun server, funziona **offline**.
2. **+ Documento** → inserisci titolo, categoria, ospedale/fonte, collega che te l'ha
   inviato, data, tag e note. Allega il file (PDF, foto, Word…) trascinandolo o
   selezionandolo.
3. Ritrovi tutto con la **ricerca** in alto (titolo, ospedale, tag, note) e con i filtri
   nella barra laterale (**categoria** e **ospedale**).
4. **Apri** per visualizzare il file, **⬇️** per scaricarlo.

## Classificazione

- Categorie predefinite utili in anestesia (Locoregionale, Anestesia generale, Vie aeree,
  Terapia del dolore, Ostetricia, Pediatria, Terapia intensiva, ERAS, ecc.).
- Puoi **creare categorie nuove** semplicemente scrivendole nel campo Categoria.
- **Tag** liberi e campo **Ospedale/Fonte** per filtrare e confrontare protocolli tra reparti.

## Backup e ripristino

Menu **Backup ▾** in alto a destra:

- **Esporta backup (.json)** — salva *tutto*, file inclusi, in un unico file. Mettilo su
  cloud / chiavetta per non perdere nulla o per spostarti su un altro computer.
- **Importa / Ripristina** — ricarica un backup. Puoi scegliere se **unire** all'archivio
  attuale o **sostituirlo**.
- **Esporta elenco (CSV)** — esporta solo l'elenco (senza file) per Excel.
- **Svuota archivio** — cancella tutto (chiede doppia conferma).

## Dove finiscono i dati

Tutto è salvato **localmente nel tuo browser** (IndexedDB), inclusi i file allegati: nessun
dato esce dal tuo computer. Poiché i dati sono legati al browser/profilo, **esporta un backup
periodicamente** — è il modo per conservarli e trasferirli.

## Note tecniche

- File singolo, HTML/CSS/JavaScript vanilla, zero dipendenze.
- Limite consigliato per file allegato: ~40 MB.
- Scorciatoie: `Ctrl/Cmd + K` per la ricerca, `Esc` per chiudere le finestre.

## Deploy su Netlify

Sito separato dedicato a quest'app:

1. Netlify → *Add new site* → *Import from Git* → repo `awesome-agent-skills`.
2. **Base/Publish directory**: `anestesia-vault`.
3. Nessun *build command*. Il file `_redirects` gestisce il fallback SPA.
