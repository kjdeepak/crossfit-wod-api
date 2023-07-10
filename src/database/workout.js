const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

/**
 * @openapi
 * components:
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name:
 *           type: string
 *           example: Tommy V
 *         mode:
 *           type: string
 *           example: For Time
 *         equipment:
 *           type: array
 *           items:
 *             type: string
 *           example: ["barbell", "rope"]
 *         exercises:
 *           type: array
 *           items:
 *             type: string
 *           example: ["21 thrusters", "12 rope climbs, 15 ft", "15 thrusters", "9 rope climbs, 15 ft", "9 thrusters", "6 rope climbs, 15 ft"]
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         trainerTips:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Split the 21 thrusters as needed", "Try to do the 9 and 6 thrusters unbroken", "RX Weights: 115lb/75lb"]
 */
const getAllWorkouts = () => {
  try {
    return DB.workouts;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const getOneWorkout = (workoutId) => {
  try {
  return DB.workouts.find((item) => item.id === workoutId) || null;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    }
  }
};

const createNewWorkout = (newWorkout) => {
  const alreadyAdded = DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;

  if (alreadyAdded) {
    throw {
      status: 400,
      message: `Workout with name '${newWorkout.name}' already exists`,
    };
  }
  try {
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw {
      status: 500,
      message: error?.message || error,
    };
  }
};

const updateOneWorkout = (workoutId, changes) => {
  const index = DB.workouts.findIndex((item) => item.id === workoutId);
  if (index === -1) {
    return null;
  }

  const updatedWorkout = {
    ...DB.workouts[index],
    ...changes,
  };

  DB.workouts[index] = updatedWorkout;

  saveToDatabase(DB);
  return updatedWorkout;
};

const deleteOneWorkout = (workoutId) => {
  const index = DB.workouts.findIndex((item) => item.id === workoutId);
  if (index === -1) {
    return null;
  }

  DB.workouts.splice(index, 1);
  saveToDatabase(DB);
};

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
