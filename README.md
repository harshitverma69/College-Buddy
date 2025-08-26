# College Buddy Frontend

This is the frontend application for College Buddy, built with React and Vite. It provides a modern, responsive interface for managing and sharing study notes.

## Features

- 📚 **Notes Library**: Browse, search, and filter study notes
- 🔐 **Authentication**: Secure login system with Supabase
- 📤 **Upload Notes**: Share your study materials with other students
- 🔍 **Advanced Search**: Filter by course, semester, and search terms
- 💾 **Download & View**: Access notes in various formats
- ❤️ **Like System**: Rate and bookmark useful notes
- 📱 **Responsive Design**: Works on all devices

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
Create a `.env` file in the frontend directory:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Notes Management

### For Authenticated Users
- **Upload Notes**: Click the "Upload Notes" button to share your study materials
- **Like Notes**: Click the heart icon to like useful notes
- **Personal Notes**: View and manage your uploaded notes

### For All Users
- **Browse Notes**: View all shared notes in the library
- **Search & Filter**: Use filters to find specific notes by course or semester
- **Download Notes**: Download notes for offline study
- **View Online**: Preview notes directly in the browser

## File Support

The application supports the following file formats:
- **PDF** - Portable Document Format
- **DOCX** - Microsoft Word documents
- **PPT/PPTX** - PowerPoint presentations

**Maximum file size**: 10MB

## Authentication

The app uses Supabase for authentication. Users can:
- Sign up with email/password
- Sign in with existing credentials
- Access protected features like note uploads

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Page components
│   ├── contexts/      # React contexts (Auth, etc.)
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and clients
│   └── main.jsx       # Application entry point
├── public/            # Static assets
└── package.json       # Dependencies and scripts
```

## Key Components

### NotesSection
- Main notes library interface
- Upload functionality for authenticated users
- Search and filtering capabilities
- Responsive grid layout

### NoteCard
- Individual note display
- Download and view actions
- Like functionality
- Course and semester badges

### Upload Dialog
- File upload form
- Validation and error handling
- Progress indicators
- Success/error feedback

## Styling

The application uses:
- **Tailwind CSS** for utility-first styling
- **Shadcn/ui** for pre-built components
- **Custom CSS** for specific design elements
- **Responsive design** for mobile and desktop

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Adding New Features
1. Create components in the `components/` directory
2. Add pages in the `pages/` directory
3. Update routing in `App.jsx`
4. Test on different screen sizes

## Backend Integration

The frontend communicates with the backend API for:
- Notes CRUD operations
- File uploads
- User authentication
- Search and filtering

**API Base URL**: `http://localhost:5000`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

1. **Notes not loading**
   - Check if the backend server is running
   - Verify API endpoints are accessible
   - Check browser console for errors

2. **Upload fails**
   - Ensure you're logged in
   - Check file size and format
   - Verify backend is running

3. **Authentication issues**
   - Check Supabase configuration
   - Verify environment variables
   - Clear browser cache and cookies

### Getting Help

1. Check the browser console for error messages
2. Verify all environment variables are set
3. Ensure the backend server is running
4. Check network requests in browser dev tools

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
