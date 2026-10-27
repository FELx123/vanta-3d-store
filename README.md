# VANTA React + Three.js 3D Store

## Run on your computer
Install Node.js (LTS), extract this folder, open a terminal in the folder and run:

```bash
npm install
npm run dev
```

Open the local address printed by Vite (usually `http://localhost:5173`).

## Publish to GitHub Pages
1. Create a **public** GitHub repository, e.g. `vanta-react-3d`.
2. Upload all files from this folder to the repository root.
3. In the repository, open **Settings → Pages**.
4. Choose **GitHub Actions** as the build source, or use the workflow below if you prefer a repeatable deployment.

### Recommended GitHub Actions deployment
Create `.github/workflows/deploy.yml` with the contents below, commit it, then go to Settings → Pages and set source to **GitHub Actions**.

```yaml
name: Deploy Vite site to Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm install
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

## Current limitations
The clothing is procedural stylized geometry for the starter demo, not photorealistic scanned clothing. For realistic cloth drape and fabric textures, add licensed `.glb`/`.gltf` models made in Blender or purchased from a suitable 3D asset provider. The 3D viewer needs WebGL support and an internet connection for dependencies/environment assets.
