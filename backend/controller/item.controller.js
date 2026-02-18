// import Item from "../model/item.model.js"

// export const getItem = async(req, res) => {
//     try{
//         const item = await Item.find()
//         res.this.status(200).json(item)
//     } catch (error) {
//         console.log("Error: ", error)
//         res.status(500).json(error)
//     }
// }

import Item from "../model/item.model.js"

export const getItem = async(req, res) => {
    try {
        const item = await Item.find();
        // Fixed: removed '.this'
        res.status(200).json(item); 
    } catch (error) {
        console.log("Error: ", error);
        // Best practice: Send a specific message so Postman isn't empty
        res.status(500).json({ message: error.message });
    }
}