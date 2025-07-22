import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema(
    {
        videoFiles:{
            type: String, //cloudinary url
            required: true,
        }, 
        thumbnail: {
            type: String, //cloudinary url
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isPublic: {
            type: Boolean,
            default: true,
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        dislikes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }



    }, {timestamps: true}
);

videoSchema.plugin(mongoosePaginate);

export const Video = mongoose.model('Video', videoSchema);