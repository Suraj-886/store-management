const { where } = require('sequelize/lib/sequelize');
const medicineRepository = require('../dao/medicineRepository');


const getMedicine = async (req, res) => {
    try {
        const getMedicine = await medicineRepository.getAllMedicine();
        return res.status(200).json(getMedicine);
    } catch (error) {
        console.error('Error fetching medicines:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const medicineCreate = async (req, res) => {
    try {
        const { title, type, inventory, price } = req.body;
        const createData = {
            title,
            type,
            inventory,
            price
        }

        if (!title || !type || !inventory || !price) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const newMedicine = await medicineRepository.createMedicine(createData);
        return res.status(201).json(newMedicine)
    } catch (error) {
        console.log('error', error.message)
    }
}


const updateData = async (req, res) => {
    try {
        const id  = req.params;
        // console.log(typeof(id))
        const updateDatafields = req.body;  
        const t  =   await medicineRepository.updateMedicine(updateDatafields,id);
        res.status(200).json({msg : 'Data insert successfull !'})
    } catch (error) {
        console.log('Error :', error.message)
        throw error;
    }
}

const deleteData = async(req, res)=>{
    try {
        const id  = req.params;
        console.log(id)
       const removeRow =  await medicineRepository.removeData(id)
       console.log(removeRow)
       res.status(200).json({msg : "delete data successfuly!"})
    } catch (error) {
        res.status(400).json({msg : "cannot remeve data to database"})
    }
}


module.exports = { 
        getMedicine,
        medicineCreate, 
        updateData,
        deleteData
     };