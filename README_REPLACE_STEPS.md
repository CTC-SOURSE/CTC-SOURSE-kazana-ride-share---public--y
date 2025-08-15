# Upload-only steps (GitHub Web)

1) Upload this entire `src/` folder to your repo (replace existing same-named files if prompted).
2) Ensure repo variable `VITE_API_BASE=https://kazana-api-production.up.railway.app` (Settings → Secrets and variables → Actions → Variables).
3) Deploy/Preview.
4) Test:
   - Switch language (header dropdown) -> all labels change.
   - Click "Send package" -> `/book-send` shows widget with `?lang=`.
   - Cancel/Post features call the Railway API (Network tab host must be kazana-api-production.up.railway.app).
