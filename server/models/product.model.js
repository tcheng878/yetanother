const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    project: { type: String,
            required: [
                true,
                "Project Name is required."
            ],
            minlength: [
                3,
                "Must be at least 3 characters."
            ],
            },
    date: { type: Date,
            required: [
                true,
                "Date is required."
            ] 
        },
    state: { type: Number },
}, { timestamps: true});

module.exports.Product = mongoose.model('Product', ProductSchema);