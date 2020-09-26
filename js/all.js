console.log('hi');

$('#btn').click(function () {
    if (isNaN(bmi)) {
        bmiCalculation();
    } else {
        Clear();
    }

});

$(document).ready(function () {
    showdata();
});
var bmi;
function Clear() {
    $('input[name="height"]').val("");
    $('input[name="weight"]').val("");
    $('#btn').removeClass("result normal tooLight tooHeavy obesity sObesity");
    $('.resulttext').text("").removeClass("normal tooLight tooHeavy obesity sObesity");
    $('#btn>.nub').text("");
    bmi = undefined;
}
function bmiCalculation() {
    let bodyheight = $('input[name="height"]').val();
    let bodyweight = $('input[name="weight"]').val();
    if (!bodyheight || !bodyweight) {
        // console.log('請輸入身高體重');
        return
    };
    if (bodyheight >= 250) {
        // console.log('身高數值異常');
        return
    };

    let height = bodyheight / 100
    bmi = (bodyweight / (height * height)).toFixed(2);
    console.log(bmi);
    $('#btn>.nub').text(bmi);
    if (bmi < 18.5) {
        // console.log('過輕');
        $('#btn').removeClass("result normal tooLight tooHeavy obesity sObesity").addClass("result tooLight");
        $('.resulttext').text('過輕').removeClass("normal tooLight tooHeavy obesity sObesity").addClass("tooLight");
    } else if (bmi < 24) {
        // console.log('理想');
        $('#btn').removeClass("result normal tooLight tooHeavy obesity sObesity").addClass("result normal");
        $('.resulttext').text('理想').removeClass("normal tooLight tooHeavy obesity sObesity").addClass("normal");
    } else if (bmi < 30) {
        // console.log('過重');
        $('#btn').removeClass("result normal tooLight tooHeavy obesity sObesity").addClass("result tooHeavy");
        $('.resulttext').text('過重').removeClass("normal tooLight tooHeavy obesity sObesity").addClass("tooHeavy");
    } else if (bmi < 35) {
        // console.log('輕度肥胖');
        $('#btn').removeClass("result normal tooLight tooHeavy obesity sObesity").addClass("result obesity");
        $('.resulttext').text('輕度肥胖').removeClass("normal tooLight tooHeavy obesity sObesity").addClass("obesity");
    } else if (bmi < 40) {
        // console.log('中度肥胖');
        $('#btn').removeClass("result normal tooLight tooHeavy obesity sObesity").addClass("result obesity");
        $('.resulttext').text('中度肥胖').removeClass("normal tooLight tooHeavy obesity sObesity").addClass("obesity");
    } else {
        // console.log('重度肥胖');
        $('#btn').removeClass("result normal tooLight tooHeavy obesity sObesity").addClass("result sObesity");
        $('.resulttext').text('重度肥胖').removeClass("normal tooLight tooHeavy obesity sObesity").addClass("sObesity");
    }
    savedata(bmi, bodyheight, bodyweight);
};

function savedata(bmi, bodyheight, bodyweight) {
    let dt = new Date();
    let newday = dt.getDate() + "-" + (dt.getMonth() + 1) + "-" + dt.getFullYear();
    let data = {
        'bmi': bmi,
        'height': bodyheight,
        'weight': bodyweight,
        'day': newday,
    }
    // console.log(data);
    let str = JSON.parse(localStorage.getItem("bmi")) || [];
    str.push(data);
    localStorage.setItem("bmi", JSON.stringify(str));
    showdata();
};

function showdata() {
    let dataArray = JSON.parse(localStorage.getItem("bmi")) || [];
    // console.log(dataArray.length);
    $('#datacard').html("");
    var datastr = "";
    dataArray.forEach(function (item, i) {
        // console.log(item);
        // console.log(i);
        var bmitext, adClass;
        if (item.bmi < 18.5) {
            bmitext = "過輕";
            adClass = "tooLight";
        } else if (item.bmi < 24) {
            bmitext = "理想";
            adClass = "normal";
        } else if (item.bmi < 30) {
            bmitext = "過重";
            adClass = "tooHeavy";
        } else if (item.bmi < 35) {
            bmitext = "輕度肥胖";
            adClass = "obesity";
        } else if (item.bmi < 40) {
            bmitext = "中度肥胖";
            adClass = "obesity";
        } else {
            bmitext = "重度肥胖";
            adClass = "sObesity";
        }
        let str = `<div class="card ${adClass}"><p class="">${bmitext}</p><p class="BMI"><span class="sfont">BMI</span><span class="bmidata">${item.bmi}</span></p><p class="weight"><span class="sfont">weight</span><span class="wdata">${item.weight}</span>kg</p><p class="height"><span class="sfont">height</span><span class="hdata">${item.height}</span>cm</p><p class="date"><span class="sfont">${item.day}</span></p><button id="del${i}" class="del" data-itemid="${i}">x</button></div>`;
        // console.log(str);
        datastr += str;
        // console.log(datastr);
    });
    // console.log(datastr);
    $('#datacard').html(datastr);
    
    for (let j = 0; j < dataArray.length; j++) {
        $('#del'+j).click(function (e) {
        console.log('del');
        console.log(e);
        if(e.toElement.localName=="button"){
            let itemid = e.target.dataset.itemid;
            console.log(itemid);
            delBMI(itemid);
        }
    });
    }
};

function delBMI(id){
    let str = JSON.parse(localStorage.getItem("bmi")) || [];
    str.splice(id, 1);
    localStorage.setItem("bmi", JSON.stringify(str));
    showdata();
}

