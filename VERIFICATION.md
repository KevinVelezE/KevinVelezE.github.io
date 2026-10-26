# Local verification

Date: 2026-10-26. This records the initial local verification and delivery setup.
Kevin reviewed the site without requesting changes and explicitly authorized
the public repository `KevinVelezE/KevinVelezE.github.io`, initial commit, push
and GitHub Pages activation. Current deployment results are available in the
[Actions history](https://github.com/KevinVelezE/KevinVelezE.github.io/actions).

## Commands and results

| Check | Result |
| --- | --- |
| `npm ci` | Clean lockfile install; 272 packages added, audit reports 0 vulnerabilities. |
| `npm run check` | 15 files checked; 0 errors, 0 warnings, 0 hints. |
| `npm run build` | Static build succeeds; also rebuilt automatically before every browser suite. |
| `npm run test:e2e` | 12/12 Chromium tests pass at the root base. |
| `BASE_PATH=/preview/ SITE_URL=https://example.org npm run test:e2e` | 12/12 tests pass under a subdirectory, including favicon and canonical metadata. |
| Local preview HTTP and browser smoke check | HTTP 200, correct page title, Contact link reaches `#contact`. |

Environment: Node 26.12.1, npm 12.2.1, Astro 7.4.2, Playwright 1.64.1. The
Playwright installer used its Ubuntu 24.04 fallback for this Linux distribution;
the actual browser launches and all reported tests passed. Astro telemetry and
the developer toolbar were disabled.

The final build was restored to base `/` without a configured public site URL.
The running preview listens only on `127.0.0.1:4321`.

## Browser coverage

- Desktop 1440×1000 and mobile widths 320 and 390 pixels.
- Desktop two-column introduction and single-column mobile layout.
- No horizontal overflow, including 320 pixels with 200% root text size.
- Native keyboard sequence, visible link focus, skip-link activation and main focus.
- Section navigation and content with JavaScript disabled.
- axe WCAG 2/2.1 A/AA and WCAG 2.2 AA tags: no detected violations at tested widths.
- Existing public GitHub/email/PDF destinations only; no CV link or local `cv.pdf`.
- Initial load requests remain same-origin, no failed asset requests or cookies;
  no iframe, contact form or external runtime scripts.
- Metadata, favicon content type, internal anchors and distinct academic categories.

Full-page desktop and mobile captures were generated and opened for visual
inspection. Re-run the suite to regenerate `test-results/**/page.png`.

## Test-first evidence and diagnosed issues

- Four initial content tests failed against the intentionally absent page, then
  passed after content and semantic components were implemented.
- New layout tests exposed the missing illustration and enlarged-text overflow.
  Browser measurements traced overflow to long heading words; wrapping fixes it
  without hiding content or disabling zoom. The keyboard test already passed
  against semantic HTML and was retained.
- Root privacy/material checks passed immediately against the static site.
- Subdirectory tests failed on the root-relative favicon and missing configured
  canonical, then passed with BASE_URL-aware assets and conditional metadata.
- Astro 7 auto-backgrounded preview under the agent environment. Investigation
  confirmed that behavior in the installed CLI; the test server uses
  `--ignore-lock`, with Playwright managing its foreground lifecycle.

## Output inspection and final self-review

Built output contains only `index.html` (7,115 bytes), one local stylesheet
(4,902 bytes) and `favicon.svg` (418 bytes), roughly 12.4 KB total uncompressed.
No PDF, JavaScript file, source map or private material was added. Inspected
generated text for local filesystem paths, loopback addresses and common secret
patterns; no matches. This is a scoped inspection, not a guarantee against every
possible secret format.

Self-review against `docs/design.md`, the implementation plan and the Web
Interface Guidelines: no blocking findings. Checked semantic structure, focus,
responsive text, local assets, no automatic motion, no zoom restriction, document
classifications, coauthor attribution and explicit conceptual-diagram description.
No delegated reviewer was used, as agreed; this is not an independent code review.

The two PDF URLs already linked from the GitHub profile responded HTTP 200 to
HEAD requests. No documents were copied from the local CV or research directories.
The diagram is original conceptual artwork, not evidence of a reconstruction.

## Execution decisions

- No Git/worktree scripts or commits: Git initialization was not authorized.
  Local progress is preserved, but there is no Git-history backup or rollback.
- TypeScript Playwright follows the approved plan instead of adding a Python
  test runtime. A Python-specific environment is not tested or required.
- Final review is self-review rather than delegation. An independent reviewer
  could still find issues the author missed; request one separately if desired.

## Pending and limitations

- Final appearance, English copy and existing public link destinations approved by Kevin.
- CV content verification and explicit permission before adding a download.
- Git initialization, public repository creation and deployment authorized by Kevin.
- No manual assistive-technology/screen-reader session, Firefox, WebKit or physical
  mobile device testing. Automated axe results do not prove complete accessibility.
- No separate lint/format tool configured; Astro/TypeScript diagnostics and browser
  tests ran. The publication workflow repeats check/build/browser tests on GitHub;
  inspect its current run for the remote build result.
- The tomography explorer and bilingual support are deliberately out of scope.

## Publication configuration review

Immediately before the initial commit, `npm run check` again reported zero
diagnostics, and `SITE_URL=https://kevinveleze.github.io BASE_PATH=/ npm run
test:e2e` passed all 12 tests, including the production canonical URL assertion.
The selected 24 source/configuration/documentation files were checked for
symlinks, oversized artifacts and common secret signatures; no findings. All
lockfile download URLs use the public npm registry. This scoped scan is not an
independent security audit.

Only source, local public SVG, tests, lockfile, reviewed documentation and the
deployment workflow are selected for the initial commit. Installed dependencies,
build output, screenshots, `.env` files and assistant scratch files are excluded.
The commit uses GitHub's account-specific noreply address rather than a personal
email address. The workflow publishes `dist/`, not the source tree or documentation.
No paid service, domain purchase or custom token is needed.

## Document-link refinement

Kevin approved replacing direct PDF downloads with GitHub file-viewer pages and
removing visible language/hosting details. Both `/blob/main/papers/...` destinations
responded HTTP 200 with HTML content. A new browser regression test checks the
concise labels, viewer URLs, absence of forced-download links and absence of the
removed details. It failed against the old version and passed after the change.
The existing public-material allowlist was updated to the viewer URLs.

`npm run check`: 0 errors/warnings/hints. `SITE_URL=https://kevinveleze.github.io
npm run test:e2e`: 13/13 pass, including mobile, keyboard and axe checks. The
suite rebuilds the production output. No new materials, services or permissions
were added; document language remains internal metadata only.
