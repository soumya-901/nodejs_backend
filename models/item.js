const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const itemSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    title: {
        required: true,
        type: String
    },
    price:{
        required:true,
        type:Number
    },
})
// dataSchema.pre('save', async function(next){
//     if (this.isModified('password')) {
//         console.log("hello")
//         this.password= await bcrypt.hash(this.password,12);
//         // this.password=bcrypt.hash(this.password,12);
//     }
//     next();
// });

// // generating token
// dataSchema.methods.generateAuthToken = async function() {
//     try {
//         let token = jwt.sign({_id:this._id} ,process.env.SECRET_KEY);
//         this.tokens=this.tokens.concat({token:token});
//         await this.save();
//         return token;
//     } catch (error) {
//         console.log(error)
//     }
    
// }

const Data =  mongoose.model('ITEM', itemSchema);
module.exports=Data;