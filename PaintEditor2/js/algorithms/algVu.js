/**
 * Created by artemsedelnik on 12.10.15.
 */
function algVu(mode) {
    var table = document.getElementById('table_view');
    clearTable();
    var text = document.getElementById('text_field');
    table.algorithmMode = 3;
    var checkPoint = 0;
    table.onclick = function (event) {
        var x1, x2, y1, y2;
        var length;
        if (event.target.tagName != 'TD') return;
        event.target.style.backgroundColor = 'black';
        checkPoint++;
        if (checkPoint === 1) {
            text.innerHTML = '';
            segment.firstBound.coordX = event.target.positionX;
            segment.firstBound.coordY = event.target.positionY;
        }
        else if (checkPoint === 2) {
            segment.secondBound.coordX = event.target.positionX;
            segment.secondBound.coordY = event.target.positionY;
            //Алгоритм Ву
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

            if (dY > dX){
                changeFlag = true;
                var error = 2 * dX - dY;
                if (mode === true) {
                    var par = document.createElement('p');
                    par.innerHTML = "E = 2 * dX - dY = " + (2 * dX).toFixed(2) + " - " + dY.toFixed(2) + " = " + error;
                    text.appendChild(par);
                }
                var error_values = [];
                error_values[0] = -2 * dY;
                for (var i = 1; i <= 10; i++){
                    error_values[i] = error_values[0] + (i / 5) * 2 * dY;
                }
                if (mode === true) {
                    var par = document.createElement('p');
                    par.innerHTML = "Gradient borders: right - " + error_values[10] + ", left - " + error_values[0];
                    text.appendChild(par);
                }
                for (i = 1; i <= (dY + 1); i++) {
                    if (mode === true){
                        var par2 = document.createElement('p');
                        par2.innerHTML = "I: " + i;
                        text.appendChild(par2);
                    }
                    for (var j = 0; j < error_values.length; j++) {
                        if (error > error_values[j] && error <= error_values[j + 1]) {
                            if (mode === true) {
                                var par = document.createElement('p');
                                par.innerHTML = "Error is entered in " + (j + 1) + " piece of gradient line";
                                text.appendChild(par);
                            }
                            var grad2 = (j + 1) / 10;
                            var grad1 = 1 - grad2;
                            if (mode === true) {
                                var par = document.createElement('p');
                                par.innerHTML = "Gradient level for first candidate is" + grad2.toFixed(2);
                                text.appendChild(par);
                                var par2 = document.createElement('p');
                                par2.innerHTML = "Gradient level for second candidate is" + grad1.toFixed(2);
                                text.appendChild(par2);
                            }
                        }
                    }
                    if (dX === dY){
                        plot(x, y, 1);
                        if (mode === true){
                            var par3 = document.createElement('p');
                            par3.innerHTML = "Pixel of diagonal line: " + "X: " + x + ", Y: " + y + ", Gradient: " + 1;
                            text.appendChild(par3);
                        }
                    }
                    if (difX < 0){
                        plot(x, y, grad1);
                        plot(x - 1, y, grad2);
                        if (mode === true){
                            var par3 = document.createElement('p');
                            par3.innerHTML = "First candidate: " + "X: " + x + ", Y: " + y + ", Gradient: " + grad1.toFixed(2);
                            text.appendChild(par3);
                            var par4 = document.createElement('p');
                            par4.innerHTML = "Second candidate: " + "X - 1: " + (x - 1) + ", Y: " + y + ", Gradient: " + grad2.toFixed(2);
                            text.appendChild(par4);
                        }
                    }
                    if (difX > 0){
                        plot(x, y, grad1);
                        plot(x + 1, y, grad2);
                        if (mode === true){
                            var par3 = document.createElement('p');
                            par3.innerHTML = "First candidate: " + "X: " + x + ", Y: " + y + ", Gradient: " + grad1.toFixed(2);
                            text.appendChild(par3);
                            var par4 = document.createElement('p');
                            par4.innerHTML = "Second candidate: " + "X + 1: " + (x + 1) + ", Y: " + y + ", Gradient: " + grad2.toFixed(2);
                            text.appendChild(par4);
                        }
                    }
                    if (difX === 0){
                        plot(x, y, 1);
                        if (mode === true){
                            var par3 = document.createElement('p');
                            par3.innerHTML = "Pixel of vertical line: " + "X: " + x + ", Y: " + y + ", Gradient: " + 1;
                            text.appendChild(par3);
                        }
                    }
                    while (error >= 0) {
                        if (mode === true){
                            var par3 = document.createElement('p');
                            par3.innerHTML = "E >= 0";
                            text.appendChild(par3);
                        }
                        if (changeFlag) {
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
                        error = error - 2 * dY;
                        if (mode === true) {
                            var par = document.createElement('p');
                            par.innerHTML = "E = E - 2 * dY = " + (error + 2 * dY) + " - " + (2 * dY) + " = " + error;
                            text.appendChild(par);
                        }
                    }
                    if (changeFlag) {
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
                    error = error + 2 * dX;
                    if (mode === true) {
                        var par = document.createElement('p');
                        par.innerHTML = "E = E + 2 * dX = " + (error - 2 * dX) + " - " + (2 * dX) + " = " + error;
                        text.appendChild(par);
                    }
                }
                checkPoint = 0;
            } else {
                changeFlag = false;
                var error = 2 * dY - dX;
                if (mode === true) {
                    var par = document.createElement('p');
                    par.innerHTML = "E = 2 * dY - dX = " + (2 * dY).toFixed(2) + " - " + dX.toFixed(2) + " = " + error;
                    text.appendChild(par);
                }
                var error_values = [];
                error_values[0] = -2 * dX;
                for (i = 1; i <= 10; i++){
                    error_values[i] = error_values[0] + (i / 5) * 2 * dX;
                }
                if (mode === true) {
                    var par = document.createElement('p');
                    par.innerHTML = "Gradient borders: right - " + error_values[10] + ", left - " + error_values[0];
                    text.appendChild(par);
                }
                for (i = 1; i <= (dX + 1); i++) {
                    if (mode === true){
                        var par2 = document.createElement('p');
                        par2.innerHTML = "I: " + i;
                        text.appendChild(par2);
                    }
                    for (var j = 0; j < error_values.length; j++) {
                        if (error > error_values[j] && error <= error_values[j + 1]) {
                            if (mode === true) {
                                var par = document.createElement('p');
                                par.innerHTML = "Error is entered in " + (j + 1) + " piece of gradient line";
                                text.appendChild(par);
                            }
                            var grad2 = (j + 1) / 10;
                            var grad1 = 1 - grad2;
                            if (mode === true) {
                                var par = document.createElement('p');
                                par.innerHTML = "Gradient level for first candidate is" + grad2.toFixed(2);
                                text.appendChild(par);
                                var par2 = document.createElement('p');
                                par2.innerHTML = "Gradient level for second candidate is" + grad1.toFixed(2);
                                text.appendChild(par2);
                            }
                        }
                    }
                    if (dX === dY){
                        plot(x, y, 1);
                        if (mode === true){
                            var par3 = document.createElement('p');
                            par3.innerHTML = "Pixel of diagonal line: " + "X: " + x + ", Y: " + y + ", Gradient: " + 1;
                            text.appendChild(par3);
                        }
                    }
                    if (difY < 0){
                        plot(x, y, grad1);
                        plot(x, y - 1, grad2);
                        if (mode === true){
                            var par3 = document.createElement('p');
                            par3.innerHTML = "First candidate: " + "X: " + x + ", Y: " + y + ", Gradient: " + grad1.toFixed(2);
                            text.appendChild(par3);
                            var par4 = document.createElement('p');
                            par4.innerHTML = "Second candidate: " + "X: " + x + ", Y - 1: " + (y - 1) + ", Gradient: " + grad2.toFixed(2);
                            text.appendChild(par4);
                        }
                    }
                    if (difY > 0){
                        plot(x, y, grad1);
                        plot(x, y + 1, grad2);
                        if (mode === true){
                            var par3 = document.createElement('p');
                            par3.innerHTML = "First candidate: " + "X: " + x + ", Y: " + y + ", Gradient: " + grad1.toFixed(2);
                            text.appendChild(par3);
                            var par4 = document.createElement('p');
                            par4.innerHTML = "Second candidate: " + "X: " + x + ", Y + 1: " + (y + 1) + ", Gradient: " + grad2.toFixed(2);
                            text.appendChild(par4);
                        }
                    }
                    if (difY === 0){
                        plot(x, y, 1);
                        if (mode === true){
                            var par3 = document.createElement('p');
                            par3.innerHTML = "Pixel of horizontal line: " + "X: " + x + ", Y: " + y + ", Gradient: " + 1;
                            text.appendChild(par3);
                        }
                    }
                    while (error >= 0) {
                        if (mode === true){
                            var par3 = document.createElement('p');
                            par3.innerHTML = "E >= 0";
                            text.appendChild(par3);
                        }
                        if (changeFlag) {
                            x += signX;
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
                        } else {
                            y += signY;
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
                        error = error - 2 * dX;
                        if (mode === true) {
                            var par = document.createElement('p');
                            par.innerHTML = "E = E - 2 * dY = " + (error + 2 * dX) + " - " + (2 * dX) + " = " + error;
                            text.appendChild(par);
                        }
                    }
                    if (changeFlag) {
                        y += signY;
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
                    } else {
                        x += signX;
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
                    error = error + 2 * dY;
                    if (mode === true) {
                        var par = document.createElement('p');
                        par.innerHTML = "E = E + 2 * dY = " + (error - 2 * dY) + " - " + (2 * dY) + " = " + error;
                        text.appendChild(par);
                    }
                }
                checkPoint = 0;
            }
        }
    }
}