/**
 * Created by artemsedelnik on 12.10.15.
 */
function algBr(mode){
    var table = document.getElementById('table_view');
    clearTable();
    var text = document.getElementById('text_field');
    table.algorithmMode = 2;
    var checkPoint = 0;
    table.onclick = function(event) {
        if (event.target.tagName != 'TD') return;
        event.target.style.backgroundColor = 'black';
        checkPoint++;
        if (checkPoint == 1){
            text.innerHTML = '';
            segment.firstBound.coordX = event.target.positionX;
            segment.firstBound.coordY = event.target.positionY;
        }
        else if (checkPoint == 2){
            segment.secondBound.coordX = event.target.positionX;
            segment.secondBound.coordY = event.target.positionY;
            //ְכדמנטעל ֱנוחוםחוילא
            var x = segment.firstBound.coordX;
            var y = segment.firstBound.coordY;
            if (mode === true){
                var par = document.createElement('p');
                par.innerHTML = "x = x1 = " + segment.firstBound.coordX.toFixed(2);
                text.appendChild(par);
                var par2 = document.createElement('p');
                par2.innerHTML = "y = y1 = " + segment.firstBound.coordY.toFixed(2);
                text.appendChild(par2);
            }
            var difX = segment.secondBound.coordX - segment.firstBound.coordX;
            var difY = segment.secondBound.coordY - segment.firstBound.coordY;
            if (mode === true){
                var par = document.createElement('p');
                par.innerHTML = "DifX = x2 - x1 = " + segment.secondBound.coordX.toFixed(2) + " - " + segment.secondBound.coordX.toFixed(2) + " = " + difX;
                text.appendChild(par);
                var par2 = document.createElement('p');
                par2.innerHTML = "DifY = y2 - y1 = " + segment.secondBound.coordY.toFixed(2) + " - " + segment.secondBound.coordY.toFixed(2) + " = " + difY;
                text.appendChild(par2);
            }
            var dX = Math.abs(difX);
            var dY = Math.abs(difY);
            var signX = sign(difX);
            var signY = sign(difY);
            var changeFlag;
            var error;

            if (dY > dX){
                var temp = dX;
                dX = dY;
                dY = temp;
                changeFlag = true;
                if (mode === true) {
                    var par = document.createElement('p');
                    par.innerHTML = "E = 2 * dX - dY = " + (2 * dX).toFixed(2) + " - " + dY.toFixed(2) + " = " + error;
                    text.appendChild(par);
                }
            } else {
                changeFlag = false;
                if (mode === true) {
                    var par = document.createElement('p');
                    par.innerHTML = "E = 2 * dY - dX = " + (2 * dY).toFixed(2) + " - " + dX.toFixed(2) + " = " + error;
                    text.appendChild(par);
                }
            }
            error = 2 * dY - dX;
            if (mode === true){
                if (dY > dX){
                    var par2 = document.createElement('p');
                    par2.innerHTML = "Length - " + dX + " is maximum between difX, which equal to " + dY.toFixed(2) + " and difY, which equal to " + dX.toFixed(2);
                    text.appendChild(par2);
                }
                if (dY < dX){
                    var par2 = document.createElement('p');
                    par2.innerHTML = "Length - " + dX + " is maximum between difX, which equal to " + dX.toFixed(2) + " and difY, which equal to " + dY.toFixed(2);
                    text.appendChild(par2);
                }
            }
            for(var i = 1; i <= (dX + 1); i++){
                if (mode === true){
                    var par2 = document.createElement('p');
                    par2.innerHTML = "I: " + i;
                    text.appendChild(par2);
                }
                plot(x, y, 1);
                if (mode === true){
                    var par3 = document.createElement('p');
                    par3.innerHTML = "Plot: " + "X: " + x + " Y: " + y;
                    text.appendChild(par3);
                }
                while (error >= 0){
                    if (mode === true){
                        var par3 = document.createElement('p');
                        par3.innerHTML = "E >= 0";
                        text.appendChild(par3);
                    }
                    if (changeFlag){
                        x += signX;
                        if (mode === true){
                            if (signX > 0){
                                var par3 = document.createElement('p');
                                par3.innerHTML = "X = X + 1 = " + (x - signX) + " + "+ signX + " = " + x;
                                text.appendChild(par3);
                            }
                            if (signX < 0) {
                                var par3 = document.createElement('p');
                                par3.innerHTML = "X = X - 1 = " + (x + signX) + " - "+ signX + " = " + x;
                                text.appendChild(par3);
                            }
                        }
                    } else {
                        y += signY;
                        if (mode === true){
                            if (signY > 0){
                                var par3 = document.createElement('p');
                                par3.innerHTML = "Y = Y + 1 = " + (y - signY) + " + "+ signY + " = " + y;
                                text.appendChild(par3);
                            }
                            if (signY < 0) {
                                var par3 = document.createElement('p');
                                par3.innerHTML = "Y = Y - 1 = " + (y + signY) + " - "+ signY + " = " + y;
                                text.appendChild(par3);
                            }
                        }
                    }
                    error = error - 2 * dX;
                    if (mode === true) {
                        if (dY > dX){
                            var par = document.createElement('p');
                            par.innerHTML = "E = E - 2 * dY = " + (error + 2 * dX) + " - " + (2 * dX) + " = " + error;
                            text.appendChild(par);
                        }
                        if (dY < dX){
                            var par = document.createElement('p');
                            par.innerHTML = "E = E - 2 * dX = " + (error + 2 * dX) + " - " + (2 * dX) + " = " + error;
                            text.appendChild(par);
                        }
                    }
                }
                if (changeFlag){
                    y += signY;
                    if (mode === true){
                        if (signY > 0){
                            var par3 = document.createElement('p');
                            par3.innerHTML = "Y = Y + 1 = " + (y - signY) + " + "+ signY + " = " + y;
                            text.appendChild(par3);
                        }
                        if (signY < 0) {
                            var par3 = document.createElement('p');
                            par3.innerHTML = "Y = Y - 1 = " + (y + signY) + " - "+ signY + " = " + y;
                            text.appendChild(par3);
                        }
                    }
                } else {
                    x += signX;
                    if (mode === true){
                        if (signX > 0){
                            var par3 = document.createElement('p');
                            par3.innerHTML = "X = X + 1 = " + (x - signX) + " + "+ signX + " = " + x;
                            text.appendChild(par3);
                        }
                        if (signX < 0) {
                            var par3 = document.createElement('p');
                            par3.innerHTML = "X = X - 1 = " + (x + signX) + " - "+ signX + " = " + x;
                            text.appendChild(par3);
                        }
                    }
                }
                error = error + 2 * dY;
                if (mode === true) {
                    if (dY > dX){
                        var par = document.createElement('p');
                        par.innerHTML = "E = E + 2 * dX = " + (error - 2 * dY) + " - " + (2 * dY) + " = " + error;
                        text.appendChild(par);
                    }
                    if (dY < dX){
                        var par = document.createElement('p');
                        par.innerHTML = "E = E + 2 * dY = " + (error - 2 * dY) + " - " + (2 * dY) + " = " + error;
                        text.appendChild(par);
                    }
                }
            }
            checkPoint = 0;
        }
    };
}