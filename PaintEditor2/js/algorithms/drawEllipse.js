/**
 * Created by ArtemSedelnik on 13.10.15.
 */
function drawEllipse(){

    clearTable();
    var a = 10;
    var b = 5;
    var x = 0;
    var y = b;
    var delta = a * a  + b * b - a * a * b;
    var limit = 0;
    var err;
    var err1;
    var cells = [];

    function Cell(x, y){
        this.x = x;
        this.y = y;
    }

    function drawEllipse(cells){
        var x;
        var y;
        const displacement = a - 1;
        for (var i = 0; i < cells.length; i++){
            x = cells[i].x;
            y = cells[i].y;
            plot(x + displacement, y + displacement, 1);
            plot(x + displacement, -y + displacement, 1);
            plot(-x + displacement, y + displacement, 1);
            plot(-x + displacement, -y + displacement, 1);
        }
    }

    while (y >= limit){

        cells.push(new Cell(x, y));

        if (delta < 0) {
            err = 2 * delta + 2 * a * y - 1;
            if (err > 0) {
                x = x + 1;
                y = y - 1;
                delta = delta + b * b * (2 * x + 1) + a * a * (1 - 2 * y);
            } else {
                x = x + 1;
                delta = delta +  b * b * (2 * x + 1);
            }
        } else if (delta > 0) {
            err1 = 2 * (delta - b * b * x) - 1;
            if (err1 > 0){
                y = y - 1;
                delta = delta + a * a * (1 - 2 * y);
            }
            else {
                x = x + 1;
                y = y - 1;
                delta = delta + b * b * (2 * x + 1) + a * a * (1 - 2 * y);
            }
        } else if (delta == 0) {
            x = x + 1;
            y = y - 1;
            delta = delta + b * b * (2 * x + 1) + a * a * (1 - 2 * y);
        }
    }
    drawEllipse(cells);
}