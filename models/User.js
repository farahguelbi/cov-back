const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const governorates = [
  "Ariana", "Beja", "Ben Arous", "Bizerte", "Gabes", "Gafsa", "Jendouba",
  "Kairouan", "Kasserine", "Kebili", "Kef", "Mahdia", "Manouba", "Medenine",
  "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse",
  "Tataouine", "Tozeur", "Tunis", "Zaghouan"
];

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  imageUrl:{
    type: String,
    default: "",
  },
  birthDate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  
  governorate: {
    type: String,
    required: true,
    enum: governorates, // Add enum validation
    trim: true
  },
}, { timestamps: true });
userSchema.index({ governorate: 1 }); 
const User = mongoose.model('User', userSchema);
module.exports = User;
