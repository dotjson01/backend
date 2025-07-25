import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            index: true
        },
        username: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            index: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true
        },
        fullname: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            required: true,
        },
        coverimage: {
            type: String,
            required: true,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        },
    },{timestamps: true});

    userSchema.pre("save", async function(next){
        if(!this.isModified("password")) return next();
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }) 
    userSchema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password, this.password);
    }

    userSchema.methods.generateAccessToken = function(){
        return jwt.sign({id: this._id,
            username: this.username,
            email: this.email,
            fullname: this.fullname,
            avatar: this.avatar,
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN});
    }
    userSchema.methods.generateRefreshToken = function(){
        return jwt.sign({id: this._id,
            
        }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN});
    }

export const User = mongoose.model('User', userSchema);
