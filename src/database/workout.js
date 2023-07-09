const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const getAllWorkouts = () => {
  return DB.workouts;
};

const getOneWorkout = (workoutId) => {
  return DB.workouts.find((item) => item.id === workoutId) || null;
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
