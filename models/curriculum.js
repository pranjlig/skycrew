const mongoose = require("mongoose");

const curriculumSchema = new mongoose.Schema({  
    title: String,
    article: String,
    quiz: String,
    viodeUrl: String,
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
});


const Curriculum = mongoose.model("Curriculum", curriculumSchema);

module.exports = Curriculum;