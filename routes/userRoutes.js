import express from 'express'
import { User } from '../models/user.js';

const router = express.Router();

// Create users - post

router.post ('/add-user',async (req,res)=>{
    // console.log(req.body)
    

    try {
        const {name, email} = req.body;
        if(!name || !email){
            return res.status(400).json({msg:'All fields are required'})
        }

        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({msg:'User already exists'})
        }        

        const newUser = new User({name,email})
        await newUser.save();

        return res.status(201).json({msg:'User created successfully',newUser})

    } catch (error) {
        console.log(`Error in creating user ${error.message}`)
        return res.status(500).json({msg:'Error in creating user'})
    }
})


// Get the user details - one user

router.get('/get-user/:id',async (req,res)=>{

const {id} = req.params;

try {
    const user = await User.findById(id)
    if(!user){
        return res.status(404).json({msg:'user not found'})
    }

    return res.status(200).json(user)

} catch (error) {
    console.log(`Error in Getting user ${error.message}`)
    return res.status(500).json({msg:'Error in getting user'})
}
})

// Get all users 

router.get('/get-all-users',async (req,res)=>{

    try {
        const allUsers = await User.find()
        return res.status(200).json(allUsers)

    } catch (error) {
        console.log(`Error in Getting user ${error.message}`)
        return res.status(500).json({msg:'Error in getting user'})
    }
})


// update users 
router.put('/edit-user/:id',async (req,res) => {
    const {id} = req.params;
    const {name, email} = req.body;

    try {
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({msg:'user not found'})
        }

        const updatedUser = await User.findByIdAndUpdate(id,{name:name,email:email})
        return res.status(200).json({msg:'User updated successfully',updatedUser})


    } catch (error) {
        console.log(`Error in updating user ${error.message}`)
        return res.status(500).json({msg:'Error in updating user'})
    }

})

// delete

router.delete('/delete-user/:id',async (req,res)=>{
    const {id} = req.params;

    try {
        const user = await User.findByIdAndDelete(id)
        return res.status(200).json({msg:'User deleted successfully'})

    } catch (error) {
        console.log(`Error in deleting user ${error.message}`)
        return res.status(500).json({msg:'Error in deleting user'})
    }

})


export default router;