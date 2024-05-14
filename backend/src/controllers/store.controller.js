const db = require("../models")
const Store = db.stores;

const createStore = async (req, res) => {
    try {
        if (!req.body.storeName || !req.body.address) {
            return res.status(400).json({ message: "Store name and address are required." });
        }
        const newStore = {
            storeName: req.body.storeName,
            storeImage: req.body.storeImage || null,
            address: req.body.address
        };
        const createdStore = await Store.create(newStore);
        res.status(201).json(createdStore);
        console.log('Create Successfully')
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
        console.error("Error creating store:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const getStores = async (req, res) => {
    try {
        const allStores = await Store.findAll();

        res.status(200).json(allStores);
    } catch (error) {
        console.error("Error getting stores:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getStoreById = async (req, res) => {
    const storeId = req.params.id;

    try {
        const store = await Store.findByPk(storeId);

        if (!store) {
            return res.status(404).json({ message: "Store not found" });
        }

        res.status(200).json(store);
    } catch (error) {
        console.error("Error getting store by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateStore = async (req, res) => {
    try {
        const storeId = req.params.id;
        const existingStore = await Store.findByPk(storeId);
        if (!existingStore) {
            return res.status(404).json({ message: 'Store not found' });
        }
        existingStore.storeName = req.body.storeName || existingStore.storeName;
        existingStore.storeImage = req.body.storeImage || existingStore.storeImage;
        existingStore.address = req.body.address || existingStore.address;
        const updatedStore = await existingStore.save();
        res.status(200).json(updatedStore);
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
        console.error("Error updating store:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const deleteStore = async (req, res) => {
    try {
        const storeId = req.params.id;
        const existingStore = await Store.findByPk(storeId);
        if (!existingStore) {
            return res.status(404).json({ message: 'Store not found' });
        }

        // Xóa món ăn khỏi cơ sở dữ liệu
        await existingStore.destroy();

        // Trả về thông báo thành công
        res.status(200).json({ message: 'Store deleted successfully' });
    } catch (error) {
        // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
        console.error("Error deleting store:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    getStores,
    getStoreById,
    createStore,
    updateStore,
    deleteStore
}
