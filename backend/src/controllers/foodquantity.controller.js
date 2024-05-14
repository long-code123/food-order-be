const db = require("../models")
const Foodquantity = db.foodquantity;

const createFoodquantity = async (req, res) => {
    try {
        if (!req.body.quantity) {
            return res.status(400).json({ message: "Foodquantity is required." });
        }
        const newFoodquantity = {
            orderId: req.body.orderId || null,
            foodId: req.body.foodId || null,
            quantity: req.body.quantity
        };
        const createdFoodquantity = await Foodquantity.create(newFoodquantity);
        res.status(201).json(createdFoodquantity);
        console.log('Create Successfully')
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
        console.error("Error creating foodquantity:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const getFoodquantitys = async (req, res) => {
    try {
        const allFoodquantitys = await Foodquantity.findAll();

        res.status(200).json(allFoodquantitys);
    } catch (error) {
        console.error("Error getting foodquantitys:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getFoodquantityById = async (req, res) => {
    const foodquantityId = req.params.id;

    try {
        const foodquantity = await Foodquantity.findByPk(foodquantityId);

        if (!foodquantity) {
            return res.status(404).json({ message: "Foodquantity not found" });
        }

        res.status(200).json(foodquantity);
    } catch (error) {
        console.error("Error getting foodquantity by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateFoodquantity = async (req, res) => {
    try {
        const foodquantityId = req.params.id;
        const existingFoodquantity = await Foodquantity.findByPk(foodquantityId);
        if (!existingFoodquantity) {
            return res.status(404).json({ message: 'Foodquantity not found' });
        }
        existingFoodquantity.orderId = req.body.orderId || existingFoodquantity.orderId;
        existingFoodquantity.foodId = req.body.foodId || existingFoodquantity.foodId;
        existingFoodquantity.quantity = req.body.quantity || existingFoodquantity.quantity;
        const updatedFoodquantity = await existingFoodquantity.save();
        res.status(200).json(updatedFoodquantity);
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const deleteFoodquantity = async (req, res) => {
    try {
        const orderId = req.params.id;
        const existingFoodquantity = await Foodquantity.findByPk(orderId);
        if (!existingFoodquantity) {
            return res.status(404).json({ message: 'Foodquantity not found' });
        }

        // Xóa món ăn khỏi cơ sở dữ liệu
        await existingFoodquantity.destroy();

        // Trả về thông báo thành công
        res.status(200).json({ message: 'Foodquantity deleted successfully' });
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    getFoodquantitys,
    getFoodquantityById,
    createFoodquantity,
    updateFoodquantity,
    deleteFoodquantity
}
