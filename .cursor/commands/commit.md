# Git Commit Command

## Git Identity (Project-Specific)

**This project uses a specific git identity:**
- **Username:** `charmas3r`
- **Email:** `evansmith0115@gmail.com`
- **Remote:** `git@github-charmas3r:charmas3r/carlson-gracie-site.git`

> **Note:** This project uses the `github-charmas3r` SSH host alias (configured in `~/.ssh/config`) to authenticate with the charmas3r GitHub account instead of the default esmith-arlo account.

If the identity needs to be reset:
```bash
git config user.name "charmas3r"
git config user.email "evansmith0115@gmail.com"
git remote set-url origin git@github-charmas3r:charmas3r/carlson-gracie-site.git
```


## Commit Process

1. Run `git status && git diff HEAD && git status --porcelain` to see uncommitted changes
2. Add untracked and changed files appropriately
3. Create an atomic commit with a descriptive message
4. Use a conventional commit tag: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`, etc.

## Commit Message Format

```
<tag>: <short description>

<optional body with more details>
```

Examples:
- `feat: add cultivar search with alias matching`
- `fix: correct image gallery sort order`
- `docs: update README with setup instructions`
- `chore: configure eslint and prettier`
