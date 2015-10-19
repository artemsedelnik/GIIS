var sheet = [20,20];
var checkPoint = 0;
var segment = {
    firstBound: { coordX: 0, coordY: 0, coordZ: 0, coordW: 1},
    secondBound: { coordX: 0, coordY: 0, coordZ: 0, coordW: 1}
};
var table_states = [];

window.onload = function(){
    createTable(sheet);
    var div = document.getElementById('fourth_div');
    div.hidden = 1;
    CDA(false);
    $('#cda').on('click', function(){
        CDA(false);
    });
    $('#abr').on('click', function(){
        algBr(false);
    });
    $('#avu').on('click', function(){
        algVu(false);
    });
    $("#clear").on('click', clearTable);
    $("#more").on('click', function(){
        if (sheet[0] === 320) {
            alert ("Maximum resolution!");
            return;
        }
        else {
            zoomBigTable(sheet);
        }
    });
    $("#less").on('click', function(){
        if (sheet[0] === 20){
            alert ("Minimum resolution");
            return;
        }
        else {
            zoomSmallTable();
        }
    });
    $("#developer").on('click', function(){
        var table = document.getElementById('table_view');
        var text = document.getElementById('text_field');
        var div = document.getElementById('fourth_div');
        if (table.algorithmMode === 1){
            div.hidden = 0;
            CDA(true);
            text.innerHTML = '';
        }
        if (table.algorithmMode === 2){
            div.hidden = 0;
            algBr(true);
            text.innerHTML = '';
        }
        if (table.algorithmMode === 3){
            div.hidden = 0;
            algVu(true);
            text.innerHTML = '';
        }
    });
    $("#user").on('click', function(){
        var table = document.getElementById('table_view');
        var text = document.getElementById('text_field');
        var div = document.getElementById('fourth_div');
        if (table.algorithmMode === 1){
            CDA(false);
            text.innerHTML = '';
            div.hidden = 1;
        }
        if (table.algorithmMode === 2){
            algBr(false);
            text.innerHTML = '';
            div.hidden = 1;
        }
        if (table.algorithmMode === 3){
            algVu(false);
            text.innerHTML = '';
            div.hidden = 1;
        }
    });

    $('#circle').on('click', drawCircle);
    $('#ellipse').on('click', drawEllipse);
    $('#line').on('click', drawLine);
};

function clearTable(){
   /* var table = document.getElementById('table_view');
    createTable(sheet);
    var text = document.getElementById('text_field');
    text.innerHTML = '';*/

    var text = document.getElementById('text_field');
    text.innerHTML = '';
    var tds = document.getElementsByTagName('td');
    for (var i = 0; i < tds.length; i++){
        tds[i].style.backgroundColor = 'white';
    }
}

function zoomBigTable(sheet){
    var table = document.getElementById('table_view');
    var table2 = table.cloneNode(true);
    table_states.unshift(table2);
    var tr = document.getElementsByTagName('tr');
    for (var i = 0; i < sheet[0]; i++){
        for (var j = sheet[1]; j < sheet[1] * 2; j++){
            var td = document.createElement('td');
            td.positionX = j;
            td.positionY = i;
            tr[i].appendChild(td);
        }
    }
    for (var i = sheet[0]; i < sheet[0] * 2; i++){
        var tr = document.createElement('tr');
        table.appendChild(tr);
        for (var j = 0; j < sheet[1] * 2; j++){
            var td = document.createElement('td');
            td.positionX = j;
            td.positionY = i;
            tr.appendChild(td);
        }
    }
    sheet[0] = sheet[0] * 2;
    sheet[1] = sheet[1] * 2;
    return sheet;
}

function zoomSmallTable(){
    var div1 = document.getElementById('first_div');
    var table = document.getElementById('table_view');
    div1.removeChild(table);
    div1.appendChild(table_states[0]);
    table_states.shift();
    if(table_states.length === 0) {
        sheet[0] = 10;
        sheet[1] = 10;
    }
}


function createTable(sheet){
    $('tr').remove();
    checkPoint = 0;
    var table = document.getElementById('table_view');
    for (var i = 0; i < sheet[0]; i++){
        var tr = document.createElement('tr');
        table.appendChild(tr);
        for (var j = 0; j < sheet[1]; j++){
            var td = document.createElement('td');
            td.positionX = j;
            td.positionY = i;
            tr.appendChild(td);
        }
    }
    return table;
}

function plot (x, y, grad){
    //alert(x + " " + y + " " + grad);
    var trs = document.getElementsByTagName("tr");
    var tds = trs[y].getElementsByTagName('td');
    tds[x].style.backgroundColor = 'rgba(0,0,0,' + grad + ')';

}

function sign (arg) {
    if (arg == 0) return 0;
    if (arg > 0) return 1;
    if (arg < 0) return -1;
}



