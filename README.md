# Kevin Vélez Escarria — personal website

An English-language academic website built with Astro, TypeScript and CSS.
Static HTML, local styles and an original SVG illustration; no application
JavaScript, backend, tracking, cookies or external font requests.

## Local development

Requires Node **22.23.4 or newer** and npm. Verified with Node 26.12.1 and npm
12.2.1 on Linux. Dependency versions are recorded in `package-lock.json`.

```sh
npm ci
npm run dev
```

Open the loopback URL printed by Astro (normally `http://127.0.0.1:4321`).
Astro 7 can automatically start a background server when used by a coding agent;
use `npm run dev -- --ignore-lock` for a harness-managed foreground process.
Astro telemetry and the development toolbar are disabled by project configuration.

## Checks and production preview

```sh
npm run check
npm run build
npm run preview
```

To run browser tests, install the headless Chromium used by Playwright once:

```sh
npx playwright install chromium --only-shell
npm run test:e2e
```

This downloads browser binaries from Playwright's distribution service. Some
Linux distributions need additional browser system libraries. No user website
content is sent by these tests: they run against a local production build.
The first `npm ci` also downloads public dependencies from the npm registry.

Tests rebuild automatically and start a temporary server on `127.0.0.1:4322`.
They cover content, links, keyboard navigation, JavaScript-disabled browsing,
mobile layout, text enlargement, axe accessibility checks and same-origin loading.
Full-page screenshots are written under `test-results/`. Automated checks do not
replace reviewing the content, illustration or screen-reader experience.

Check a deployment under a subdirectory without publishing anything:

```sh
BASE_PATH=/preview/ SITE_URL=https://example.org npm run test:e2e
```

The example origin is only used for the canonical metadata assertion; tests still
visit localhost. After that test, run `npm run build` again to restore the root
build for an ordinary preview.

## Content and design

- `src/data/profile.ts`: public biography, contact and selected mathematical work.
- `src/components/`: presentation, work entries, background, contact and illustration.
- `src/styles/global.css`: the approved light blue/teal editorial direction.
- `docs/design.md`: approved scope, choices, constraints and acceptance criteria.
- `VERIFICATION.md`: verification results and remaining approvals.

Document links point to the two already-public PDFs in the GitHub profile. No
local thesis, conference document or CV has been copied. No private research or
company code/data is included. The CV and a Software section are intentionally
absent until their contents are ready and approved. The tomography explorer is
a separate future project, not an existing interactive feature of this site.

## GitHub Pages delivery

Production address: **https://kevinveleze.github.io/**.
Public source: **https://github.com/KevinVelezE/KevinVelezE.github.io**.

Kevin approved the public repository, initial commit, push and GitHub Pages
activation. The `Verify and deploy GitHub Pages` workflow checks types, builds
the site and runs the Chromium suite before uploading only `dist/` for deployment.
It runs on pushes to `main` or manual dispatch; failed checks block deployment.
Official GitHub actions are pinned to commit SHAs, and only the deployment job
has Pages/OIDC write permissions. No custom secret is required.

The workflow sets:

- `SITE_URL`: `https://kevinveleze.github.io`.
- `BASE_PATH`: `/`, because this is a user site, not a project subdirectory.

Both variables are build-time settings. Rebuild when they change. Without
`SITE_URL`, no canonical URL is emitted; localhost is never claimed as a public
canonical address. Keep the trailing slash on `BASE_PATH`, as in the examples.
The static output in `dist/` is portable to other static hosts.

To update the website, edit the source, run the checks, commit and push to `main`.
Check the repository's Actions tab for the current deployment result. Future CV
downloads and additional materials still require Kevin's review and approval.
