# Changelog

All notable changes to the MEP Contractors Hub project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2023-12-15

### Added
- New specialized service pages for all five service categories:
  - Civil Engineering
  - Electrical Systems
  - Sewerage & Drainage
  - ELV Systems
  - ACMV Systems
- ServicePageLayout component for consistent service page design
- Detailed Malaysian standards and regulations for each service category
- Enhanced animations and transitions using Framer Motion
- Improved navigation with breadcrumb patterns
- Added eslint-plugin-jsx-a11y for accessibility improvements

### Changed
- Redesigned main Services page with modern UI and animations
- Updated React Router configuration for new service pages
- Enhanced App.jsx with new route definitions
- Updated dependencies to more stable versions:
  - styled-components to version 6.1.1
  - tailwindcss to version 3.3.5
  - postcss to version 8.4.31
  - autoprefixer to version 10.4.16

### Fixed
- Build process issues with Vite configuration
- Compatibility issues with React Router v6
- Dependency conflicts with framer-motion

## [0.1.0] - 2023-12-01

### Added
- Initial project setup
- Basic page structure and navigation
- Core UI components
- Theme system with dark/light mode
- Responsive layout design
- Basic service page structure