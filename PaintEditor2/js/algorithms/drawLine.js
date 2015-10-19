/**
 * Created by ArtemSedelnik on 19.10.15.
 */
function drawLine(){

    clearTable();
    var a = 10;
    var b = 5;
    var x = 0;
    var y = b;
    //var delta = a * a  + b * b - a * a * b;
    var delta = b * b - 2 * a * a * b * b - 2 * a * a * b - a * a;
    var limit = 0;
    var err;
    var err1;
    var cells = [];

    function deltaH(delta, x){
        return delta + 2 * b * b * x + b * b;
    }

    function deltaV(delta, y){
        return delta - 2 * a * a * y - a * a;
    }

    function deltaD(delta, x, y){
        return delta + 2 * b * b * x + b * b - 2 * a * a * y - a * a;
    }

    function Cell(x, y){
        this.x = x;
        this.y = y;
    }

    function drawLine(cells){
        var x;
        var y;
        const displacement = a - 1;
        for (var i = 0; i < cells.length; i++){
            x = cells[i].x;
            y = cells[i].y;
            plot(x + displacement, y + displacement, 1);
            //plot(x + displacement, -y + displacement, 1);
            //plot(-x + displacement, y + displacement, 1);
            //plot(-x + displacement, -y + displacement, 1);
        }
    }

    while (y >= limit){

        cells.push(new Cell(x, y));

        if (delta < 0) {
            //err = 2 * delta + 2 * a * y - 1;
            err = Math.abs(deltaH(delta, x)) - Math.abs(deltaD(delta, x, y));
            console.log(Math.abs(deltaH(delta, x)), Math.abs(deltaD(delta, x, y)));
            if (err > 0) {
                x = x + 1;
                y = y - 1;
                //delta = delta + b * b * (2 * x + 1) + a * a * (1 - 2 * y);
                delta = deltaD(delta, x, y);
            } else {
                x = x + 1;
                //delta = delta +  b * b * (2 * x + 1);
                delta = deltaH(delta, x);
            }
        } else if (delta > 0) {
            //err1 = 2 * (delta - b * b * x) - 1;
            err1 = Math.abs(deltaD(delta, x, y)) - Math.abs(deltaV(delta, y));
            if (err1 > 0){
                y = y - 1;
                //delta = delta + a * a * (1 - 2 * y);
                delta = deltaV(delta, y);
            }
            else {
                x = x + 1;
                y = y - 1;
                //delta = delta + b * b * (2 * x + 1) + a * a * (1 - 2 * y);
                delta = deltaD(delta, x, y);
            }
        } else if (delta == 0) {
            x = x + 1;
            y = y - 1;
            //delta = delta + b * b * (2 * x + 1) + a * a * (1 - 2 * y);
            delta = deltaD(delta, x, y);
        }
    }
    drawLine(cells);
}