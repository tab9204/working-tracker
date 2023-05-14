import PocketBase from 'pocketbase';

export const pb = new PocketBase('https://www.chilionrap.com');

export const getAllWorkouts = async ()=>{
    let workouts = [];
    const request = await pb.collection('workouts').getFullList(200, {sort: '-name'});
    request.forEach((workout)=>{
      const data = {
          name: workout.name,
          id: workout.id,
          sets: workout.sets
      }
      workouts.push(data);
    });
    return workouts;
  }

export const getWorkoutDetails = async (id)=>{
  const details = await pb.collection('workouts').getOne(id);
  const workout = {
      id: details.id,
      name: details.name,
      sets: details.sets
  }
  return workout;
}

export const updateWorkout = async (id,updated)=>{
  await pb.collection('workouts').update(id, updated); 
}