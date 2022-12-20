import mongoose from "mongoose"

import Workout from "../models/workoutModel.js"

//get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({ createdAt: -1 })
    res.status(200).json(workouts)
}


//get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such workout" })
    }

    const workout = await Workout.findById(id)
    if (!workout) {
        return res.status(400).json({ error: "no such workout" })
    }

    res.status(200).json(workout)
}

//create a workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }

    if (!load) {
        emptyFields.push('load')
    }

    if (!reps) {
        emptyFields.push('reps')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "please fill in all the fields", emptyFields })
    }

    //add doc to db
    try {
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

    res.json({
        msg: 'post a new workout'
    })
}

//Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such workout" })
    }
    const workout = await Workout.findOneAndUpdate({ _id: id }, {
        ...req.body //spreading like **object in django
    })
    if (!workout) {
        return res.status(400).json({ error: "no such workout" })
    }

    res.status(200).json(workout)
}


//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "no such workout" })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(400).json({ error: "no such workout" })
    }

    res.status(200).json(workout)
}



export { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout }