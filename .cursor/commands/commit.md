# Git Commit Command

## Git Identity (Project-Specific)

**This project uses a specific git identity. Always use:**
- **Username:** `charmas3r`
- **Email:** `evansmith0115@gmail.com`
- **Remote:** `https://github.com/charmas3r/carlson-gracie-site`

The identity is already configured for this repository. If it needs to be reset:
```bash
git config user.name "charmas3r"
git config user.email "evansmith0115@gmail.com"
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
