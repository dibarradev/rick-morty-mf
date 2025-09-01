# Rick and Morty Microfrontends Application

A modern web application built with **React 18**, **Webpack Module Federation**, and **Docker** that showcases the Rick and Morty universe through a microfrontends architecture.

## 🏗️ Architecture Overview

This project demonstrates a microfrontends architecture with two main applications:

- **Shell (Host)** - Main container orchestrating all microfrontends (Port 3000)
- **Characters** - Microfrontend for character listing, filtering, and character detail views (Port 3001)

### Key Features

- ✅ **Module Federation** - Runtime sharing of React components
- ✅ **Responsive Design** - Bootstrap 5 with dark theme
- ✅ **Character Listing** - Grid/List view with pagination
- ✅ **Advanced Filtering** - By name, status, species, gender
- ✅ **Character Details** - Integrated detail view with episodes and location info
- ✅ **API Integration** - Rick and Morty API consumption
- ✅ **Independent Development** - Each microfrontend can run standalone

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **Docker** and **Docker Compose** (optional)
- **npm** or **yarn**

### Running in Development Mode (Recommended)

**🚀 For active development with hot reload:**

#### Step 1: Start Shell Application (Terminal 1)

```bash
cd shell
npm install
npm start
```

- **Port**: http://localhost:3000
- **Hot reload**: ✅ Automatic
- **Purpose**: Main application with routing

#### Step 2: Start Characters Microfrontend (Terminal 2)

```bash
cd characters
npm install
npx webpack serve --config webpack.config.js
```

- **Port**: http://localhost:3001
- **Hot reload**: ✅ Automatic
- **Purpose**: Characters listing + detail (standalone)

#### Step 3: Access the Application

- **Complete App**: http://localhost:3000 (Shell + Characters integrated)
- **Characters Only**: http://localhost:3001 (Standalone testing)

#### Quick Start Commands (Copy & Paste)

```bash
# Terminal 1: Shell
cd shell && npm install && npm start

# Terminal 2: Characters
cd characters && npm install && npx webpack serve --config webpack.config.js
```

### Running with Docker

**⚠️ Important**: Docker is **NOT recommended for active development** due to slower rebuild cycles. Use it only for production testing or final validation.

1. **Start all services**

   ```bash
   docker-compose up --build
   ```

2. **For code changes in Docker** (rebuilds everything):

   ```bash
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d
   ```

3. **Access the application**
   - Main App: http://localhost:3000
   - Characters Standalone: http://localhost:3001

### Troubleshooting Docker

If you encounter Docker Hub authentication issues, you can:

1. Login to Docker Hub: `docker login`
2. Or use development mode instead (recommended for local development)

**For active development, use npm servers instead of Docker.**

## 🛠️ Development Commands Reference

### Starting Servers

```bash
# Shell (Terminal 1)
cd shell && npm start                 # → http://localhost:3000

# Characters (Terminal 2)
cd characters && npx webpack serve --config webpack.config.js  # → http://localhost:3001
```

### Stopping Servers

```bash
# In each terminal where servers are running:
Ctrl + C
```

### Installing Dependencies

```bash
# Shell dependencies
cd shell && npm install

# Characters dependencies
cd characters && npm install
```

### Docker Commands (Production Testing)

```bash
# Start (builds automatically)
docker-compose up --build

# Stop
docker-compose down

# Rebuild after code changes
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Troubleshooting

```bash
# Kill processes on specific ports if needed
lsof -ti:3000 | xargs kill -9  # Kill Shell
lsof -ti:3001 | xargs kill -9  # Kill Characters

