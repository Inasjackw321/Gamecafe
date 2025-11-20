# 🎮 Gamecafe - Code Your Games

Gamecafe is a game creation platform similar to Roblox that allows players to code games using HTML, JavaScript, Python, and Java, then upload and share them with the world. Built with a stunning liquid glass UI design.

## ✨ Features

- **Multi-Language Support**: Create games using HTML, JavaScript, Python, or Java
- **Code Editor**: Powered by Monaco Editor with syntax highlighting
- **Liquid Glass UI**: Beautiful glassmorphism design with smooth animations
- **User Authentication**: Secure login and registration system
- **Game Gallery**: Discover and play games created by the community
- **Real-time Play**: Instantly play HTML and JavaScript games in your browser
- **Game Management**: Create, edit, and manage your games
- **Social Features**: Like games and track play counts

## 🚀 Tech Stack

### Frontend
- React 18
- React Router for navigation
- Monaco Editor for code editing
- Axios for API calls
- Framer Motion for animations
- Custom liquid glass CSS styling

### Backend
- Node.js & Express
- JWT authentication
- In-memory storage (easily replaceable with MongoDB)
- VM2 for safe JavaScript execution
- RESTful API architecture

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd Gamecafe
```

2. **Install server dependencies**
```bash
npm install
```

3. **Install client dependencies**
```bash
cd client
npm install
cd ..
```

4. **Create environment file**
```bash
cp .env.example .env
```

Edit `.env` and configure your settings:
```
PORT=5000
JWT_SECRET=your_secure_jwt_secret_here
NODE_ENV=development
```

## 🏃‍♂️ Running the Application

### Development Mode

**Option 1: Run both server and client together**
```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 (Server):
```bash
npm run server
```

Terminal 2 (Client):
```bash
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎨 Liquid Glass UI

The platform features a custom liquid glass (glassmorphism) design with:
- Translucent frosted glass panels
- Backdrop blur effects
- Smooth animations and transitions
- Gradient backgrounds
- Floating elements
- Responsive design

## 🎮 Creating Games

### Supported Languages

1. **HTML**: Full HTML5 games with inline CSS and JavaScript
2. **JavaScript**: Pure JavaScript code (automatically wrapped in HTML)
3. **Python**: Code display (requires server-side execution setup)
4. **Java**: Code display (requires server-side execution setup)

### Example Game Template (HTML)

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Game</title>
    <style>
        body {
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: #1a1a1a;
        }
        canvas { border: 2px solid white; }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        // Your game code here
    </script>
</body>
</html>
```

## 📁 Project Structure

```
Gamecafe/
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       │   ├── Navbar.js
│       │   ├── GameCard.js
│       │   └── CodeEditor.js
│       ├── pages/          # Page components
│       │   ├── HomePage.js
│       │   ├── CreateGame.js
│       │   ├── GamePlayer.js
│       │   ├── Login.js
│       │   ├── Register.js
│       │   └── MyGames.js
│       ├── App.js
│       └── index.js
├── server/                 # Express backend
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── games.js
│   │   └── execute.js
│   └── index.js
├── package.json
└── README.md
```

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Sandboxed JavaScript execution using VM2
- Input validation
- Secure iframe rendering with sandbox attributes

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Games
- `GET /api/games` - Get all games
- `GET /api/games/:id` - Get single game
- `POST /api/games` - Create game (protected)
- `PUT /api/games/:id` - Update game (protected)
- `DELETE /api/games/:id` - Delete game (protected)
- `POST /api/games/:id/play` - Increment play count
- `POST /api/games/:id/like` - Like game (protected)

### Execution
- `POST /api/execute` - Execute code safely

## 🔮 Future Enhancements

- [ ] MongoDB integration for persistent storage
- [ ] Real Python and Java execution in containerized environments
- [ ] Game rating and review system
- [ ] User profiles and follower system
- [ ] Game categories and tags
- [ ] Search and advanced filtering
- [ ] Code collaboration features
- [ ] Game assets upload (images, sounds)
- [ ] Multiplayer game support
- [ ] Leaderboards and achievements

## 📝 License

MIT License - feel free to use this project for learning and development!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🎯 Deployment

### 🌐 Quick Deploy to GitHub Pages (Recommended for Demos)

The easiest way to deploy Gamecafe is using **GitHub Pages** - completely free with no backend setup required!

#### Features:
- ✅ Free hosting
- ✅ Auto-deploy on push
- ✅ No server maintenance
- ✅ Works with localStorage
- ✅ Perfect for demos and portfolios

#### Quick Start:

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Under Source, select **GitHub Actions**

2. **Push to GitHub**:
   ```bash
   git push origin main
   ```

3. **Access your site**:
   - Your site will be live at: `https://YOUR_USERNAME.github.io/Gamecafe/`
   - Check deployment status in Actions tab

#### What's Included:
- Automatic GitHub Actions workflow
- Client-side data storage with localStorage
- Demo games pre-loaded
- All features working (except Python/Java execution)

📖 **Full GitHub Pages Guide**: See [DEPLOY_GITHUB_PAGES.md](./DEPLOY_GITHUB_PAGES.md) for detailed instructions

---

### 🚀 Deploying with Backend (Production)

For a full production deployment with persistent database:

#### 1. Build the client:
```bash
cd client
npm run build
cd ..
```

#### 2. Set environment variables:
```bash
export NODE_ENV=production
export PORT=5000
export JWT_SECRET=your_production_secret
export REACT_APP_USE_LOCAL_STORAGE=false
```

#### 3. Start the server:
```bash
npm start
```

### Backend Deployment Platforms

- **Railway**: Easiest deployment with automatic SSL
- **Heroku**: Add `Procfile` with `web: node server/index.js`
- **Vercel**: Use serverless functions for API
- **DigitalOcean/AWS**: Use PM2 for process management
- **Docker**: Create Dockerfile for containerized deployment

### Database Options

For persistent storage, add one of:
- **MongoDB Atlas**: Free tier available
- **PostgreSQL**: Via Railway, Heroku, or Supabase
- **MySQL**: Traditional SQL database

## 💡 Usage Tips

1. **Start Simple**: Begin with HTML games to see instant results
2. **Use Templates**: Copy the provided templates and modify them
3. **Test Frequently**: Use the preview to test your game as you code
4. **Share Your Work**: Publish your games for others to enjoy
5. **Explore Games**: Learn from other creators' games

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules client/node_modules
npm run install-all
```

---

Made with ❤️ by the Gamecafe team

**Happy Coding! 🎮🚀**
