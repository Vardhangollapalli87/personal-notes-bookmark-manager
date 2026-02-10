const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');
const bookmarkRoutes = require('./routes/bookmark.routes');
const noteRoutes = require('./routes/note.routes');

dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/bookmarks',bookmarkRoutes);
app.use('/api/notes',noteRoutes);

app.get('/', (req,res)=>{
    res.send('API is running');
});

connectDB();

app.listen(PORT,()=>{
    console.log(`Server is running on port - http://localhost:${PORT}`);
})
