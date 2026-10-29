# DECODE Website — Publishing & Backup SOP

Last verified: 2026-10-29 (Asia/Taipei)
Repository: decodecmwork/decode
Live URL: https://decode.com.tw/
Works URL: https://decode.com.tw/cases/

## Non-negotiable publishing rules

1. NEVER assume the GitHub default branch (`main`) is the published site. Confirm the actual GitHub Pages source and/or latest successful deployment first. As checked 2026-10-29, the successful Pages deployment uses `gh-pages`.
2. Before ANY change: fetch and compare the relevant file in `main` and `gh-pages`; identify the live source, the correct target path, and whether the same change needs to exist in both.
3. For production changes, make the necessary edit on the branch actually deployed. Updating `main` alone does NOT count as publishing when Pages uses `gh-pages`.
4. Preserve unrelated page content, assets, tracking (GA4/GTM/Meta Pixel), verification tags, styling, and links. Use narrowly scoped replacements and verify expected occurrence counts.
5. After a write, re-read the updated file from the edited branch; check GitHub Pages build status and validate the live URL, using cache-busting only as an extra diagnostic. State separately: code committed / build succeeded / public site checked.
6. Do not declare 'website updated' on code commit alone, and do not confuse browser cache with publishing to the wrong branch.
7. NEVER merge or overwrite `gh-pages` from `main` directly: histories are diverged and the published branch contains additional site files. A full file-by-file review and backup are prerequisites to any consolidation.
8. Before major structural changes, create a fresh, clearly named backup of EACH relevant branch, verify that backup refs point to their source commits, and retain the recovery commit IDs.
9. If uncertain about live source or deployment, stop production modifications and report the uncertainty.

## Recovery points created on 2026-10-29

- `backup/2026-10-29-main-pre-cleanup` — `67b59b736244039b9b2095c4bd0d44164ac336a7`
- `backup/2026-10-29-gh-pages-pre-cleanup` — `7f5d6d37fc1e306359e71d5ce52eff6a3954af72`

These branches retain Git objects/history on GitHub but are NOT independent off-platform archives. Avoid deleting them; consider periodically downloading external copies.

## Update checklist

- [ ] Verify actual production deployment branch + current successful run
- [ ] Locate exact file and compare branches
- [ ] Make a fresh backup before high-risk changes
- [ ] Apply minimal targeted edit to production source
- [ ] Re-fetch code and validate specific changes
- [ ] Confirm Pages deployment success
- [ ] Check live page and distinguish propagation/cache issues
- [ ] Report commit, branch, published status, and rollback point
