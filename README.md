# Sanyukta Nirmal — Portfolio

A modern, responsive, single-page portfolio for **Sanyukta Nirmal**, DevOps & Cloud Engineer. The site is built with plain HTML, CSS, and JavaScript so it can be deployed directly to GitHub Pages or any static host.

## Included

- `index.html` — semantic, recruiter-focused portfolio page
- `styles.css` — responsive visual system, layout, states, and motion
- `script.js` — mobile navigation, interactive skills panel, reveal animations, current year, and mailto contact flow
- `assets/Sanyukta_Nirmal_CV.pdf` — original resume used as the source of truth for site content
- `favicon.svg` — lightweight site icon
- `manus-routes.json` — route declaration for the managed preview

## Run locally

No build step is required. Serve the folder with any static server so relative links and the resume download behave like production:

```bash
python3 -m http.server 3000
```

Then open [http://localhost:3000](http://localhost:3000).

## Deploy to GitHub Pages

1. Create a new GitHub repository, for example `sanyukta-portfolio`.
2. Copy the contents of this folder into the repository root. Keep `index.html` at the root and preserve the `assets/` folder.
3. Commit and push the files to the default branch:

   ```bash
   git init
   git add .
   git commit -m "Create Sanyukta Nirmal portfolio"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/sanyukta-portfolio.git
   git push -u origin main
   ```

4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and the `/ (root)` folder, then click **Save**.
7. GitHub will provide the published Pages URL after the workflow completes.

Because this is a static site, no Node installation or build command is needed. If your repository uses a custom domain, add the domain in GitHub Pages and update DNS as instructed by GitHub.

## Resume-backed content note

Site copy is intentionally limited to details present in the supplied resume. The resume contains a verified LinkedIn URL and Credly profile, but it does not contain a personal GitHub profile URL. The GitHub button therefore opens the main GitHub site rather than inventing a personal profile; replace its `href` in `index.html` when the personal GitHub URL is available.

## Customize

- Edit colors and spacing in `:root` in `styles.css`.
- Add or update resume-backed copy in `index.html`.
- Update the skill data object in `script.js` when verified skills change.
- Replace `assets/Sanyukta_Nirmal_CV.pdf` with a newer resume using the same filename to keep the download button working.
