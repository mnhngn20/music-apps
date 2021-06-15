export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject, ...updatedProperties
        }
}

export const getTimeCodeFromNum = (num) => {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    const hours = parseInt(minutes / 60);
    minutes -= hours * 60;
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(
      seconds % 60
    ).padStart(2, 0)}`;
}

export const checkIsPlaying = (trackId, playTrackId) => {
  if(trackId === playTrackId) return true
  else return false;
}

export const convertArtistNames = artists => {
  let name = '';
  for(let key in artists){
      name += artists[key].name + ', ';
  }
  name = name.slice(0, name.length -2);
  console.log(name)
  return name;
}