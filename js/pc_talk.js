/**
 * bsDatavBar()柱状图方法
 * 参数说明
 * @param {容器id} id
 * @param {柱状图x轴数据} xDataArray 
 * @param {柱状图y轴数据} yDataArray 
 * @param {柱子0% 处的颜色} color1 
 * @param {柱子100% 处的颜色} color2 
 * @param {距离顶部的距离} top
 * bsDatavBar
 */
function bsDatavBar(id, xDataArray, yDataArray, color1, color2, top) {
    var myChart = echarts.init(document.querySelector(id));
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '4%',
            top: top,
            right: '6%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: [{
            type: 'category',
            data: xDataArray,
            // 坐标轴刻度标签的相关设置
            axisLabel: {
                interval: 0,
                // rotate: -30,
                color: '#6791DC',
                fontWeight: 'bold',
                fontSize: fontSize(0.12),
                margin: fontSize(0.16),
            },
            // 坐标轴刻度相关设置
            axisTick: {
                // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。
                alignWithLabel: true,
                length: 8,
                lineStyle: {
                    color: '#6EA8C2',
                }
            },
            axisLine: {
                show: false,
            },
        }],
        yAxis: [{
            type: 'value',
            // 去除刻度
            axisTick: {
                show: false
            },
            // 坐标轴刻度标签的相关设置
            axisLabel: {
                color: '#6791DC',
                fontWeight: 'bold',
                fontSize: fontSize(0.12),
                formatter: function(value, index) {
                    // var value;
                    if (value >= 1000) {
                        value = value / 10000 + 'w';
                    } else if (value < 10000) {
                        value = value;
                    }
                    return value;
                }
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(101, 198, 231, 0.2)'
                }
            },
            axisLine: {
                show: false,
            },
        }],
        series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: '30%',
            data: yDataArray,
            // label图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
            label: {
                show: true,
                color: '#fff',
                fontSize: fontSize(0.14),
                position: 'top',
            },
            itemStyle: {
                color: {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: color1 // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: color2 // 100% 处的颜色
                    }],
                }
            }
        }]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
};

// 政协信息模块
// 社情民意
function PeopleFirst(area, year) {
    $('#live_bar').attr('data-area', area);
    $('#live_bar').attr('data-year', year);
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
    var id = "#live_bar";
    var color1 = 'rgba(173, 255, 133, 1)';
    var color2 = 'rgba(12, 194, 133, 1)';
    var top = '10%';
    bsDatavBar(id, xDataArray, yDataArray, color1, color2, top);
};
PeopleFirst('', 2021);

// 统战信息
function PeopleSec(area, year) {
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
    bsDatavBar("#live_bar_sec", xDataArray, yDataArray, 'RGBA(0, 120, 255, 1)', 'RGBA(0, 255, 191, 1)', '10%');
};
PeopleSec('', 2021);

// 成果采纳模块折线图
function ResLine(year, area) {
    var dataArr = [];
    var xArr = [];
    var yArr = [];
    post("openapi/sqmy/mytp/cgcnbymonth.do", {
        data: {
            year: year,
            area: area,
        },
        async: false,
        success: function(data) {
            dataArr = data.result;
        }
    });
    for (var i = 0; i < dataArr.length; i++) {
        xArr[i] = dataArr[i].month;
        yArr[i] = dataArr[i].count;
    }
    var id = "#bar_first";
    var color1 = 'rgba(255, 186, 130, 1)';
    var color2 = 'rgba(255, 101, 128, 1)';
    var top = '25%';
    bsDatavLine(id, xArr, yArr);
};
$(function() {
    ResLine(2021, '');
    // 社情民意点击出现弹出层
    // $('#live_bar').click(function() {
    //     TimeShowOne("openapi/sqmy/mytp/sqmycountbytype.do", 'openapi/sqmy/mytp/sqmyinfobytype.do');
    // });

    // 统战信息模块弹出层
    // $('#live_bar_sec').click(function() {
    //     TimeShow("openapi/sqmy/mytp/tzxxcountbytype.do", 'openapi/sqmy/mytp/tzxxinfobytype.do');
    // });
});

