/**
 * Created by ArtemSedelnik on 13.10.15.
 */
function drawCircle(){

    clearTable();
    var radius = 9;
    var x = 0;
    var y = radius;
    var delta = 2 * (1 - radius);
    var limit = 0;
    var err;
    var err1;
    var cells = [];

    function Cell(x, y){
        this.x = x;
        this.y = y;
    }

    function drawCircle(cells){
        var x;
        var y;
        const displacement = radius;
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
            err = 2 * delta + 2 * y - 1;
            if (err > 0) {
                x = x + 1;
                y = y - 1;
                delta = delta + 2 * (x - y + 1);
            } else {
                x = x + 1;
                delta = delta + 2 * x + 1;
            }
        } else if (delta > 0) {
            err1 = 2 * delta - 2 * x - 1;
            if (err1 > 0){
                y = y - 1;
                delta = delta - 2 * y + 1;
            }
            else {
                x = x + 1;
                y = y - 1;
                delta = delta + 2 * (x - y + 1);
            }
        } else if (delta == 0) {
            x = x + 1;
            y = y - 1;
            delta = delta + 2 * (x - y + 1);
        }
    }
    drawCircle(cells);
}