const doWorkCallback = (callback) => {
  setTimeout(()=>{
    //callback('This is my error', undefined)
    callback(undefined, [1,2,5])
  }, 2000)
}

doWorkCallback((error, result) => {
  if (error){
    return console.log(`${error}, there was an error`);
  };
  console.log(result)
});