/**
 * Created by ArtemSedelnik on 19.10.15.
 */
function drawHyperbole(a, b){

    clearTable();
    var x = a;
    var y = 0;
    var delta = b * b + 2 * a * b * b - a * a;
    var err;
    var err1;
    var cells = [];
    const displacement = sheet[1] / 2;

    function Cell(x, y){
        this.x = x;
        this.y = y;
    }

    function plotCells(cells){
        var x;
        var y;
        for (var i = 0; i < cells.length; i++){
            x = cells[i].x;
            y = cells[i].y;
            plot(x + displacement, y + displacement, 1);
            plot(x + displacement, -y + displacement, 1);
            plot(-x + displacement, y + displacement, 1);
            plot(-x + displacement, -y + displacement, 1);
        }
    }

    while (x + displacement < sheet[0] && y + displacement < sheet[1] && x + displacement > 0 && y + displacement > 0){
        cells.push(new Cell(x, y));

        if (delta < 0) {

            err = 2 * (delta + a * a * y) + a * a;
            if (err > 0) {
                x = x + 1;
                y = y + 1;
                delta = delta - 2 * a * a * y - a * a + 2 * b * b * x + b * b;
            } else {
                x = x + 1;
                delta = delta + 2 * b * b * x + b * b;
            }
        } else if (delta > 0) {
            err1 = 2 * (delta - b * b * x) - b * b;
            if (err1 > 0){
                y = y + 1;
                delta = delta - 2 * a * a * y - a * a;
            }
            else {
                x = x + 1;
                y = y + 1;
                delta = delta - 2 * a * a * y - a * a + 2 * b * b * x + b * b;
            }
        } else if (delta == 0) {
            x = x + 1;
            y = y + 1;
            delta = delta - 2 * a * a * y - a * a + 2 * b * b * x + b * b;
        }
    }
    plotCells(cells);
}