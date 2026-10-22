# Sanyukta Nirmal – Portfolio Website

A responsive, single-page portfolio built with plain **HTML, CSS and JavaScript** (no build step, no dependencies). All content comes from the resume in `assets/Sanyukta_Nirmal_Resume.pdf`.

**Sections:** Home · About · Technical Skills (filterable) · Experience · Projects · Education · Certifications · Contact

**Features:** dark/light theme toggle, animated terminal and typing effect, count-up stats, scroll-reveal animations, mobile menu, back-to-top button, contact form (opens your email app), reduced-motion support.

## Project structure

```
portfolio/
├── index.html
├── css/style.css
├── js/
│   ├── config.js      <- edit this (GitHub URL)
│   └── main.js
├── assets/
│   ├── Sanyukta_Nirmal_Resume.pdf   <- "Download Resume" button
│   ├── aws-cloud-quest-badge.svg
│   └── favicon.svg
└── README.md
```

## 1. Add your GitHub link (important)

Your resume lists GitHub as a skill but does not include a profile URL, so none has been made up. Open `js/config.js` and set:

```js
githubUrl: "https://github.com/your-username",
```

GitHub buttons (Home, Projects, Contact) stay hidden until this is set, so the site never shows a broken link. LinkedIn and Credly links are already set from your resume.

## 2. Run locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 3. Deploy on GitHub Pages

1. Create a new repository on GitHub. For a root URL (`https://<username>.github.io`), name it exactly `<username>.github.io`. Any other name works too and will be served at `https://<username>.github.io/<repo-name>/`.
2. Upload the **contents** of this folder (so `index.html` is at the repo root):
   ```bash
   cd portfolio
   git init
   git add .
   git commit -m "Add portfolio website"
   git branch -M main
   git remote add origin https://github.com/<username>/<repo>.git
   git push -u origin main
   ```
3. In the repo go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Select branch **main** and folder **/ (root)**, then **Save**.
6. Wait 1–2 minutes. Your site will be live at the URL shown on that page.

All paths in the site are relative, so it works both at the root and in a project subpath.

## Updating content

- **Text/sections:** edit `index.html`.
- **Colours:** change the CSS variables at the top of `css/style.css`.
- **Resume:** replace `assets/Sanyukta_Nirmal_Resume.pdf` (keep the same file name).
- **Contact email:** `js/config.js` and the links in the Contact section of `index.html`.

## Notes

- The contact form uses `mailto:` (opens the visitor's email app) because GitHub Pages has no backend. For a hosted form, services like Formspree can be wired into the `<form>` later.
- Fonts load from Google Fonts; the site falls back to system fonts offline.
