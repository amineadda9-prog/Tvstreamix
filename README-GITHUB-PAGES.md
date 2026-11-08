# TVSTREAMIX — GitHub Pages deployment

This project is a React + TypeScript + Vite site. Do not upload only the ZIP file to GitHub Pages.

## Publish using GitHub Actions

1. Extract this ZIP on your computer.
2. Upload **all files and folders inside** the extracted folder to the root of the repository:
   `amineadda9-prog/IP-TV-TVSTREAMIX`
   Make sure `.github/workflows/deploy.yml` is included. If Windows hides dot-folders, enable **View → Show → Hidden items** in File Explorer.
3. Commit the files to the `main` branch.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment → Source**, select **GitHub Actions**.
6. Open the **Actions** tab and wait for the “Deploy to GitHub Pages” workflow to finish successfully.
7. Your website address will be:
   https://amineadda9-prog.github.io/IP-TV-TVSTREAMIX/

The Vite configuration is already set to the repository path `/IP-TV-TVSTREAMIX/`.

## Before making the site public

Edit `src/config/contact.ts` and replace the example WhatsApp number, social handles and support email with your real contact details. The current values are placeholders. Test every order/contact button after deployment.

## Notes

- Every push to `main` automatically rebuilds and redeploys the site.
- GitHub Pages hosts the website interface; it does not host or relay live video streams or provide an IPTV backend.
- Use only streams and media you are authorized to distribute.
