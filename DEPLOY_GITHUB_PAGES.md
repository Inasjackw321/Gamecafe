# Deploying Gamecafe to GitHub Pages

This guide explains how to deploy Gamecafe to GitHub Pages for free hosting.

## Features of GitHub Pages Version

- **No Backend Required**: Uses localStorage for data persistence
- **Free Hosting**: Hosted on GitHub Pages at no cost
- **Auto-Deploy**: Automatically deploys when you push to main/master branch
- **Demo Data**: Includes sample games to showcase the platform

## Deployment Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/Gamecafe`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**

### 2. Automatic Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically:
- Builds the React app when you push to main/master
- Deploys the built app to GitHub Pages
- Makes it available at: `https://YOUR_USERNAME.github.io/Gamecafe/`

### 3. Manual Deployment (Optional)

You can also deploy manually using the command line:

```bash
# Install gh-pages package
cd client
npm install --save-dev gh-pages

# Deploy to GitHub Pages
npm run deploy
```

## How It Works

### Client-Side Storage

The GitHub Pages version uses **localStorage** instead of a backend server:

- **User Accounts**: Stored in browser's localStorage
- **Games**: Stored in browser's localStorage
- **Demo Games**: Automatically loaded on first visit
- **Password Hashing**: Uses SHA-256 for demo security

### API Wrapper

The app automatically detects if it's running on GitHub Pages:

```javascript
// In src/utils/api.js
const USE_LOCAL_STORAGE = isGitHubPages();
```

When on GitHub Pages, all API calls are redirected to localStorage operations.

### Routing

Uses React Router with special handling for GitHub Pages:
- `404.html` redirects to index.html with query params
- Client-side routing works seamlessly

## Differences from Full Version

| Feature | GitHub Pages | Full Version (with Backend) |
|---------|--------------|----------------------------|
| User Authentication | ✅ LocalStorage | ✅ JWT + Database |
| Game Storage | ✅ LocalStorage | ✅ Database (Persistent) |
| Data Persistence | ⚠️ Browser Only | ✅ Server-Side |
| Multi-Device Sync | ❌ | ✅ |
| Python/Java Execution | ❌ | ✅ (with containers) |
| Scalability | Limited | Unlimited |

## Environment Variables

The app uses `REACT_APP_USE_LOCAL_STORAGE` to force localStorage mode:

```json
{
  "scripts": {
    "start": "REACT_APP_USE_LOCAL_STORAGE=true react-scripts start",
    "build": "REACT_APP_USE_LOCAL_STORAGE=true react-scripts build"
  }
}
```

## Testing Locally

To test the GitHub Pages version locally:

```bash
cd client
npm start
```

The app will run in localStorage mode automatically.

## Customizing Your Deployment

### Change Repository Name

If you rename your repository, update the `homepage` field in `client/package.json`:

```json
{
  "homepage": "https://YOUR_USERNAME.github.io/NEW_REPO_NAME"
}
```

### Custom Domain

To use a custom domain:

1. Add a `CNAME` file to `client/public/`:
   ```
   yourdomain.com
   ```

2. Configure DNS settings with your domain provider:
   - Add A records pointing to GitHub's IPs
   - Or add a CNAME record pointing to `YOUR_USERNAME.github.io`

3. Enable HTTPS in repository Settings > Pages

## Troubleshooting

### Build Fails

**Problem**: GitHub Actions build fails
**Solution**: Check that all dependencies are in `package.json` and committed

### Blank Page

**Problem**: GitHub Pages shows blank page
**Solution**:
1. Check browser console for errors
2. Verify `homepage` field in package.json
3. Clear browser cache

### 404 on Refresh

**Problem**: Page not found when refreshing on a route
**Solution**: This should be handled by `404.html`, but if issues persist:
- Verify `404.html` is in `client/public/`
- Check GitHub Actions deployment logs

### Data Lost

**Problem**: Games disappear after closing browser
**Solution**: This is expected with localStorage if cookies are cleared. Data is stored per-browser.

## Upgrading to Full Backend

Want to upgrade from GitHub Pages to a full backend? Here's how:

### 1. Deploy Backend

Deploy your backend to:
- **Heroku**: Free tier available
- **Railway**: Easy deployment
- **Vercel**: Serverless functions
- **DigitalOcean**: VPS hosting

### 2. Update Environment Variables

In your React app, set:

```bash
REACT_APP_API_URL=https://your-backend.com/api
REACT_APP_USE_LOCAL_STORAGE=false
```

### 3. Add Database

Replace in-memory storage with:
- MongoDB (Atlas free tier)
- PostgreSQL
- MySQL

### 4. Redeploy

Rebuild and deploy your updated app.

## GitHub Actions Workflow

The workflow in `.github/workflows/deploy.yml`:

```yaml
- Triggers on push to main/master
- Installs Node.js 18
- Installs dependencies
- Builds React app
- Deploys to GitHub Pages
```

## Best Practices

1. **Commit Regularly**: Each push triggers a new deployment
2. **Test Locally**: Always test before pushing
3. **Monitor Actions**: Check GitHub Actions tab for deployment status
4. **Update Dependencies**: Keep packages up to date
5. **Clear Data**: Use browser DevTools to clear localStorage for testing

## Security Notes

The localStorage implementation uses:
- SHA-256 password hashing
- No sensitive data transmission
- Client-side validation

**Note**: This is suitable for demos and personal projects. For production apps with sensitive data, use a proper backend with database.

## Support

- **Issues**: Report issues on GitHub Issues page
- **Questions**: Check README.md for general documentation
- **Updates**: Pull latest changes to get new features

---

**Your Gamecafe is now live on GitHub Pages! 🎮🚀**

Share your link: `https://YOUR_USERNAME.github.io/Gamecafe/`
