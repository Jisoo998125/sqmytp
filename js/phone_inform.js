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
            $('#num1').html(data.result);
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
            $('#num2').html(data.result);
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
            $('#num3').html(data.result);
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
            $('#num4').html(data.result);
        }
    });

    // 社会矛盾纠纷调处调解中心
    $('#num5').html(0);

    $('#spc_num').html(function() {
        return parseInt($("#num1").html()) + parseInt($("#num2").html()) + parseInt($("#num3").html()) + parseInt($("#num4").html() + parseInt($("#num5").html()));
    });
}
changeCenter(2021, '');

// 社情民意
// 社情民意轮播图
var swiper2 = new Swiper('.swiper-container.se2', {
    autoplay: {
        delay: 6000,
    },
    roundLengths: true,
    freeMode: true,
    observeSlideChildren: true,
    observer: true,
});

function SocInform(year, month) {
    var informArr = [];
    var nInformArr = [];
    // 先把盒子里面的内容全都删除然后重新添加
    $('.se2 .swiper-wrapper').children().remove();
    $('.se3 .swiper-wrapper').children().remove();
    // state 0和1代表社情民意和统战信息的数据
    post("openapi/sqmy/mytp/sqmydata.do", {
        data: {
            year: year,
            month: month,
            state: 0,
            page: 1,
            size: 20,
        },
        async: false,
        success: function(data) {
            informArr = data.datalist;
            console.log(informArr);
        }
    });
    for (var i = 0; i < informArr.length; i++) {
        if (i % 5 === 0) {
            var slide = document.createElement('div');
            slide.className = 'swiper-slide';
            $("#soc_first .swiper-wrapper").append(slide);
        }
        var div = document.createElement('div');
        div.className = 'list';
        div.innerHTML = '<div class="number">' + informArr[i].iid + '</div><div class="title">' + informArr[i].name + '</div><div class="time">' + informArr[i].inputuser + '</div><div class="author">' + informArr[i].typename + '</div>';
        slide.appendChild(div);
    }
};



// @@协商议政
// 界别协商
function jbxscircle(year) {
    var xdataArr = [];
    var ydataArr = [];

    post("openapi/sqmy/mytp/jbxscircle.do", {
        data: {
            year: year,
        },
        async: false,
        success: function(data) {
            if (data.resulttype.length == 0) {
                // alert('数据维护中');
                $('#rad_first').append("<p>建设中</p>");
                // $('#rad_first').parent().append("<p>建设中</p>");
                return false;
            } else {
                $('#rad_first p').remove();
                // $('#rad_first').show();
                // $('#rad_first').parent().find('p').remove();

            }
            for (var i = 0; i < data.resulttype.length; i++) {
                xdataArr[i] = data.resulttype[i].name;
                ydataArr[i] = data.resulttype[i].value;
            }
        }
    });
    bsDataLineSpc("#rad_first", xdataArr, ydataArr);

}

function qnlxsrad(year) {
    var xdataArr = [];
    var width = $('#rad_first').width();
    $('#rad_sec').css('width', width);
    post("openapi/sqmy/mytp/qnlxscircle.do", {
        data: {
            year: year,
        },
        async: false,
        success: function(data) {
            xdataArr = data.result;
        }
    });
    // 根据数据返回不同颜色
    var spccolor = [];
    for (let i = 0; i < xdataArr.length; i++) {
        if (xdataArr[i].type1 == "“面对面”高端协商" && xdataArr[i].finish == 1) {
            spccolor.push("#ffc96c");
        } else if (xdataArr[i].type1 == "“面对面”高端协商" && xdataArr[i].finish == 0) {
            spccolor.push('#00FFBF');
        } else if (xdataArr[i].type1 == "市政协双月协商座谈" && xdataArr[i].finish == 1) {
            spccolor.push("#ff718f");
        } else if (xdataArr[i].type1 == "市政协双月协商座谈" && xdataArr[i].finish == 0) {
            spccolor.push("green");
        }
    }
    var mCharts = echarts.init(document.querySelector('#rad_sec'))
        // pieData就是需要设置给饼图的数据, 数组,数组中包含一个又一个的对象, 每一个对象中, 需要有name和value
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return "协商议题" + "：" + params.data.name + '<br>' + "牵头专委会" + "：" + params.data.committee + "<br>" + "协商活动时间" + "：" + params.data.time + "<br>" + "协商部门：" + (params.data.xsbm == undefined ? "暂无数据" : params.data.xsbm) + "<br>" + "参与委员：" + (params.data.cywy == undefined ? "暂无数据" : params.data.cywy) + "<br>" + "调研次数：" + (params.data.dycs == undefined ? "暂无数据" : params.data.dycs) + "<br>" + "意见建议：" + (params.data.yjjy == undefined ? "暂无数据" : params.data.yjjy);
            }
        },
        legend: {
            show: false,
            top: '5%',
            left: 'center'
        },
        series: [{
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            data: xdataArr,
            label: {
                // show: false,
                width: 10,
                overflow: 'truncate',
                ellipsis: '....'
            },
            itemStyle: {
                normal: {
                    color: function(colors) {
                        var colorList = spccolor;
                        return colorList[colors.dataIndex]
                    }
                }
            }
        }]
    };
    mCharts.setOption(option);
    window.addEventListener("resize", function() {
        mCharts.resize();
    });
}


$(function() {
    // 社情民意轮播图初始
    SocInform(2021, 1);


    // 社情民意模块 社情民意
    $('.social .nav .time').click(function(e) {
        $(this).find('dl').slideToggle(400);
        e.stopPropagation();
    });
    $('.social .nav .social-year').click(function(e) {
        $(this).find('dl').slideToggle(400);
        e.stopPropagation();
    });
    $('body').click(function() {
        $('.social .nav dl').slideUp('slow');
        $(".consult dl").slideUp(400);
    });

    $('.social .nav li').click(function() {
        var index = $(this).index();
    });

    $('.social .detail_box .list a').click(function(e) {
        e.preventDefault();
    });

    $('.social .time dl dd').click(function() {
        var res = $(this).html();
        $('#time_content').html(res);
        var month = res.substring(0, res.length - 1);
        var nowYear = $("#social-year-content").html();
        console.log(nowYear);
        var year = nowYear.substring(0, nowYear.length - 1);
        SocInform(year, month);
    });
    $('.social .social-year dl dd').click(function() {
        var res = $(this).html();
        $('#social-year-content').html(res);
        var year = res.substring(0, res.length - 1);
        var nowMonth = $("#time_content").html();
        var month = nowMonth.substring(0, nowMonth.length - 1);
        SocInform(year, month);
    });

    // 协商议政

    // 协商议政界别协商
    jbxscircle(2021);
    qnlxsrad(2021);
    $('.consult .time').click(function(e) {
        $(".consult dl").slideToggle(400);
        e.stopPropagation();
    });

    $('.consult dl dd').click(function() {
        var res = $(this).html();
        $("#consult-year-content").html(res);
        var year = res.substring(0, res.length - 1);
        jbxscircle(year);
        qnlxsrad(year);
    })
})