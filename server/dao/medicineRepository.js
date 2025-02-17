const { NUMBER, Op, where } = require('sequelize');
const db = require('../config/database');


// get Item by code 
const getItemByCode = async (itemcode, qty) => {
    try {
        const medicine = await db.medicines.findAll({ where: { itemcode: itemcode } });
        if (medicine.length === 0) {
            console.log(`No medicine found for item code: ${itemcode}`);
            return { message: "Medicine not found", totalPrice: 0 };
        }

        // Log details and calculate total price
        let totalPrice = 0;
        medicine.map(medicine => {
            console.log(`Itemcode : ${medicine.itemCode},Inventory: ${medicine.inventory}`);
            const subtotal = medicine.price * qty;
            totalPrice += subtotal;
            console.log(`Subtotal for ${qty} units: ${subtotal}`);
        })
        // console.log(`Total Price: ${totalPrice}`);

    } catch (error) {
        //console.error('Error fetching item by code:', error.message);
        throw error;
    }
}

//get all Medicine to database .
const getAllMedicine = async (storeName) => {
    try {
        const allMedicin = await db.medicines.findAll({ where: { storeName } });
        return allMedicin;
    } catch (error) {
        console.log('data not featch to database', error.message)
        throw error;
    }
}
// get paginated Medicine 
const getPaginatedMedicine = async (searchTerm, limit, offset, page) => {
    try {
        // console.log(searchTerm)
        // Build search filter
        const searchFilter = searchTerm ? {
            [Op.or]: [
                { title: { [Op.like]: `%${searchTerm}%` } },
                { itemCode: { [Op.like]: `%${searchTerm}%` } },
                { storeName: { [Op.like]: `%${searchTerm}%` } }
            ]
        } : {}
        // console.log(searchFilter)
        const { count, rows } = await db.medicines.findAndCountAll({ where: searchFilter, limit, offset });
        // console.log("count :", count); // total data 11
        // console.log("offset :", offset)
        // console.log("limit :", limit);
        // return {
        //     totalItems: count, // calculate the total items 11
        //     totalPages: Math.ceil(count / limit), // calculate the total totalpage 3
        //     currentPage: Math.floor(offset / limit) + 1,// calculate the currentPage 
        //     // currnetPage: page,
        //     hasNext: true,
        //     hasPrev: false,
        //     data: rows,
        // };
        return {
            totalDocs: count, // calculate the total items 11
            totalPages: Math.ceil(count / limit), // calculate the total totalpage 3
            currentPage: Math.floor(offset / limit) + 1,// calculate the currentPage 
            hasNextPage: (count - limit*page) > 0 ? true : false,
            hasPrevPage: page > 1 ? true : false,
            docs: rows,
        }; 
    } catch (error) {
        console.log(error)
        throw error
    } 
}
// create medicine 
const createMedicine = async (createData) => {
    try {
        const newMedicine = await db.medicines.bulkCreate(createData)
        return newMedicine;
    } catch (error) {
        console.error('Error in repository while creating medicine:', error.message);
        throw new Error('Failed to create medicine');
    }
}
//update medicine
const updateMedicine = async (updateDatafields, id) => {
    try {
        // console.log("id ",id , "updta",updateDatafields)
        const upDate = await db.medicines.update(updateDatafields, {
            where: id
        });
        //    console.log(upDate)
    } catch (error) {
        console.log('Error not update fields ', error.message);
        throw error;
    }
}


const removeData = async (id) => {
    try {
        const deleteDataRow = await db.medicines.destroy({ where: id })
    } catch (error) {
        console.log("Error", error.message);
        throw error;
    }
}


module.exports = {
    getAllMedicine,
    createMedicine,
    updateMedicine,
    removeData,
    getPaginatedMedicine,
    getItemByCode
}