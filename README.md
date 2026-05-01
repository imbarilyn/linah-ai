# Linah AI

A modern, responsive AI chatbot interface built with React and TypeScript. Linah AI allows users to interact with an AI assistant about professions, experiences, and projects through a sleek chat interface.

## Features

- **Real-time Chat Interface**: Seamless conversation with the AI assistant
- **Markdown Support**: Rich text rendering with syntax highlighting
- **Responsive Design**: Optimized for desktop and mobile devices
- **Dark Theme**: Modern dark UI with Tailwind CSS and DaisyUI
- **Secure Input**: XSS protection with DOMPurify
- **Streaming Responses**: Smooth loading animations during AI responses
- **Custom Fonts**: Unique typography with custom font assets

## Technologies Used

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS 4, DaisyUI
- **Icons**: Lucide React
- **Markdown Processing**: Marked, Highlight.js
- **Security**: DOMPurify
- **Utilities**: UUID for unique message IDs

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/linah-ai.git
   cd linah-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality checks

## Project Structure

```
src/
├── chatbot/
│   ├── ChatPage.tsx          # Main chat interface
│   └── UserInput.tsx         # User input component
├── components/
│   ├── AIChatBubble.tsx      # AI message bubble
│   ├── UserChatBubble.tsx    # User message bubble
│   └── ErrorScreen.tsx       # Error display component
├── modules/
│   └── markdownParser.ts     # Custom markdown renderer
├── services/
│   └── api.ts                # API communication service
├── assets/
│   ├── fonts/                # Custom font files
│   ├── images/               # Logo and images
│   └── material-icons/       # Material icons
└── App.tsx                   # Main app component
```

## API Integration

The app communicates with an AI service via the `sendUserMessage` function in `src/services/api.ts`. Ensure the API endpoint is properly configured for full functionality.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## License

This project is private and not licensed for public use.

## Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- UI components from [DaisyUI](https://daisyui.com/)
