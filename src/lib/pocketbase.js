import PocketBase from 'pocketbase';

export const pb = new PocketBase('https://www.chilionrap.com');

export const getAllWorkouts = async ()=>{
    let workouts = [];
    const request = await pb.collection('workouts').getFullList(200, {sort: '-name'});
    request.forEach((workout)=>{
      const data = {
          name: workout.name,
          id: workout.id,
          sets: workout.sets,
          breakdown: []
      }
      //a workout breakdown lists out every type of set in the workout
      workout.sets.forEach(set => {
          if(!data.breakdown.includes(set.name)){
            data.breakdown.push(set.name);
          }
      });
      workouts.push(data);
    });
    return workouts;
  }