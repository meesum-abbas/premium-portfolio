# Meesum Abbas Portfolio

Premium portfolio website for Meesum Abbas, built with Vite and React.

## Run locally

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

The production output is generated in `dist/`.

## Deploy on Vercel

1. Push this repository to GitHub.
2. Log in to Vercel and import the GitHub repo.
3. Vercel should detect it as a Vite project.
4. Use these build settings if needed:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
5. Deploy the project.

## Favicon

The site uses `public/faviconprofolio.png` as the favicon.

## Contact form on Vercel

The contact form submits to the serverless function at `/api/contact`.

Flow:

1. The frontend sends a `POST` request from the contact form.
2. Vercel runs `api/contact.js` as a serverless function.
3. The function validates the request.
4. The function sends the message through the Resend API.
5. The user receives success or error feedback in the UI.

## Environment variables

Set these in Vercel under Project Settings > Environment Variables:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=meesum979@gmail.com
CONTACT_FROM_EMAIL=Portfolio Contact <your_verified_sender@yourdomain.com>
```

Notes:

- `CONTACT_FROM_EMAIL` must use a verified sender for Resend.
- SMTP is not required for this setup.
- If the API key is missing, the form returns a fallback error instead of silently failing.

## Local development note

If you run the site with `npm run dev`, the frontend still renders, but `/api/contact` only works when the app is deployed on Vercel or when a compatible backend is running locally.
