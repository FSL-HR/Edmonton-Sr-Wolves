# Edmonton Sr Wolves — team dashboard

Team management for the Edmonton Sr Wolves (CSWHL, 2026-27): schedule, roster, fees, ice, refs, budget, owed-back, beer and timekeeper turns, contacts.

Live: https://fsl-hr.github.io/Edmonton-Sr-Wolves/ (passcode — owner and captains only).

## How it works

- `index.html` is the whole app, built from `src/`. It holds **no team data**.
- The data lives in Firestore (`schedules/edmonton-sr-wolves`, same Firebase project as the FSL Control Room). The page loads it after the passcode and saves with a version check, so two people can't overwrite each other.
- The passcode is a light lock, not real security: it's in `index.html`.

## Rebuilding

```
node tools/build-gh.js src/wolves-src.html src/gh-host.html src/logo240.png index.html <passcode>
```

Pushing to `main` deploys through `.github/workflows/static.yml`.

Local preview: `node tools/serve.js` → http://localhost:8150/
