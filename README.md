# 🎰 Scrum Machine

> A real-time collaborative planning poker application for agile teams

[![Live Demo](https://img.shields.io/badge/Live%20Demo-scrummachine.fun-blue?style=for-the-badge)](https://scrummachine.fun/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PartyKit](https://img.shields.io/badge/PartyKit-Real--time-orange?style=for-the-badge)](https://docs.partykit.io/)

![Scrum Machine Demo](https://raw.githubusercontent.com/fcoelho84/scrum-machine/refs/heads/master/public/scrummachine.gif)

## 🎯 Overview

Scrum Machine is a modern, real-time planning poker application designed for agile development teams. It provides an interactive and engaging way for teams to estimate story points collaboratively, with beautiful animations and a jackpot feature that celebrates when the team reaches consensus.

## ✨ Features

### 🎮 Core Functionality

- **Real-time Voting**: Instant synchronization across all team members
- **Multiple Point Systems**: Support for Fibonacci, T-shirt sizes, and custom voting scales
- **Room-based Sessions**: Create private rooms for different teams or projects
- **Spectator Mode**: Allow team members to observe without voting

## 🛠️ Tech Stack

### Frontend

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[DaisyUI](https://daisyui.com/)** - Component library for Tailwind

### Backend & Real-time

- **[PartyKit](https://docs.partykit.io/)** - Real-time multiplayer backend
- **[tRPC](https://trpc.io/)** - End-to-end typesafe APIs
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management

### Development Tools

- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Docker](https://www.docker.com/)** - Containerization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/fcoelho84/scrum-machine.git
   cd scrum-machine
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:

   ```env
   NEXT_PUBLIC_PARTYKIT_URL=your-partykit-url
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Start PartyKit server** (in a separate terminal)

   ```bash
   npm run party
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 🎮 How to Use

1. **Create a Room**: Start a new planning session
2. **Share Room ID**: Invite team members using the room code
3. **Configure Settings**: Choose voting scale, theme, and other preferences
4. **Start Voting**: Team members vote on story points
5. **Reveal Results**: Show all votes simultaneously
6. **Celebrate Consensus**: Enjoy the jackpot animation when everyone agrees!

## 🏗️ Project Structure

```
scrum-machine/
├── src/
│   ├── components/          # Reusable UI components
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Next.js pages and API routes
│   ├── server/             # tRPC server setup
│   ├── styles/             # Global styles
│   └── utils/              # Utility functions
├── party/                  # PartyKit server code
│   ├── message/            # Message handling strategies
│   └── types.ts            # Shared types
├── public/                 # Static assets
└── docker-compose.yml      # Docker configuration
```

## 🎨 Design

The application was designed using Figma with a focus on:

- **Gamification**: Making estimation fun and engaging
- **Accessibility**: Clear visual feedback and intuitive interactions
- **Performance**: Smooth animations and real-time updates

[View Figma Prototype](https://www.figma.com/design/XAjCxXLIids6H88OgreDwG/Scrum-Machine?node-id=0-1&node-type=canvas&t=GoQmLH1qg6ziZAUP-0)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Made with ❤️ for agile teams everywhere**
