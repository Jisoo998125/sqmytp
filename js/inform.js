/**
 * @method changeCenter
 * @param {int}  year  年份 
 * @param {string} area  地区
 * @api   "/openapi/sqmy/mytp/zxgzsumbyyear.do" 政协工作平台
 * @api   "/openapi/sqmy/mytp/tzxxsumbyyaer.do" 统战信息平台
 * @api   "/openapi/sqmy/mytp/ygrxsumbyyear.do" 1234市民热线
 * @api   "/openapi/sqmy/mytp/threesersumbyyear.do" 三服务
 * @todo  社会矛盾纠纷调处调解中心
 */
// 社情民意图谱中间板块信息显示
function changeCenter(year, area) {
    // 政协工作平台
    post("/openapi/sqmy/mytp/zxgzsumbyyear.do", {
        data: {
            year: year,
            area: area,
        },
        async: false,
        success: function(data) {
            changeNum("num1", data.result);
        }
    });

    // 统战信息平台
    post("/openapi/sqmy/mytp/tzxxsumbyyaer.do", {
        data: {
            year: year,
            area: area,
        },
        async: false,
        success: function(data) {
            changeNum("num2", data.result);
        }
    });

    // 1234市民热线
    post("/openapi/sqmy/mytp/ygrxsumbyyear.do", {
        data: {
            year: year,
            area: area,
        },
        async: false,
        success: function(data) {
            changeNum("num3", data.result);
        }
    });

    // 三服务
    post("/openapi/sqmy/mytp/threesersumbyyear.do", {
        data: {
            year: year,
            area: area,
        },
        async: false,
        success: function(data) {
            changeNum("num4", data.result);
        }
    });

    changeNum("middle_sum", parseInt($("#num1").attr("data-value")) + parseInt($("#num2").attr("data-value")) + parseInt($("#num3").attr("data-value")) + parseInt($("#num4").attr("data-value")) + parseInt($("#num5").attr("data-value")));
}
changeCenter(2021, '');


$(function() {
    $('.container_middle .down dd').click(function() {
        var index = $(this).index();
        var res = 0;
        if (index === 0) {
            res = 2020;
        } else if (index === 1) {
            res = 2021;
        }
        changeCenter(res, '');
        $('.container_middle .year').html(function() {
            return $('.container_middle .down dd').eq(index).html();
        });
    });
    // 社情民意月度下拉
    $('.name .time1').click(function(e) {
        $('.name .time1 .menu').slideToggle(400);
        e.stopPropagation();
    });
    $('.name .spctime').click(function(e) {
        $('.name .spctime .menu').slideToggle(400);
        e.stopPropagation();
    });
    $('.name .time1 dd').click(function(e) {
        var res = $(this).html();
        $(this).parent().siblings('span').html(res);
    });
    $('.name .spctime dd').click(function(e) {
        var res = $(this).html();
        $(this).parent().siblings('span').html(res);
    });
});


// 社情民意模块轮播
var swiper4 = new Swiper('.swiper-container.se4', {
    autoplay: {
        delay: 6000,
    },
    speed: 1000,
    roundLengths: true,
    freeMode: true,
    observeSlideChildren: true,
    observer: true,
});

/**
 * 社情民意模块数据展示
 * @method SocInform
 * @param {int} year 
 * @param {int} month 
 */
function SocInform(year, month) {
    var informArr = [];
    var nInformArr = [];
    // 把盒子里面的内容全都删除然后重新添加
    $('.se4 .swiper-wrapper').children().remove();
    $('.se5 .swiper-wrapper').children().remove();
    post("openapi/sqmy/mytp/sqmydata.do", {
        data: {
            year: year,
            month: month,
            state: 1,
            page: 1,
            size: 20,
        },
        async: false,
        success: function(data) {
            if (data.datalist.length == 0) {
                alert("数据维护中");
                return false;
            }
            informArr = data.datalist;
        }
    });
    for (var i = 0; i < informArr.length; i++) {
        if (i % 5 === 0) {
            var slide = document.createElement('div');
            slide.className = 'swiper-slide';
            $("#name_content dl .swiper-wrapper").append(slide);
        }
        var dd = document.createElement('dd');
        dd.innerHTML = '<div class="page">' + informArr[i].iid + '</div><div class="caption">' + informArr[i].name + '</div><div class="sector">' + informArr[i].inputuser + '</div><div class="author">' + informArr[i].typename + '</div>';
        slide.append(dd);
    }
}

$(function() {
    SocInform(2021, 1);

    $('.name .time1 dd').click(function(e) {
        var res = $(this).html();
        var month = res.substring(0, res.length - 1);
        var nowYear = $("#name_year").html();
        var year = nowYear.substring(0, nowYear.length - 1);
        SocInform(year, month);
    });
    $('.name .spctime dd').click(function(e) {
        var res = $(this).html();
        var year = res.substring(0, res.length - 1);
        var nowMonth = $("#name_month").html();
        var month = nowMonth.substring(0, nowMonth.length - 1);
        SocInform(year, month);
    });
});