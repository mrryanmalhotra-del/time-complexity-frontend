# Deployment Guide

This guide covers deploying the Algorithm Complexity Visualizer to Vercel.

## Prerequisites

1. A [Vercel account](https://vercel.com) (free tier is sufficient)
2. Git installed on your system
3. Project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Option 1: Deploy via Vercel Dashboard (Easiest)

### Step 1: Prepare Your Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click "Deploy"

### Step 3: Deploy Backend (Optional)

For the backend, you have a few options:

#### Option A: Serverless Functions on Vercel

Create `api/` directory in root and convert backend to serverless functions:

```javascript
// api/analyze.js
export default function handler(req, res) {
  // Your analysis logic here
}
```

#### Option B: Separate Backend Hosting

Deploy backend separately:
- [Railway](https://railway.app)
- [Render](https://render.com)
- [Heroku](https://heroku.com)

Update frontend API endpoint in `frontend/src/components/Sidebar.jsx`:
```javascript
const response = await axios.post('YOUR_BACKEND_URL/api/analyze', {
  code: codeInput,
  language: selectedLanguage
})
```

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login

```bash
vercel login
```

### Step 3: Deploy Frontend

```bash
cd frontend
vercel --prod
```

Follow the prompts to configure your deployment.

### Step 4: Deploy Backend

```bash
cd backend
vercel --prod
```

## Environment Variables

If you need environment variables:

1. Go to your project on Vercel Dashboard
2. Navigate to Settings → Environment Variables
3. Add your variables:
   - `BACKEND_URL` (if using separate backend)
   - Any API keys or secrets

## Configuration Files

### vercel.json (Frontend)

Create `frontend/vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "YOUR_BACKEND_URL/api/:path*"
    }
  ]
}
```

### vercel.json (Backend - if using Vercel)

Create `backend/vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

## Custom Domain

1. Go to your project on Vercel
2. Navigate to Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

## Performance Optimization

### Frontend Optimizations

1. **Code Splitting**: Already handled by Vite
2. **Image Optimization**: Use Vercel Image Optimization
3. **Caching**: Configure headers in `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Backend Optimizations

1. **Connection Pooling**: If using database
2. **Caching**: Implement Redis for frequent queries
3. **Rate Limiting**: Protect API endpoints

## Monitoring

Enable monitoring in Vercel Dashboard:
- Analytics
- Speed Insights
- Logs

## Rollback

If something goes wrong:

```bash
vercel rollback
```

Or use the Vercel Dashboard to rollback to a previous deployment.

## Local Production Test

Test production build locally before deploying:

```bash
# Frontend
cd frontend
npm run build
npm run preview

# Backend
cd backend
NODE_ENV=production npm start
```

## Troubleshooting

### Build Fails

- Check build logs in Vercel Dashboard
- Ensure all dependencies are in `dependencies`, not `devDependencies`
- Verify Node.js version compatibility

### API Errors

- Check CORS configuration
- Verify environment variables
- Check backend logs

### Performance Issues

- Enable Vercel Analytics
- Check bundle size: `npm run build -- --stats`
- Optimize images and assets

## Cost Considerations

Vercel Free Tier includes:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth
- ✅ Serverless function execution
- ❌ Limited to 100 GB-hours

For backend hosting alternatives:
- **Railway**: Free tier available
- **Render**: Free tier with limitations
- **Fly.io**: Free tier available

## Security

1. **Environment Variables**: Never commit secrets
2. **API Rate Limiting**: Implement on backend
3. **Input Validation**: Sanitize all user inputs
4. **CORS**: Configure properly for production

## Continuous Deployment

Once connected to Git:
- Every push to `main` triggers a production deployment
- Pull requests get preview deployments
- Automatic rollback on errors

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [Contact Support](https://vercel.com/support)

Happy deploying! 🚀
