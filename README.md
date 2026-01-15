# 🎥 Movie Search App

A simple and elegant web application that allows users to search for movies using the OMDB API and save their favorites locally.

## 🌐 Live Demo

Check out the live application: [https://ombd-moviesearch.netlify.app/](https://ombd-moviesearch.netlify.app/)

## ✨ Features

- **🔍 Movie Search**: Search for movies by title using the OMDB API
- **📋 Display Results**: View search results with movie posters, titles, and release years
- **⭐ Favorites Management**: Add movies to your favorites list
- **💾 Local Storage**: Favorites are persisted across browser sessions using localStorage
- **🗑️ Remove Favorites**: Easily remove movies from your favorites
- **📱 Responsive Design**: Clean and mobile-friendly interface
- **🎨 Modern UI**: Card-based layout with a green color theme

## 🛠️ Technologies Used

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling and responsive layout
- **Vanilla JavaScript**: Application logic and API integration
- **OMDB API**: Movie database for search functionality
- **LocalStorage API**: Client-side data persistence

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Chandramani04/Movie-Search.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Movie-Search
   ```

3. Open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

   Or simply drag and drop the `index.html` file into your browser.

## 🚀 Usage

1. **Search for Movies**: 
   - Enter a movie title in the search box
   - Click the "Search" button or press Enter
   - Browse through the search results

2. **Add to Favorites**:
   - Click the "Add to Favorite" button on any movie card
   - The movie will appear in the Favorites section below

3. **Remove from Favorites**:
   - Scroll to the Favorites section
   - Click "Remove from Favorite" on any movie you want to remove

4. **Persistent Favorites**:
   - Your favorites are automatically saved in your browser
   - They'll be there when you return to the app

## 🔑 API Information

This application uses the [OMDB API](http://www.omdbapi.com/) for fetching movie data.

- **API Endpoint**: `https://www.omdbapi.com/`
- **API Key**: Included in the code (for demonstration purposes)
- **Note**: For production use, consider securing your API key

## 📁 Project Structure

```
Movie-Search/
├── index.html      # Main HTML file
├── style.css       # Stylesheet for the application
├── script.js       # JavaScript logic and API integration
└── README.md       # Project documentation
```

### File Descriptions

- **index.html**: Contains the structure of the web page, including the search section, movie results area, and favorites section
- **style.css**: Provides all styling for the application, including responsive layout and card designs
- **script.js**: Implements the core functionality:
  - API calls to OMDB
  - Search functionality
  - Favorites management
  - LocalStorage integration
  - DOM manipulation

## 🎯 Key Features Explained

### Search Functionality
- Uses the OMDB API's search endpoint (`&s=` parameter)
- Handles special characters and spaces in movie titles
- Displays error messages for no results found
- Supports pagination (currently showing first page with 10 results)

### Favorites System
- Uses an array to store favorite movies
- Each favorite contains: imdbID, title, year, and poster URL
- Prevents duplicate entries
- Syncs with localStorage for persistence
- Automatically loads favorites on page load

### Error Handling
- Network error handling for API requests
- Input validation for empty search queries
- User-friendly error messages

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Open a Pull Request

## 📝 Future Enhancements

- Add movie detail page with more information
- Implement pagination for search results
- Add filters (by year, genre, etc.)
- Include movie ratings and reviews
- Add export/import functionality for favorites
- Implement dark mode theme

## 📄 License

This project is open source and available for educational purposes.

## 👤 Author

Made with ❤️ by You

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
