function f(x,y) {return -1 * ( x * x - 2 * x + y * y + 2 * y - 8 )}

var dx = 0.01;
var dy = 0.01;

function climbing(f, x, y){
    while (true){
        console.log('f(%s,%s)=%s',x.toFixed(4), y.toFixed(4), f(x,y).toFixed(4));
        if (f(x + dx, y + dy) > f(x, y)){         // 第一象限
            x = x + dx;
            y = y + dy;
        }
        else if (f(x - dx, y + dy) > f(x, y)){    // 第二象限
            x = x - dx;
            y = y + dy;
        }
        else if (f(x - dx, y - dy) > f(x, y)){    // 第三象限
            x = x - dx;
            y = y - dy;
        }
        else if (f(x + dx, y - dy) > f(x, y)){    // 第四象限
            x = x + dx;
            y = y - dy;
        }
        else {
            break;
        }
    }
}

climbing(f, 0, 0);