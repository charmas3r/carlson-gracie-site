# Claude Code Project Instructions

This project uses shared agent configuration with Cursor. See the files below for project rules and skills.

## Project Rules

Read `.cursorrules` for comprehensive project conventions including:
- Tech stack (Next.js 15, React 19, TypeScript, TailwindCSS, Sanity CMS)
- Project structure and file organization
- Code conventions and naming standards
- Testing approach and common commands

## Skills Reference

Skills are defined in `.cursor/skills/` - read the relevant `skill.md` when working on specific features:

| Skill | Location | Use When |
|-------|----------|----------|
| Next.js App Router | `.cursor/skills/next-app-router/skill.md` | Pages, layouts, routing |
| API Routes | `.cursor/skills/api-routes/skill.md` | Creating API endpoints |
| Sanity CMS | `.cursor/skills/sanity-cms/skill.md` | Content management |
| Email (Resend) | `.cursor/skills/email-resend/skill.md` | Email functionality |
| Form Validation | `.cursor/skills/form-validation/skill.md` | Form handling |
| Theme System | `.cursor/skills/theme-system/skill.md` | Dark/light mode |
| Video Optimization | `.cursor/skills/video-optimization/skill.md` | Hero videos |
| SEO Metadata | `.cursor/skills/seo-metadata/skill.md` | SEO and meta tags |
| Analytics | `.cursor/skills/analytics-tracking/skill.md` | Umami tracking |
| Animations | `.cursor/skills/animations-framer/skill.md` | Framer Motion |
| Google APIs | `.cursor/skills/google-apis/skill.md` | Maps, Reviews |
| UI Components | `.cursor/skills/ui-components/skill.md` | shadcn/ui components |
| Vercel Storage | `.cursor/skills/vercel-storage/skill.md` | Blob storage |

## Commands Reference

See `.cursor/commands/` for reusable workflows:
- `commit.md` - Git commit process with project-specific identity (charmas3r)

## Git Identity

This project uses a specific git identity:
- **Username:** `charmas3r`
- **Email:** `evansmith0115@gmail.com`
- **Remote:** Uses `github-charmas3r` SSH host alias

## Quick Reference

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # ESLint
npm run sanity:dev   # Sanity Studio
```

**Performance Targets:** LCP < 1.8s | CLS < 0.05 | Conversion 8-12%
