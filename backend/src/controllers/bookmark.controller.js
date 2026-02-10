const Bookmark = require('../models/Bookmark.model');

// Create a new bookmark

const createBookmark = async (req,res) =>{
    try{
        const {title,url,description,tags} = req.body;

        if(!title || !url){
            return res.status(400).json({message : 'Title and URL are required'});
        }

        const bookmark = new Bookmark({
            title,
            url,
            description,
            tags,
        });

        await bookmark.save();

        res.status(201).json(bookmark);
    }
    catch(error){
        res.status(500).json({message : error.message});
    }
};

const getBookmarks = async (req, res) => {
  try {
    const { q, tags } = req.query;

    let filter = {};

    if (q) {
      filter.title = { $regex: q, $options: "i" };
    }

    if (tags) {
      filter.tags = { $in: tags.split(",") };
    }

    const bookmarks = await Bookmark.find(filter).sort({ createdAt: -1 });
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET bookmark by ID
const getBookmarkById = async (req, res) => {
  try {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE bookmark
const updateBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.json(bookmark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE bookmark
const deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findByIdAndDelete(req.params.id);

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
    createBookmark,
    getBookmarks, 
    getBookmarkById,
    updateBookmark,
    deleteBookmark,
};