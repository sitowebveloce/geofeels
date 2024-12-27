# <span style="color:green;">Geofeels</span> 🌍


A Next.js web application that allows visitors to share messages from different locations around the world. Messages are displayed on an interactive map with sentiment analysis, creating a global visualization of people's thoughts and feelings.

![Geofeels](geofeels.gif "Geofeels")

## Features ✨

- **Interactive World Map**: Built with Leaflet.js and OpenStreetMap
- **Location Selection**: Country and city selection with automatic coordinates
- **Sentiment Analysis**: Messages are analyzed for emotional content
- **Real-time Visualization**: Messages appear on the map with color-coded indicators
- **SQLite Database**: Persistent storage of messages
- **Message Management**: Ability to add and delete messages
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack 🛠️

- **Frontend**: Next.js(15), React(19), TypeScript, TailwindCSS
- **Map**: Leaflet.js, OpenStreetMap, leaflet-geosearch
- **Database**: SQLite
- **Analysis**: Sentiment (for emotion analysis)
- **Security**: isomorphic-dompurify (for XSS protection)
- **UI/UX**: react-hot-toast (for notifications)

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository
```bash
git clone git@github.com:sitowebveloce/geofeels.git
cd world-messages-map
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create the SQLite database
```bash
# The database will be automatically created in app/db/database.db
# when you first run the application
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure 📁

```
├── app/
│   ├── _actions/         # Server actions
│   ├── components/       # React components
│   ├── db/              # Database configuration
│   ├── lib/             # Utility functions and types
│   └── page.tsx         # Main page
├── public/              # Static assets
└── types/              # TypeScript type definitions
```

## Key Components 🔧

### WorldMap Component
- Displays an interactive OpenStreetMap
- Handles marker placement and visualization
- Shows tooltips with messages and emojis
- Implements geosearch functionality

### MessageForm Component
- Handles message input and validation
- Implements sentiment analysis
- Sanitizes user input
- Manages form submission

### PlaceSelectors Component
- Manages country and city selection
- Coordinates database operations
- Handles state management
- Controls marker placement

## Database Schema 💾

```sql
CREATE TABLE markers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT,
    country TEXT,
    lat DOUBLE,
    long DOUBLE,
    message TEXT,
    emoji TEXT,
    happiness INTEGER
    created_at TIMESTAMP
)
```

## Contributing 🤝

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Improvement

- Add user authentication
- Implement message categories
- Add message expiration
- Improve marker clustering for dense areas
- Add more sentiment analysis features
- Implement real-time updates
- Add language translation support
- Enhance mobile responsiveness
- Add tests

## License 📝

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Leaflet.js](https://leafletjs.com/) for the amazing mapping library
- [OpenStreetMap](https://www.openstreetmap.org/) for the map data
- [Next.js](https://nextjs.org/) for the awesome framework
- All contributors who help improve this project

## Contact 📧

- Sitowebveloce.it - [@sitowebveloce](https://x.com/sitowebveloce)
- Project Link: [https://github.com/sitowebveloce/geofeels](https://github.com/sitowebveloce/geofeels)

## Support 💪

If you like this project, please give it a ⭐️!

---

<span style="font-size:10px;color:black;"> Built with ❤️ by Alex</span>
