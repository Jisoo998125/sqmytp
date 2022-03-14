/**
 * @author zhoutao 
 * @starttime 2022/02/17
 * @changetime 2022/02/17
 * @title talk.js
 * @aim 柱状图方法封装 政协信息下社情民意模块  成果采纳模块
 */

/**
 * Echarts 图表折线图方法封装
 * @method bsDatavBar
 * @param {string} id 
 * @param {Array} xDataArray 
 * @param {Array} yDataArray 
 * @param {string} color1 
 * @param {string} color2 
 * @param {string} top 
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

/**
 * 政协信息下社情民意模块数据展示
 * @method PeopleFirst
 * @param {string} area 
 * @param {int} year 
 */
function PeopleFirst(area, year) {
    var width = $('.container .container_left').width();
    $('#bar_c').css('width', width);
    $('#bar_c').attr('data-area', area);
    $('#bar_c').attr('data-year', year);
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
    var id = "#bar_c";
    var color1 = 'rgba(173, 255, 133, 1)';
    var color2 = 'rgba(12, 194, 133, 1)';
    var top = '25%';
    bsDatavBar(id, xDataArray, yDataArray, color1, color2, top);
};

/**
 * 成果采纳数据展示加轮播
 * @method resultContent
 */
function resultContent() {
    var informArr = null;
    $('.se7 .swiper-wrapper').children().remove();
    post("openapi/sqmy/mytp/cgcn.do", {
        data: {},
        async: false,
        success: function(data) {
            informArr = data.result;
        }
    });
    for (var i = 0; i < informArr.length; i++) {
        if (i % 5 === 0) {
            var slide = document.createElement('div');
            slide.className = 'swiper-slide';
            $("#se7 .swiper-wrapper").append(slide);
        }
        var list = document.createElement('div');
        list.className = 'list';
        list.innerHTML = '<div class="page">' + informArr[i].id + '</div>' + '<div class="headline">' + informArr[i].name + '</div>' + '<div class="content">' + informArr[i].content + '</div>' + '<div class="date">' + informArr[i].time + '</div>';
        slide.append(list);

        var swiper7 = new Swiper('.swiper-container.se7', {
            autoplay: {
                delay: 6000,
            },
            speed: 1000,
            roundLengths: true,
            freeMode: true,
            observeSlideChildren: true,
            observer: true,
        });
    }
}

$(function() {
    resultContent();

    // 社情民意柱状图方法调用
    PeopleFirst('', 2021);

    // 政协信息模块栏目点击切换
    $('#informBar ul li').click(function() {
        var that = $(this).index();
        if (that === 0) {
            $('#bar_c').show().siblings().hide();
        } else if (that === 1) {
            openDialog(['800px', '630px'], './pc_tzxx_inform.html');
        }
    });
});