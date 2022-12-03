const router = require("express").Router();
//const User = require("../models/User");
const Book = require("../models/Book");

router.get("/", async (req, res) => {
    try {
        const { userId, username } = req.payload;

        const books = await Book.find({ userId });
            
        res.json({
            status: "success",
            message: "all books of this users succeffully fetched",
            books
        })

    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: "Some server error",
            error: err.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { userId, username } = req.payload;
        const {id} = req.params;

        const book = await Book.findById(id);
        
        if (!book) {
            return res.status(400).json({
                status: "failed",
                message: "no such book exist with that id"
            });
        }

        res.json({
            status: "success",
            message: "book successfully retrieved with that id",
            book
        });

    } catch (err) {
        res.status(500).json({
            status: "failed",
            message: "Some server error",
            error: err.message,
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { userId, username } = req.payload;
        const { title, isbn, author, description, published_date, publisher } =
            req.body;

        if (!title || !isbn || !author || !description || !published_date || !publisher) {
            return res.status(400).json({
                status: "failed",
                message: "Provide valid inputs"
            });
        }

        const book = await Book.create({
            userId,
            title,
            isbn,
            author,
            description,
            published_date,
            publisher,
        });

        //await book.populate("userId");
        res.json({
            status: "success",
            message: "book added successfully",
            book
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failed",
            message: "server error while adding a book",
            error: err.message
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { userId, username } = req.payload;
        const {id} = req.params;
        const { title, isbn, author, description, published_date, publisher } =
            req.body;

        if (!title || !isbn || !author || !description || !published_date || !publisher) {
            return res.status(400).json({
                status: "failed",
                message: "Provide valid inputs"
            });
        }

        const book = await Book.findByIdAndUpdate(id, {$set: {title, isbn, author, description, published_date, publisher}}, {new: true});

        //await book.populate("userId");
        res.json({
            status: "success",
            message: "book updated successfully",
            book
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failed",
            message: "server error while updating the book",
            error: err.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { userId, username } = req.payload;
        const {id} = req.params;

        const result = await Book.findById(id);

        if (!result) {
            return res.status(400).json({
                status: "failed",
                message: "no such book exist"
            });
        }

        const book = await Book.findByIdAndDelete(id);

        //await book.populate("userId");
        res.json({
            status: "success",
            message: "book deleted successfully",
            book
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: "failed",
            message: "server error while updating the book",
            error: err.message
        });
    }
});

module.exports = router;
