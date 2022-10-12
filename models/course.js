const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({  
    title: String,
    subtitle: String,
    tag: String,
    price: Number,
    image: String,
    description: String,
    whatStudentLearnHave: String,
    category: { type: String,
        enum: ["Basic Computer Programming", "Blockchain/Web 3"],
    },
    educator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    enrolledUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    curriculums: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Curriculum"
    }]
});


const Course = mongoose.model("Course", courseSchema);

module.exports = Course;