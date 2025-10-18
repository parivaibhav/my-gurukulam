import Blog from "../models/Blog.js";
import User from "../models/User.js"; // ✅ Make sure to import User for author validation

// -------- Get all blogs --------
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email role") // show limited fields
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, blogs });
  } catch (err) {
    console.error("Get blogs error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const createBlog = async (req, res) => {
  try {
    // Multer parses text fields into req.body
    const { title, content, category, tags } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const author = req.user._id; // from protect middleware
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    const blog = new Blog({ title, content, category, tags, author, image });
    await blog.save();

    res.status(201).json({ success: true, message: "Blog created", blog });
  } catch (err) {
    console.error("Create blog error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------- Update a blog --------
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    // Update fields only if provided
    Object.keys(updates).forEach((key) => {
      blog[key] = updates[key];
    });

    await blog.save();
    res
      .status(200)
      .json({ success: true, message: "Blog updated successfully", blog });
  } catch (err) {
    console.error("Update blog error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// -------- Delete a blog --------
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    await blog.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Delete blog error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
