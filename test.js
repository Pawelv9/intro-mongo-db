const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect("mongodb://localhost:27017/intro-to-mongodb");
}

const school = new mongoose.Schema({
    district {
        type: mongoose.Schema.Types.ObjectId
        ref: 'district'
    },
    name: {
        type: String,
        unique: false  
    },
    openSince: Number,
    students: Number,
    isGreat: Boolean,
    staff: [{ type: String }]
})

school.index({
    district: 1,
    name: 1
}, {unique: true})

school.virtual('staffCount')
    .get(function() {
        console.log('in virtual')
        return this.staff.length
    })

const School = mongoose.model('school', school)

connect()
    .then(async connection => {
        const mySchool = await School.create({
            name: 'my school',
            staff: ['v', 't', 'y']
        })
        console.log(mySchool.staffCount)
    })
    .catch(e => console.error(e))