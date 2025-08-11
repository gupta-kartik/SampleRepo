# Login Page Template Generator

A web application that enables developers to select from multiple login page templates and automatically generates the corresponding implementation code.

## Features

- **Template Selection**: Choose from 4 different login page styles:
  - **Modern**: Clean, minimalist design with smooth animations
  - **Classic**: Traditional corporate style with border design
  - **Gradient**: Eye-catching gradient background with glassmorphism
  - **Dark Mode**: Modern dark theme with subtle accents

- **Live Preview**: Preview each template before making your selection
- **Code Generation**: Generate complete HTML and CSS code for the selected template
- **Copy to Clipboard**: Easy one-click copying of generated code
- **Responsive Design**: Works on desktop and mobile devices

## How to Use

1. **Open the Application**: Open `index.html` in your web browser
2. **Browse Templates**: View the available login page templates in the grid
3. **Preview**: Click "Preview" on any template to see how it looks
4. **Generate Code**: Click "Generate Code" once you've selected a template
5. **Copy Code**: Switch between HTML and CSS tabs, then copy the code you need

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: Template selection, preview, and code generation
- **SVG**: Template preview thumbnails

## File Structure

```
├── index.html          # Main application file
├── styles.css          # Application styles and template previews
├── app.js             # JavaScript functionality
└── README.md          # This file
```

## Getting Started

Simply open `index.html` in any modern web browser. No additional setup or dependencies required.

## Browser Support

This application works in all modern browsers that support:
- CSS Grid and Flexbox
- ES6 JavaScript features
- Clipboard API (for copy functionality)

## Customization

You can easily add new templates by:
1. Adding template data to the `templates` object in `app.js`
2. Creating preview styles in `styles.css`
3. Adding a new template card in `index.html`

## License

This project is open source and available under the MIT License.