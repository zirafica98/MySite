# Personal Portfolio Website

Modern Angular portfolio website with blog functionality, admin panel, and multilingual support.

## Features

- 🎨 Modern UI with Tailwind CSS
- 🌙 Dark mode support
- 📱 Fully responsive design
- 🌍 Multilingual (Serbian/English)
- 📝 Blog system with Supabase backend
- 🔐 Admin panel for content management
- ⚡ Fast and optimized

## Tech Stack

- Angular 17+ (Standalone Components)
- Tailwind CSS
- Supabase (PostgreSQL + Auth + Storage)
- TypeScript
- RxJS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure Supabase:
   - Create a Supabase project at https://supabase.com
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
   - Update `src/environments/environment.ts` with your Supabase URL and anon key:
   ```typescript
   export const environment = {
     production: false,
     supabaseUrl: 'YOUR_SUPABASE_URL',
     supabaseKey: 'YOUR_SUPABASE_ANON_KEY'
   };
   ```

3. Start development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── hero/          # Hero section
│   │   ├── about/         # About/CV section
│   │   ├── projects/      # Projects showcase
│   │   ├── blog/          # Blog list and detail
│   │   ├── contact/       # Contact form
│   │   └── admin/         # Admin panel
│   ├── services/          # Business logic services
│   ├── shared/            # Shared components
│   └── app.routes.ts      # Routing configuration
├── assets/
│   └── i18n/              # Translation files
└── environments/          # Environment configuration
```

## Customization

1. Update personal information in:
   - `src/app/components/hero/hero.component.ts`
   - `src/app/components/about/about.component.ts`
   - `src/app/components/projects/projects.component.ts`

2. Add your social media links in:
   - `src/app/components/hero/hero.component.ts`
   - `src/app/components/contact/contact.component.ts`
   - `src/app/shared/footer/footer.component.ts`

3. Update translations in:
   - `src/assets/i18n/sr.json`
   - `src/assets/i18n/en.json`

## Admin Panel

Access the admin panel at `/admin` and log in with your Supabase credentials.

## License

MIT
