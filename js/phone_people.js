// 民生事项折线图



function CateFirstEcharts(year) {
    var xArr = [];
    var yArr = [];
    post("openapi/sqmy/mytp/yearcount.do", {
        async: false,
        data: {
            year: year,

        },
        success: function(data) {
            for (var i = 0; i < data.result.length; i++) {
                xArr[i] = data.result[i].month;
                yArr[i] = data.result[i].sum;
            }
        }
    });
    bsDataLine(".public_live .cate_first", xArr, yArr);

}
CateFirstEcharts(2021);

// 社会信息模块
// 12345
function peopleBar(area, year) {
    var xDataArray = [];
    var yDataArray = [];
    var width = $('#bar_box').width();
    $('#bar_box').css('width', width);
    $('bar_box').attr('data-area', area);
    $('bar_box').attr('data-year', year);
    post("openapi/sqmy/mytp/ygrxthisyearbycode.do", {
        data: {
            size: 5,
            page: 1,
            year: year,
            area: area,
        },
        async: false,

        success: function(data) {
            for (var i = 0; i < data.result.length; i++) {
                xDataArray[i] = data.result[i].type;
                yDataArray[i] = data.result[i].sum;
                // codeArr[i] = data.result[i].codeid;
            }
        }
    });
    bsDatavBar('#bar_box', xDataArray, yDataArray, 'rgba(173, 255, 133, 1)', 'rgba(12, 194, 133, 1)', '10%');
}
peopleBar('', 2021);
// 矛调中心
function peopleSecBar(year, area) {
    var xDataArray = [];
    var yDataArray = [];
    var dataArr = [];
    var width = $('#bar_box').width();
    $('#bar_sec_box').css('width', width);
    // $('bar_sec_box').attr('data-area', area);
    $('bar_sec_box').attr('data-year', year);
    post("openapi/sqmy/mytp/threeservices.do", {
        data: {
            year: year,
            area: area,
        },
        async: false,
        success: function(data) {
            for (var i = 0; i < 5; i++) {
                dataArr[i] = data.result[i];
            }
            for (var i = 0; i < dataArr.length; i++) {
                xDataArray[i] = dataArr[i].type;
                yDataArray[i] = dataArr[i].sum;
            }
        }
    });
    var id = "#bar_sec_box";
    var color1 = 'rgba(0, 61, 186, 1)';
    var color2 = 'rgba(8, 255, 255, 1)';
    var top = '10%';
    bsDatavBar(id, xDataArray, yDataArray, color1, color2, top);
};



// 社会信息模块栏目切换
$('.people .month li').click(function() {
    var index = $(this).index();
    if (index == 0) {
        $(this).addClass('active').siblings().removeClass('active');
        $('#bar_box').show().siblings().hide();
    } else if (index == 1) {
        $(this).addClass('active').siblings().removeClass('active');
        $("#bar_sec_box").show().siblings().hide();
        peopleSecBar(2021, '');
    } else if (index == 2) {
        $(this).addClass('active').siblings().removeClass('active');
        $("#bar_third_box").show().siblings().hide();
    }
});
// $('.people .month li').click(function() {
//     var index = $(this).index();
//     $(this).addClass('active').siblings().removeClass('active');
//     if (index == 0) {
//         peopleBar('', 2021);
//         $('#bar_box').show().siblings().hide();
//     } else if (index == 1) {
//         peopleSecBar('', 2021);
//         $('#bar_sec_box').show().siblings().hide();
//     }
// });

// 政协信息
// 社情民意
function informBar(area, year) {
    var width = $('#inform_box').width();
    $('#inform_box').css('width', width);
    $('#inform_box').attr('data-area', area);
    $('#inform_box').attr('data-year', year);
    var dataArr = [];
    var xDataArray = [];
    var yDataArray = [];
    post("openapi/sqmy/mytp/sqmythisyearbycode.do", {
        data: {
            type: 1,
            page: 1,
            year: year,
            area: area,
        },
        async: false,
        success: function(data) {
            dataArr = data.result;
        }
    });
    for (var i = 0; i < dataArr.length; i++) {
        xDataArray[i] = dataArr[i].type;
        yDataArray[i] = dataArr[i].sum;
    }
    var id = "#inform_box";
    var color1 = 'rgba(255, 186, 130, 1)';
    var color2 = 'rgba(255, 101, 128, 1)';
    var top = '10%';
    bsDatavBar(id, xDataArray, yDataArray, color1, color2, top);
}
informBar('', 2021);

// 统战信息
function informSecBar(area, year) {
    var width = $('#inform_box').width();
    $('#inform_sec_box').css('width', width);
    $('#inform_sec_box').attr('data-area', area);
    $('#inform_sec_box').attr('data-year', year);
    var dataArr = [];
    var xDataArray = [];
    var yDataArray = [];
    post("openapi/sqmy/mytp/tzxxthisyearbycode.do", {
        data: {
            type: 1,
            size: 5,
            page: 1,
            year: year,
            area: area
        },
        async: false,
        success: function(data) {
            dataArr = data.result;
        }
    });
    for (var i = 0; i < dataArr.length; i++) {
        xDataArray[i] = dataArr[i].type;
        yDataArray[i] = dataArr[i].count;
    }
    bsDatavBar("#inform_sec_box", xDataArray, yDataArray, 'RGBA(0, 120, 255, 1)', 'RGBA(0, 255, 191, 1)', '10%');
};

// 成果采纳模块轮播
function resultContent() {
    var informArr = null;
    post("openapi/sqmy/mytp/cgcn.do", {
        data: {},
        async: false,
        success: function(data) {
            informArr = data.result;
        }
    });
    for (var i = 0; i < informArr.length; i++) {
        if (i % 5 == 0) {
            var slide = document.createElement('div');
            slide.className = 'swiper-slide';
            $("#se6 .swiper-wrapper").append(slide);
        }
        var div = document.createElement('div');
        div.className = 'list';
        div.innerHTML = '<div class="number">' + informArr[i].id + '</div>' + '<div class="title">' + informArr[i].name + '</div>' + '<div class="time">' + informArr[i].content + '</div>' + '<div class="author">' + informArr[i].time + '</div>';
        slide.append(div);
    }
    // for (var i = 0; i < informArr.length; i++) {
    //     var list = document.createElement('div');
    //     list.className = 'list';
    //     $("#abstract_line .detail").append(list);
    //     list.innerHTML = '<div class="number">' + informArr[i].id + '</div>' + '<div class="title">' + informArr[i].name + '</div>' + '<div class="time">' + informArr[i].content + '</div>' + '<div class="author">' + informArr[i].time + '</div>'
    // }
    var swiper6 = new Swiper('.swiper-container.se6', {
        autoplay: {
            delay: 6000,
        },
        roundLengths: true,
        freeMode: true,
        observeSlideChildren: true,
        observer: true,
    });
}
resultContent();

// 根据年度调取不同年份的数据
$('#box_content dd').click(function() {
    $('#box_content .left .year').html($(this).html());
    var index = $(this).index();
    var starttime = null;
    var endtime = null;
    var year = 0;
    if (index == 0) {
        year = 2020;
        starttime = "2020-01-01";
        endtime = '2020-12-30';
    } else if (index == 1) {
        year = 2021;
        starttime = "2020-01-01";
        endtime = '2021-07-30';
    }
    // 民生事项
    CateFirstEcharts(year);
    changeCenter(year, '');
    // 12345
    peopleBar('', year);
    // 三服务
    peopleSecBar(year, '');
    // 社情民意
    informBar('', year);
});