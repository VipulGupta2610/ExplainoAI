import mongoose, { Schema } from "mongoose"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isPass:{
        type:Boolean,
        default:true,
        
    },
    password: {
        type: String,
        required: function(){
            return this.isPass === true
        }
    },
    package: {
        type: String,
        enum: ["Free", "Pro"],
        default: "Free"
    },
    totalVideos: [{
        videoName: {
            type: String,
        },
        type: {
            type: String,
        },
        status: {
            type: String,
            default: "Completed"
        },
        duration: {
            type: Number,
        },
        niche: {
            type: String,
        },
        generatedAt: {
            type: Date
        }
    }
    ],
    creditAval: {
        type: Number,
        default: 5
    },
}, { timestamps: true })

const user = mongoose.model("User", userSchema)
export default user;
