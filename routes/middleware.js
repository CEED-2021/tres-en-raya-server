function logHeaders(req, res, next) {
  console.log(JSON.stringify(req.headers));
  next();
}

function randomDelay(min, random){
  return ( req, res, next ) => {
    setTimeout(next, Math.floor( ( Math.random() * random ) + min ) );
  }
}

export {
  randomDelay,
  logHeaders
}
