import express from "express"
import cards from '../models/dbCardModel.js'


import {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
} from "../controllers/workoutController.js"



const router = express.Router()

// workoutRoutes
router.get('/workouts', getWorkouts)

router.get('/workouts/:id', getWorkout)

router.post('/workouts', createWorkout)

router.delete('/workouts/:id', deleteWorkout)

router.patch('/workouts/:id', updateWorkout)


// tinder routes
router.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
});

router.get('/tinder/cards', (req, res) => {
    cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});

export default router