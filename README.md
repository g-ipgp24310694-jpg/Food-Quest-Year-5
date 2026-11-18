# Food Quest! — Year 5 English (Version 4)

A colourful, interactive learning website for **Unit 5: Food & Health — Creating My Healthy Recipe**, based on the user's Task 2 storyboard.

## What's included

- **Entry popup:** pupil nickname sign-up, food buddy avatar, and returning pupil selector. The popup appears *before* access to the menu on every new visit or reload.
- **Home:** two simple food-entry lists, Healthy Foods and Unhealthy Foods. Pupils add and remove examples; no games are on the homepage.
- **Activities:** a 10-food Healthy Plate sorting challenge and a **pupil-led Recipe Studio** with an interactive Chef's Word Bank (food ideas, action verbs, useful phrases, sequence words). Pupils choose words and compose their own title, ingredients, and four instructions; there are no completed sample answers. Includes a self-checklist, live preview, and draft/completion saving.
- **Games:** a challenging 10-question Food Hero Arena using vocabulary, food groups, sequence words, and English questions/instructions. Includes a 20-second timer, three lives, streak bonuses, and scored results.
- **Progress:** per-pupil activity scores, food-list count, recipe status, and game personal best.
- **Teacher Preview:** a password prompt, class dashboard, individual pupil work viewer, and CSV export.
- **Meet the Creator:** dedicated page featuring the supplied cartoon portrait, **Rosario Ivan anak Ambrose**, class **BI2824**, and a creator credit in the footer and page metadata.
- **Mr. Wan Thuthri:** a friendly floating, offline food-and-English chat helper, with an original cartoon mascot, suggested questions, food-group classification for 60+ named foods and variants, and prepared answers about healthy meals, the Malaysian Healthy Plate, and writing recipes. Recipe advice now provides guiding clues rather than finished sample instructions. The conversation can be cleared and is not saved.

## Open the website on your computer

Extract the **entire ZIP** and double-click `index.html`. Keep the folder structure as shown:

```
index.html
styles.css
app.js
chat-helper.js
assets/
  rosario-ivan.png
  mr-wan-thuthri.svg
README.md
```

Use Chrome or another current browser for the best experience.

## Upload to GitHub Pages

1. Create a GitHub repository (for example, `food-quest-year5`).
2. Upload `index.html`, `styles.css`, `app.js`, `chat-helper.js`, and the **entire `assets/` folder** into the repository root. Keep both image files inside `assets/`.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch **main**, folder **/(root)**, then **Save**.
6. Visit the published Pages URL once deployment finishes.

No build step or JavaScript installation is needed.

## Important privacy and security limitations

This is still a **classroom demonstration**, not a production account platform.

- Pupil records are saved in this browser's `localStorage` only. They **do not synchronise across devices**.
- The password gate is implemented in frontend JavaScript. Although the password is checked against a hash instead of being written in plaintext, **this does not securely restrict access**: someone can inspect or bypass client-side code.
- Do **not** use real pupil names, photographs, addresses, passwords, or sensitive information.
- Pupil accounts are nicknames without authentication. Data can be altered or lost on the device.
- Before classroom deployment, use school-approved authentication, a protected server/database, authorised teacher access, and suitable privacy/retention policies.
- Never put database service-role keys, private API tokens, or real classroom credentials inside static website files.
- **Mr. Wan Thuthri is not a live generative AI.** This is a prepared offline question-answer chatbot; it does not make external API requests, save messages, or answer every imaginable question. A genuine AI model would need a separate, school-approved secure backend.
- The Creator picture and full creator name are **publicly visible** when you publish the website. Only publish these if you are comfortable sharing them publicly.

## Next tasks

The storyboard-based introductory media/interactive video, gamified final assessment, peer-feedback workflows, detailed citations, and Mayer's Theory justification can be integrated in later versions.

The website uses original HTML, CSS and JavaScript. Food illustrations use standard system emoji; Mr. Wan Thuthri's SVG mascot is original artwork, and the creator portrait was supplied by the creator. External Google Fonts have local fallbacks. Nutrition teaching examples draw on the Ministry of Health Malaysia's Healthy Plate and the World Health Organization's Healthy Diet guidance; links are provided on the Creator page.
