"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    fullname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.userId = ret._id,
                delete ret._id,
                delete ret._v;
        }
    }
});
exports.UserInstance = mongoose_1.default.model("User", userSchema);
// UserInstance.hasMany(ProductsSchema, {
//   foreignField: "userId",
//   localField: "_id",
//   ref: "Product",
// });
// ProductsSchema.belongsTo(UserInstance, {
//   foreignField: "userId",
//   localField: "_id",
//   ref: "User",
// });
