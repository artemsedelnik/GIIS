/**
 * Created by artemsedelnik on 12.10.15.
 */
function CDA(mode){
    var table = document.getElementById('table_view');
    clearTable();
    var text = document.getElementById('text_field');
    table.algorithmMode = 1;
    var checkPoint = 0;
    table.onclick = function(event) {
        var x1, x2, y1, y2;
        var length;
        if (event.target.tagName != 'TD') return;
        event.target.style.backgroundColor = 'black';
        checkPoint++;
        if (checkPoint === 1){
            text.innerHTML = '';
            segment.firstBound.coordX = event.target.positionX;
            segment.firstBound.coordY = event.target.positionY;
        }
        else if (checkPoint === 2){
            segment.secondBound.coordX = event.target.positionX;
            segment.secondBound.coordY = event.target.positionY;
            //Алгоритм цифрового дифференциального анализатора
            var difX = segment.secondBound.coordX - segment.firstBound.coordX;
            var mdifX = Math.abs(difX);
            var difY = segment.secondBound.coordY - segment.firstBound.coordY;
            var mdifY = Math.abs(difY);
            (mdifX > mdifY) ? length = mdifX : length = mdifY;
            if (mode === true){
                var par = document.createElement('p');
                par.innerHTML = "Length - " + length + " is maximum between difX, which equal to " + difX.toFixed(2) + " and difY, which equal to " + difY.toFixed(2);
                text.appendChild(par);
            }
            var dx = difX / length;
            var dy = difY / length;
            if (mode === true){
                var par = document.createElement('p');
                par.innerHTML = "Result of calculating: dX = difX / length = " + difX + " / " + length + " = " + dx.toFixed(2) + ", dY = difY / length = " + difY + " / " + length + " = " + dy.toFixed(2);
                text.appendChild(par);
            }
            var x = segment.firstBound.coordX + 0.5 * sign(Math.abs(dx));
            var y = segment.firstBound.coordY + 0.5 * sign(Math.abs(dy));
            if (mode === true){
                var par = document.createElement('p');
                par.innerHTML = "End point information: x = x1 + 0.5 * sign(dx) = " + segment.firstBound.coordX + " + 0.5 * " + sign(Math.abs(dx).toFixed(2)) + " = " + x;
                text.appendChild(par);
                var par2 = document.createElement('p');
                par2.innerHTML = "End point information: y = y1 + 0.5 * sign(dx) = " + segment.firstBound.coordY + " + 0.5 * " + sign(Math.abs(dy).toFixed(2)) + " = " + y;
                text.appendChild(par2);
            }
            plot(Math.floor(x), Math.floor(y), 1);
            if (mode === true){
                var par3 = document.createElement('p');
                par3.innerHTML = "Plot: " + "X: " + Math.floor(x) + " Y: " + Math.floor(y);
                text.appendChild(par3);
            }
            var i = 0;
            if (mode === true){
                var par = document.createElement('p');
                par.innerHTML = "I: " + i;
                text.appendChild(par);
            }
            while (i < length){
                x = x + dx;
                y = y + dy;
                if (mode === true){
                    var par = document.createElement('p');
                    par.innerHTML = "New point information: x = x + dx = " + (x - dx).toFixed(2) + " + " + dx.toFixed(2) + " = " + x.toFixed(2);
                    text.appendChild(par);
                    var par2 = document.createElement('p');
                    par2.innerHTML = "New point information: y = y + dy = " + (y - dy).toFixed(2) + " + " + dy.toFixed(2) + " = " + y.toFixed(2);
                    text.appendChild(par2);
                }
                plot(Math.floor(x), Math.floor(y), 1);
                if (mode === true){
                    var par = document.createElement('p');
                    par.innerHTML = "Plot: " + "X: " + Math.floor(x) + " Y: " + Math.floor(y);
                    text.appendChild(par);
                }
                i = i + 1;
                if (mode === true){
                    var par2 = document.createElement('p');
                    par2.innerHTML = "I: " + i;
                    text.appendChild(par2);
                }
            }
            checkPoint = 0;
        }
    };
}