# Clear npm cache if needed
npm cache clean --force
```

1. Login to Docker Hub: `docker login`
2. Or use development mode instead (recommended for local development)

## 📁 Project Structure

```
/
├── shell/                          # Main host application (Port 3000)
│   ├── src/
│   │   ├── components/             # Shared UI components
│   │   │   ├── Navbar/             # Navigation component
│   │   │   ├── Footer/             # Footer component
│   │   │   ├── ErrorBoundary/      # Error handling
│   │   │   └── LoadingSpinner/     # Loading states
│   │   ├── pages/                  # Application pages
│   │   │   └── HomePage/           # Landing page
│   │   ├── styles/                 # Global styles
│   │   └── App.js                  # Main app with routing
│   ├── webpack.config.js           # Module Federation config
│   ├── Dockerfile                  # Container configuration
│   └── package.json
│
├── characters/                     # Characters microfrontend (Port 3001)
│   ├── src/
│   │   ├── Components/             # Character components
│   │   │   ├── Characters.js       # Main component with character detail integration
│   │   │   ├── CharacterCard/      # Character card component
│   │   │   ├── CharacterDetail/    # Character detail view (integrated)
│   │   │   ├── CharacterFilters/   # Filtering components
│   │   │   ├── Pagination/         # Pagination component
│   │   │   └── CharactersRemote.js # Module Federation wrapper
│   │   ├── hooks/                  # Custom React hooks
│   │   │   ├── useCharacters.js    # Characters listing hook
│   │   │   └── useCharacterDetail.js # Character detail hook
│   │   ├── services/               # API services
│   │   │   └── characterApi.js     # Rick & Morty API integration
│   │   ├── styles/                 # Component styles
│   │   ├── bootstrap.js            # App bootstrap for Module Federation
│   │   └── index.js                # Entry point with dynamic import
│   ├── webpack.config.js           # Module Federation config
│   ├── Dockerfile                  # Container configuration
│   └── package.json
│
├── character-detail/               # [DEPRECATED] Legacy character detail
│   └── ...                         # (CharacterDetail now integrated in Characters)
│
├── docker-compose.yml              # Multi-container orchestration
└── README.md                       # This file
```

## 🎯 Features

### ✨ Characters Microfrontend

- **Character Grid/List View** - Toggle between grid and list layouts
- **Advanced Filtering** - Filter by name, status, and species
- **Pagination** - Navigate through large character datasets
- **Responsive Design** - Mobile-first responsive layout
- **Search Functionality** - Real-time character search with debouncing
- **Error Handling** - Graceful error states and retry mechanisms

### 🔍 Character Detail Microfrontend

- **Detailed Character Info** - Complete character profiles
- **Episodes List** - All episodes featuring the character
- **Location Information** - Origin and current location details
- **Search Episodes** - Filter character's episode appearances
- **Quick Stats** - Visual summary of character metrics
- **Navigation** - Seamless back-navigation to character list

### 🏠 Shell (Host) Application

- **Unified Routing** - Centralized navigation between microfrontends
- **Shared Layout** - Consistent navbar, footer, and styling
- **Error Boundaries** - Application-wide error handling
- **Loading States** - Consistent loading feedback
- **Module Federation** - Dynamic microfrontend loading

## 🛠️ Technologies Used

### Frontend

- **React 18** - Modern React with hooks and functional components
- **React Router v6** - Client-side routing and navigation
- **Bootstrap 5** - Responsive UI framework with dark theme
- **CSS Modules** - Scoped component styling
- **Webpack 5** - Module Federation and bundling

### Architecture

- **Module Federation** - Microfrontends runtime integration
- **Docker** - Containerized deployment
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Production web server with CORS support

### Testing

- **Jest** - JavaScript testing framework
- **React Testing Library** - Component testing utilities
- **User Events** - User interaction testing

### Development

- **Babel** - JavaScript transpilation
- **ESLint** - Code linting and formatting
- **Hot Module Replacement** - Development live reload

## 🔧 Module Federation Architecture

### How It Works

This application uses **Webpack Module Federation** to enable runtime sharing of React components between microfrontends:

```
┌─────────────────────────────────────────────┐
│                Shell (Host)                 │
│               Port 3000                     │
│  ┌─────────────────────────────────────┐   │
│  │          Navigation                 │   │
│  │  ┌───────────────────────────────┐ │   │
│  │  │     Characters Remote        │ │   │
│  │  │   (Loaded from :3001)        │ │   │
│  │  │                              │ │   │
│  │  │  ├─ Character List            │ │   │
│  │  │  ├─ Character Filters         │ │   │
│  │  │  └─ Character Detail          │ │   │
│  │  └───────────────────────────────┘ │   │
│  └─────────────────────────────────────┘   │
└─────────────────────────────────────────────┘
```

### Configuration

**Shell (webpack.config.js)**

```javascript
new ModuleFederationPlugin({
  name: 'shell',
  remotes: {
    characters: 'characters@http://localhost:3001/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, eager: true },
    'react-dom': { singleton: true, eager: true },
  },
});
```

**Characters (webpack.config.js)**

```javascript
new ModuleFederationPlugin({
  name: 'characters',
  filename: 'remoteEntry.js',
  exposes: {
    './Characters': './src/Components/CharactersRemote.js',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});
```

### Benefits

- ✅ **Independent Development** - Each team can work autonomously
- ✅ **Independent Deployment** - Deploy microfrontends separately
- ✅ **Runtime Integration** - No build-time coupling
- ✅ **Shared Dependencies** - Avoid code duplication
- ✅ **Technology Flexibility** - Different React versions possible

## 🧪 Testing

### Run All Tests

```bash
# Shell tests
cd shell && npm test

# Characters tests
cd characters && npm test

# Character Detail tests
cd character-detail && npm test
```

### Test Coverage

```bash
cd <microfrontend-directory>
npm run test:coverage
```

### Test Files Structure

- `__tests__/` - Main component tests
- `__tests__/components/` - Individual component tests
- `setupTests.js` - Test environment configuration

## 🌐 API Integration

The application consumes the **Rick and Morty API**:

- **Base URL**: https://rickandmortyapi.com/api
- **Characters Endpoint**: `/character`
- **Episodes Endpoint**: `/episode`
- **Locations Endpoint**: `/location`

### API Features

- **Pagination** - Handle large datasets efficiently
- **Filtering** - Server-side filtering capabilities
- **Error Handling** - Robust error handling and retry logic
- **Caching Strategy** - Optimized data fetching

## 🎨 Design System

### Color Palette

- **Primary**: `#00bcd4` (Cyan)
- **Secondary**: `#ff5722` (Deep Orange)
- **Background**: `#0a0e1a` (Dark Blue)
- **Surface**: `#1a1d29` (Dark Gray)
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#b3b3b3` (Light Gray)

### Typography

- **Font Family**: System fonts stack for optimal performance
- **Responsive Sizing**: Mobile-first typography scaling
- **Line Heights**: Optimized for readability

### Layout

- **Mobile-First**: Responsive design starting from 320px
- **Breakpoints**: 576px, 768px, 992px, 1200px
- **Grid System**: Bootstrap 5 grid with CSS Grid enhancements
- **Spacing**: Consistent spacing using CSS custom properties

## 🔧 Module Federation Configuration

### Shell (Host)

```javascript
remotes: {
  characters: 'characters@http://localhost:3001/remoteEntry.js',
  characterDetail: 'characterDetail@http://localhost:3002/remoteEntry.js'
}
```

### Characters (Remote)

```javascript
exposes: {
  './Characters': './src/Components/Characters'
}
```

### Character Detail (Remote)

```javascript
exposes: {
  './CharacterDetail': './src/Components/CharacterDetail'
}
```

## 📱 Responsive Design

### Mobile-First Approach

- **Base styles**: Designed for mobile (320px+)
- **Progressive enhancement**: Desktop features added via media queries
- **Touch-friendly**: Optimized for touch interactions
- **Performance**: Minimal mobile payload

### Breakpoint Strategy

- **Small**: 576px+ (Portrait tablets)
- **Medium**: 768px+ (Landscape tablets)
- **Large**: 992px+ (Desktops)
- **Extra Large**: 1200px+ (Large desktops)

## 🚀 Deployment

### Production Build

```bash
# Build all microfrontends
docker-compose build

# Start production environment
docker-compose up
```

### Individual Builds

```bash
cd <microfrontend>
npm run build
```

### Health Checks

Each container includes health check endpoints:

- Shell: `http://localhost:3000/health`
- Characters: `http://localhost:3001/health`
- Character Detail: `http://localhost:3002/health`

## 🔍 Performance Optimizations

### Bundle Optimization

- **Code Splitting** - Dynamic imports for microfrontends
- **Tree Shaking** - Eliminate unused code
- **Shared Dependencies** - Single React instance across microfrontends
- **Lazy Loading** - Components loaded on demand

### Caching Strategy

- **Static Assets** - Long-term caching with hash-based filenames
- **API Responses** - Browser caching with appropriate headers
- **Service Worker** - Future enhancement for offline support

### Image Optimization

- **Lazy Loading** - Images loaded when entering viewport
- **Error Fallbacks** - Placeholder images for failed loads
- **Responsive Images** - Future enhancement for multiple resolutions

## 🛡️ Security

### Content Security Policy

- Configured in Nginx for XSS protection
- Restricts inline scripts and styles
- Allows necessary external resources

### CORS Configuration

- Proper CORS headers for Module Federation
- Restricted to necessary origins in production
- Preflight request handling

### Input Validation

- Client-side input sanitization
- URL parameter validation
- API response validation

## 🐛 Error Handling

### Error Boundaries

- **Shell Level**: Catches microfrontend errors
- **Component Level**: Isolated error handling
- **Fallback UI**: User-friendly error messages

### API Error Handling

- **Network Errors**: Retry mechanisms with exponential backoff
- **HTTP Errors**: Specific error messages based on status codes
- **Timeout Handling**: Request timeout configuration

### Logging Strategy

- **Structured Logging**: Consistent log formats
- **Error Tracking**: Comprehensive error information
- **Performance Monitoring**: Request timing and metrics

## 🔄 Development Workflow

### Hot Module Replacement

- **Live Reload**: Instant feedback during development
- **State Preservation**: Maintain component state during updates
- **Error Recovery**: Automatic recovery from build errors

### Module Federation Development

- **Independent Development**: Each microfrontend can be developed separately
- **Integration Testing**: Test microfrontend integration locally
- **Fallback Handling**: Graceful degradation when remotes are unavailable

## 📊 Browser Support

### Supported Browsers

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Progressive Enhancement

- **Core Features**: Work in all supported browsers
- **Enhanced Features**: Use feature detection for advanced capabilities
- **Polyfills**: Minimal polyfills for essential features

## 🤝 Contributing

### Development Guidelines

1. **Component Structure**: Follow established patterns
2. **Testing**: Maintain test coverage above 80%
3. **Accessibility**: Follow WCAG 2.1 guidelines
4. **Performance**: Monitor bundle size and performance metrics

### Code Style

- **Naming Conventions**: English names for components, IDs, classes
- **Comments**: English comments with natural language
- **File Organization**: Consistent file and folder structure

## 📄 License

This project is for educational and demonstration purposes.

## 🙏 Acknowledgments

- **Rick and Morty API**: https://rickandmortyapi.com/
- **React Team**: For the amazing framework
- **Webpack Team**: For Module Federation capabilities
- **Bootstrap Team**: For the UI framework

---

**Built with ❤️ using modern web technologies and microfrontends architecture**
