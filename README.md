# Dare Network website

## Local development

Install dependencies and start the Next.js site:

```bash
npm install
npm run dev
```

The website runs at [http://localhost:3000](http://localhost:3000).

## Connect Sanity

The website reads published case studies and blog posts from Sanity. Its Studio is available at `/studio` on the same Next.js server.

1. Create a Sanity project in the [Sanity management console](https://www.sanity.io/manage) and choose or create the dataset (the default is `production`).
2. Copy `.env.example` to `.env.local` in the repository root and set the project ID and dataset:

   ```dotenv
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

   Do not commit `.env.local`. The dataset is expected to be publicly readable. Only set `SANITY_API_READ_TOKEN` for a private dataset, and keep that token server-side and out of source control.

3. Start the website and Studio:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000/studio](http://localhost:3000/studio) and sign in with a Sanity account that has access to the project. `npm run studio:dev` is also available as an alias.

4. In the Sanity project’s API settings, add the website origin (`http://localhost:3000`) to the CORS origins and enable credentials. Add your deployed website origin there as well when you deploy it.
5. Create and publish case studies, authors, categories, and blog posts. Published case studies populate `/works` and `/works/[slug]`; published posts populate `/blog` and `/blog/[slug]`.

The site refreshes fetched content at least every 60 seconds. If the project ID is not configured yet, content pages display setup guidance instead of sample CMS content.

## Sanity Studio

```bash
npm run studio:dev
npm run studio:typegen
```

The root `npm run build` command builds both the website and its embedded Studio.
