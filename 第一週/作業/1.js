function f (x) { return -1 * ( x * x * x * x - 10 * x * x * x + 20 * x * x + 5 * x + 7) }
// function f(x) { return -1*Math.abs(x*x-4); }

var dx = 0.01

function hillClimbing (f, x) {
  while (true) {
    console.log('f(%s)=%s', x.toFixed(4), f(x).toFixed(4))
    if (f(x + dx) >= f(x)) {
      x = x + dx
    } else if (f(x - dx) >= f(x)) {
      x = x - dx
    } else {
      break
    }
  }
}

hillClimbing(f, 0.0)