$('.lay_third .time').click(function(e) {
    $('.lay_third dl').slideToggle(400);
    e.stopPropagation();
});

// 成果采纳模块点击出现弹出层
$(function() {
    var spcPage = 2;
    var intro = null;
    var year = 0;
    var month = null;
    var res = 0;
    var $area = $('#inform_bar_one').attr('data-area');

    function ResMonth(year, month, area, intro, page) {
        var informArr = [];
        var informSum = 0;
        post("openapi/sqmy/mytp/cgcninfobymonth.do", {
            data: {
                year: year,
                month: month,
                area: area,
                keyword: intro,
                page: page,
                size: 10,
            },
            async: false,
            beforeSend: function(XMLHttpRequest) {
                $("#lay_third #lay_more").html('加载中......');
            },
            success: function(data) {
                for (var i = 0; i < data.result.length; i++) {
                    informArr = data.result;
                    $("#lay_third #lay_more").html('加载更多');
                    // yDataArray[i] = data.result[i].sum;
                    // codeArr[i] = data.result[i].codeid;
                }
            }
        });
        // console.log(informArr);
        for (var i = 0; i < informArr.length; i++) {
            var list = document.createElement('div');
            list.className = 'list';
            list.setAttribute('title', informArr[i].content);
            $("#lay_third .content .lists").append(list);
            list.innerHTML = '<div class="page">' + informArr[i].id + '</div>' + '<div class="headline">' + informArr[i].title + '</div>' + '<div class="autor">' + informArr[i].author + '</div>' + '<div class="leader">' + informArr[i].leader + '</div>'
        };
    };

    $('#bar_first').click(function() {
        $('#lay_third .time span').html('1月');
        $('#lay_third  #text').val('');
        // 先把所有的清除
        $("#text").val('');
        intro = $("#lay_third #text").val();
        console.log(intro);
        if ($("#middle_year").html() === '2021年度') {
            year = 2021;
        }
        if ($("#middle_year").html() === '2020年度') {
            year = 2020;
        }
        month = $('#lay_third .time span').html();
        res = month.substr(0, month.length - 1);
        console.log(res);
        console.log($area);
        $('#lay_third .lay_one_detail .content .list').remove();
        ResMonth(year, res, $area, intro, 1);
        layWindow('lay_third', 1, '#lay_third');
    });

    // 根据月份显示不同内容
    $('#lay_third dl dd').click(function() {
        $("#lay_third #text").val('');
        intro = $("#lay_third #text").val();
        month = $(this).html();
        $('#lay_third .time span').html(month);
        res = month.substr(0, month.length - 1);
        console.log(res);
        $('#lay_third .lay_one_detail .content .list').remove();
        ResMonth(year, res, $area, intro, 1);
    });

    // 点击出现相关内容
    $('#lay_third #submit').click(function() {
        spcPage = 2;
        var index = 1;
        intro = $("#lay_third #text").val().trim();
        // $("#text").val();
        var moreArr = [];
        // 先清除所有的
        $('#lay_third .lay_one_detail .content .list').remove();
        ResMonth(year, res, $area, intro, index);

        // 关键词高亮
        var span = document.createElement('span');
        span.className = 'red';
        span.innerHTML = intro;
        $('#lay_third .list .headline').html(function(i, oldHTML) {
            return oldHTML.replace(intro, `<span class="red">${intro}</span>`);
        });
    });

    // 点击加载更多
    $('#lay_third #lay_more').click(function() {
        $("#lay_third #lay_more").text('加载中......');
        ResMonth(year, res, $area, intro, spcPage);
        // 关键词高亮
        var span = document.createElement('span');
        span.className = 'red';
        span.innerHTML = intro;
        $('#lay_third .list .headline').html(function(i, oldHTML) {
            return oldHTML.replace(intro, `<span class="red">${intro}</span>`);
        });
        spcPage++;
    });
});

// 成果采纳模块点击出现详细信息
$('#lay_third  .lists').delegate('.list', 'click', function() {
    layWindow('lay_content', 1, '#lay_sec');
    var that = $(this);
    $("#lay_sec .content").html(function() {
        return that.attr('title');
    });
});