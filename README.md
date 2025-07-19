# Malaysian Civil & MEP Contractors Hub

A comprehensive platform for Malaysian Civil and MEP (Mechanical, Electrical, and Plumbing) contractors to manage projects, ensure compliance with local regulations, and connect with specialists.

[![Build Status](https://img.shields.io/github/actions/workflow/status/USERNAME/REPO/workflow-file.yml?branch=main)](https://github.com/USERNAME/REPO/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## ✨ Features

- **Project Bid Engine**: Generate accurate project bids with comprehensive cost database tailored for Malaysian construction
- **Compliance Tracker**: Stay up-to-date with Malaysian building codes, CIDB requirements, and local regulations
- **Specialist Marketplace**: Connect with qualified MEP specialists across Malaysia
- **Site Management Tools**: Manage construction sites efficiently with real-time updates
- **Material Alerts**: Get notified about material price changes and availability
- **Monsoon Risk Planner**: Plan construction schedules around Malaysia's monsoon seasons
- **Building Automation Integration**: Connect with building automation systems
- **Dark/Light Mode**: Support for both dark and light themes
- **Offline Support**: Progressive Web App (PWA) capabilities for offline usage
- **Responsive Design**: Mobile-first approach for all devices

## 🔧 Services

Our platform offers comprehensive solutions for Malaysian MEP contractors:

- **Civil Engineering**: Structural design, construction management, and site planning services
- **Electrical Systems**: Power distribution, lighting design, and electrical safety solutions
- **Sewerage & Drainage**: Sewerage systems, stormwater management, and flood mitigation
- **ELV Systems**: Communication, security, and building automation systems
- **ACMV Systems**: Air conditioning, mechanical ventilation, and cooling solutions

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS 3, Framer Motion 10
- **UI Components**: Radix UI primitives with custom styling
- **Routing**: React Router 6 with data loading and code splitting
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API with custom hooks
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Icons**: Lucide React for consistent iconography
- **PWA Support**: Service workers for offline functionality
- **Analytics**: Google Analytics and Meta Pixel integration

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/malaysian-contractors-app.git
   cd malaysian-contractors-app
   ```

2. Install dependencies
   ```bash
   npm ci
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
# Option 1: Using npm
npm run build

# Option 2: Using the build script
./build.sh
```

### Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📁 Project Structure

```
malaysian-contractors-app/
├── .github/               # GitHub workflows and configuration
├── backend/               # Backend API mock services
├── Documentation/         # Project documentation
├── public/                # Static assets and PWA files
│   ├── manifest.json      # PWA manifest
│   └── sw.js              # Service worker
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable components
│   │   ├── ui/            # UI components (buttons, cards, etc.)
│   │   └── ...            # Other components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities and helpers
│   ├── pages/             # Page components
│   ├── styles/            # Global styles
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
├── .env                   # Environment variables
├── .env.production        # Production environment variables
├── .eslintrc.json        # ESLint configuration
├── .gitignore            # Git ignore file
├── build.sh              # Build script
├── index.html            # HTML template
├── jsconfig.json         # JavaScript configuration
├── package.json          # Project dependencies
├── postcss.config.js     # PostCSS configuration
├── README.md             # Project documentation
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration
```

## 📚 Documentation

For more information about the platform, check the documentation in the `/Documentation` folder.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For any questions or feedback, please reach out to us at [contact@example.com](mailto:contact@example.com).
