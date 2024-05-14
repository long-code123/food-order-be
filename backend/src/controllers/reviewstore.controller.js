const db = require("../models")
const Reviewstore = db.reviewstore;

const createReviewstore = async (req, res) => {
    try {
        if (!req.body.rating || !req.body.comment) {
            return res.status(400).json({ message: "Review is required." });
        }
        const newReviewstore = {
            rating: req.body.rating,
            comment: req.body.comment,
            userId: req.body.userId || null,
            storeId: req.body.storeId || null
        };
        const createdReviewstore = await Reviewstore.create(newReviewstore);
        res.status(201).json(createdReviewstore);
        console.log('Create Successfully')
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
        console.error("Error creating reviewstore:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const getReviewstores = async (req, res) => {
    try {
        const allReviewstores = await Reviewstore.findAll();

        res.status(200).json(allReviewstores);
    } catch (error) {
        console.error("Error getting reviewstores:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getReviewstoreById = async (req, res) => {
    const reviewstoreId = req.params.id;

    try {
        const reviewstore = await Reviewstore.findByPk(reviewstoreId);

        if (!reviewstore) {
            return res.status(404).json({ message: "Reviewstore not found" });
        }

        res.status(200).json(reviewstore);
    } catch (error) {
        console.error("Error getting reviewstore by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateReviewstore = async (req, res) => {
    try {
        const reviewstoreId = req.params.id;
        const existingReviewstore = await Reviewstore.findByPk(reviewstoreId);
        if (!existingReviewstore) {
            return res.status(404).json({ message: 'Reviewstore not found' });
        }
        existingReviewstore.rating = req.body.rating || existingReviewstore.rating;
        existingReviewstore.comment = req.body.comment || existingReviewstore.comment;
        existingReviewstore.userId = req.body.userId || existingReviewstore.userId;
        existingReviewstore.storeId = req.body.storeId || existingReviewstore.storeId;

        const updatedReviewstore = await existingReviewstore.save();
        res.status(200).json(updatedReviewstore);
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
        console.error("Error updating reviewstore:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const deleteReviewstore = async (req, res) => {
    try {
        const reviewstoreId = req.params.id;
        const existingReviewstore = await Reviewstore.findByPk(reviewstoreId);
        if (!existingReviewstore) {
            return res.status(404).json({ message: 'Reviewstore not found' });
        }

        // Xóa món ăn khỏi cơ sở dữ liệu
        await existingReviewstore.destroy();

        // Trả về thông báo thành công
        res.status(200).json({ message: 'Reviewstore deleted successfully' });
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
        console.error("Error deleting reviewstore:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    getReviewstores,
    getReviewstoreById,
    createReviewstore,
    updateReviewstore,
    deleteReviewstore
}
