# Sanyukta Nirmal | Portfolio Website

A responsive, single-page portfolio for a DevOps & Cloud Engineer, built with plain HTML, CSS and JavaScript. No build step, no dependencies.

All content comes from the resume in `assets/Sanyukta_Nirmal_Resume.pdf`.

## Sections

Home, About Me, Technical Skills (filterable), Experience, Projects, Education, Certifications, Contact.

Features: dark/light theme toggle, animated network background, typed role line, animated counters, scroll-reveal animations, project card hover effects, mobile menu, back-to-top button, Download Resume button.

## Project structure

```
portfolio/
├── index.html
├── .nojekyll
├── README.md
├── css/style.css
├── js/
│   ├── config.js      <- your personal links (edit this)
│   └── main.js
└── assets/
    └── Sanyukta_Nirmal_Resume.pdf
```

## Step 1: Add your GitHub and email links (2 minutes)

Your resume lists LinkedIn and Credly, so those links are already set. It does **not** list a GitHub profile or an email address, so those were left blank rather than guessed. Until you fill them in, the GitHub and Email buttons stay hidden, so visitors never hit a broken link.

Open `js/config.js` and fill in the two blank values:

```js
window.PORTFOLIO_CONFIG = {
  linkedin: "https://www.linkedin.com/in/sanyukta-nirmal-aws-sd",
  credly:   "https://www.credly.com/users/sanyukta-nirmal",
  github:   "https://github.com/YOUR-USERNAME",
  email:    "you@example.com"
};
```

Save the file. The GitHub buttons (hero, projects, contact) and the Email card appear automatically.

## Step 2: Preview locally

Just double-click `index.html`, or run a local server:

```bash
cd portfolio
python3 -m http.server 8000
# open http://localhost:8000
```

## Step 3: Deploy to GitHub Pages

### Option A: Website in a repo named `<username>.github.io` (URL: `https://<username>.github.io`)

1. On GitHub, click **New repository**.
2. Name it exactly `<your-username>.github.io` (for example `jane.github.io`). Set it to **Public**. Click **Create repository**.
3. Upload the files:
   - **Web upload:** on the repo page click **uploading an existing file**, drag in everything *inside* the `portfolio` folder (`index.html`, `css`, `js`, `assets`, `.nojekyll`, `README.md`), then **Commit changes**.
   - **Git command line:**
     ```bash
     cd portfolio
     git init
     git add .
     git commit -m "Add portfolio website"
     git branch -M main
     git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
     git push -u origin main
     ```
4. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch **main** and folder **/ (root)**, then click **Save**.
5. Wait 1–2 minutes. Your site will be live at `https://<your-username>.github.io`.

### Option B: Website in any repo (URL: `https://<username>.github.io/<repo-name>/`)

1. Create a public repo with any name, for example `portfolio`.
2. Upload the files as in Option A (`index.html` must be at the repo root).
3. Go to **Settings → Pages**, set **Source** to **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. Your site will be live at `https://<your-username>.github.io/portfolio/`.

All paths in this site are relative, so it works in both options without changes.

### Updating the site later

Edit files and commit/push (or re-upload). GitHub Pages redeploys automatically in about a minute.

## Updating your resume

Replace `assets/Sanyukta_Nirmal_Resume.pdf` with the new PDF, keeping the same file name. The Download Resume buttons will serve the new file.

## Customizing

- **Colors and fonts:** the variables at the top of `css/style.css` (`:root`).
- **Text content:** `index.html`.
- **Skill chips:** the `SKILLS` object in `js/main.js`.
- **Typed role line:** the `roles` array in `js/main.js`.

## Troubleshooting

- **404 on GitHub Pages:** confirm `index.html` is at the root of the repo (not inside a subfolder) and that Pages is set to the `main` branch.
- **Resume does not download:** confirm the file is at `assets/Sanyukta_Nirmal_Resume.pdf` and the name matches exactly (case-sensitive on GitHub Pages).
- **Changes not showing:** wait a minute and hard-refresh (Ctrl/Cmd + Shift + R).
- **GitHub button missing:** that is expected until you set `github` in `js/config.js`.
