# Malaysian Civil & MEP Contractors Hub

A comprehensive platform for Malaysian Civil and MEP (Mechanical, Electrical, and Plumbing) contractors to manage projects, ensure compliance with local regulations, and connect with specialists.

## Features

- **Project Bid Engine**: Generate accurate project bids with comprehensive cost database tailored for Malaysian construction
- **Compliance Tracker**: Stay up-to-date with Malaysian building codes, CIDB requirements, and local regulations
- **Specialist Marketplace**: Connect with qualified MEP specialists across Malaysia
- **Site Management Tools**: Manage construction sites efficiently
- **Material Alerts**: Get notified about material price changes and availability
- **Monsoon Risk Planner**: Plan construction schedules around Malaysia's monsoon seasons
- **Building Automation Integration**: Connect with building automation systems

## Technology Stack

- **Frontend**: React 19, Vite 7, Tailwind CSS 4, Framer Motion 12
- **UI Components**: Radix UI
- **Routing**: React Router 7
- **Form Handling**: React Hook Form, Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v10 or higher)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/your-username/malaysian-contractors-app.git
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Start the development server
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
malaysian-contractors-app/
├── backend/               # Backend API mock services
├── Documentation/         # Project documentation
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, fonts, etc.
│   ├── components/        # Reusable components
│   │   ├── ui/            # UI components (buttons, cards, etc.)
│   │   └── ...            # Other components
│   ├── lib/               # Utilities and helpers
│   ├── pages/             # Page components
│   ├── styles/            # Global styles
│   ├── App.jsx            # Main App component
│   └── main.jsx           # Entry point
├── .gitignore
├── index.html
├── jsconfig.json
├── package.json
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## Documentation

For more information about the platform, check the documentation in the `/Documentation` folder.

## License

This project is licensed under the MIT License - see the LICENSE file for details.