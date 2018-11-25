const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/intro-to-mongodb");
}

const student = new mongoose.Schema({
    firstName: String,
    info: {
        school: {
            type: String
        },
        schoolSize: {
            type: Number
        }    
    },
    school: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'school'
    }
}, {timeStamps: true}) 

const school = new mongoose.Schema({
    type: String,
    openSince: Number,
    students: Number,
    isGreat: Boolean,
    staff: [{ type: String }]
})

const School = mongoose.model('school', school)
const Student = mongoose.model('student', student)

connect()
    .then(async connection => {
        // const school = await School.create({name: 'mlk elementary' })

        const schoolConfig = { 
            name: "mlk elementary",
            openSince: 2009,
            students: 1000,
            isGreat: true,
            staff: ['a', 'b', 't']
     }

        const school2 = {
            name: "Larrys Middle School",
            openSince: 2018,
            students: 5000,
            isGreat: false,
            staff: ['v', 'y', 't']
        };


const schools = await School.create([schoolConfig, school2])

const match = await School.find(
    {
    // students: {$gt: 600, $lt: 800},
    // isGreat: true
    staff: {$in: ['v', 'y', 't']}
}).exec()
        // const school = await School.findOneAndUpdate({ name: 'mlk elementary' }, {name: 'mlk elementary'}, {upsert: true, new: true}).exec()
        // const student = await Student.create({ firstName: 'Tim', school: school._id }).exec()
        // const student2 = await Student.create({
        //   firstName: "WarLord",
        //   school: school._id
        // }).exec();

        // const match = await Student.findById(student.id)
        // .populate('school')
        // .exec()

        // const match = await Student.findOne({_.firstName: "Tim"})
        //     .populate('school')
        //     .exec()

        console.log(match)
    })
    .catch(e => console.error(e))