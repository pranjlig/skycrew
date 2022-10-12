const express = require("express");
const router = express.Router();
const User = require("../models/user")
const Course = require("../models/course")
const Curriculum = require("../models/curriculum");


// create course
router.post("/:walletAddress/create-course", async (req, res) => {
 
    const { title, subtitle, tag, price, image, description, whatStudentLearnHave, category, educatorWalletAddress } = req.body;
    const educator = await User.findOne({walletAddress: req.params.walletAddress})
    const newCourse = new Course({educator: educator._id, title, subtitle, tag, price, image, description, whatStudentLearnHave, category, educatorWalletAddress})
    const savedCourse = await newCourse.save();
    educator.coursesCreated.push(savedCourse);
    await educator.save()
    return res.json({course: savedCourse})

});

// delete course
router.delete("/:walletAddress/:courseId", async (req, res) => {
    const courseId = req.params.courseId
    await Curriculum.deleteMany({course: courseId})
    const educator = await User.updateOne({walletAddress: req.params.walletAddress}, {$pull: {coursesCreated: courseId}})
    await Course.findOneAndDelete({_id: courseId})
    return res.json({user: educator})
})

// add curriculum
router.post("/:walletAddress/courses/:courseId/add-curriculum", async (req, res) => {

    const { title, article, videoUrl, quiz} = req.body;
    const courseId = req.params.courseId
    const newCurriculum = new Curriculum({ title, article, videoUrl, quiz, course: courseId});
    const savedCurriculum = await newCurriculum.save();
    const course = await Course.findOne({_id: courseId})
    course.curriculums.push(savedCurriculum)
    await course.save()
    return res.json({curriculum: savedCurriculum})

});

// delete curriculum
router.delete("/:walletAddress/courses/:courseId/curriculums/:curriculumId", async (req, res) => {
    const curriculumId = req.params.curriculumId
    const course = await Course.updateOne({_id: req.params.courseId}, {$pull: {curriculums: curriculumId}})
    await Curriculum.deleteMany({_id: curriculumId})
    return res.json({course: course})
})

module.exports = router;
