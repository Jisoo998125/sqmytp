/**
 * @author zhoutao
 * 民生事项
 * 12345模块
 * 三服务模块
 */

/**
 * Echarts折线图方法封装
 * @method bsDatavLine
 * @param {string} id 
 * @param {Array} xArr 
 * @param {Array} yArr 
 * @param {Array} colors
 */
function bsDatavLine(id, xArr, yArr, colors) {
    var myChart = echarts.init(document.querySelector(id));
    var option = {
            // tooltip提示框组件
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            color: ['#FFFE80'],
            // grid直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴
            grid: {
                left: '4%',
                top: '10%',
                right: '6%',
                bottom: '0',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: xArr,
                boundaryGap: false,
                // 坐标轴刻度标签的相关设置。
                axisLabel: {
                    color: '#6791DC',
                    fontWeight: 'bold',
                    fontSize: fontSize(0.14),
                    margin: fontSize(0.16),
                },
                // 坐标轴刻度相关设置。
                axisTick: {
                    alignWithLabel: true,
                    length: fontSize(0.08),
                    lineStyle: {
                        color: '#6EA8C2',
                    }
                },
                // 坐标轴轴线相关设置
                axisLine: {
                    show: false,
                },
                boundaryGap: true, //为false时不留白，从原点开始
            },
            yAxis: {
                type: 'value',
                // 坐标轴刻度标签的相关设置
                axisLabel: {
                    color: '#6791DC',
                    fontWeight: 'bold',
                    fontSize: fontSize(0.12),
                    formatter: function(value, index) {
                        // var value;
                        if (value >= 10000) {
                            value = value / 10000 + 'w';
                        } else if (value < 10000) {
                            value = value;
                        }
                        return value;
                    }
                },
                // 去除刻度
                axisTick: {
                    show: false,
                },
                // 坐标轴在 grid 区域中的分隔线。
                splitLine: {
                    lineStyle: {
                        color: 'rgba(101, 198, 231, 0.2)'
                    }
                },
                // 坐标轴轴线相关设置
                axisLine: {
                    show: false,
                },
            },
            series: [{
                data: yArr,
                type: 'line',
                // areaStyle区域填充样式。设置后显示成区域面积图
                areaStyle: {
                    color: {
                        // 实现渐变效果
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(255, 254, 128, 1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(255, 255, 255, 0)' // 100% 处的颜色
                        }],
                    }
                },
                label: {
                    show: true,
                    fontSize: fontSize(0.12)
                }
            }]
        }
        // 把配置给实例对象
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
};

var $area = null;
$(function() {
    var area = null;
    var year = 2021;
    var name = 0;
    // 民生事项年度统计 折线图
    function lineFirst(year, area) {
        var xArr = [];
        var yArr = [];
        post("openapi/sqmy/mytp/yearcount.do", {
            async: false,
            data: {
                year: year,
                area: area,
            },
            success: function(data) {
                for (var i = 0; i < data.result.length; i++) {
                    xArr[i] = data.result[i].month;
                    yArr[i] = data.result[i].sum;
                }
            }
        });
        var xdataArr = [];
        for (var i = 0; i < xArr.length; i++) {
            xdataArr[i] = xArr[i] + "月";
        }
        var id = ".cate .cate_box";
        bsDatavLine(id, xdataArr, yArr);
    }
    lineFirst(2021, '');
    // 地图板块
    // area 地名
    // 12345市民热线
    function barEcharts(area, year) {
        var width = $('.container .container_left').width();
        $('#bar_box').css('width', width);
        $('#bar_box').attr('data-area', area);
        $('#bar_box').attr('data-year', year);
        var xDataArray = [];
        var yDataArray = [];
        // codeid
        var codeArr = [];
        // 2021年
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
                }
            }
        });
        var myChart = echarts.init(document.querySelector(".bar .bar_box"));
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '4%',
                top: '20%',
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
                    width: 6
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
                        if (value >= 10000) {
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
                data: yDataArray,
                name: '直接访问',
                type: 'bar',
                barWidth: '30%',
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
                            color: 'rgba(255, 232, 120, 1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(237, 132, 57, 1)' // 100% 处的颜色
                        }],
                    }
                }
            }]
        };
        myChart.setOption(option);
        window.addEventListener("resize", function() {
            myChart.resize();
        });
    }
    barEcharts('', 2021);

    /**
     * 三服务模块数据展示
     * @method barSec
     * @param {int} year 
     * @param {string} area 
     */
    function barSec(year, area) {
        var width = $('#bar_box').width();
        $('#bar_sec_box').css('width', width);
        $('#bar_sec_box').attr('data-area', area);
        $('#bar_sec_box').attr('data-year', year);
        var xDataArray = [];
        var yDataArray = [];
        var dataArr = [];
        // codeid
        var codeArr = [];
        // 2021年
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
                console.log(dataArr);
            }
        });
        var id = "#bar_sec_box";
        var color1 = 'rgba(0, 61, 186, 1)';
        var color2 = 'rgba(8, 255, 255, 1)';
        var top = '20%';
        bsDatavBar(id, xDataArray, yDataArray, color1, color2, top);
    }

    $('.container_left .society .choice ul li').click(function() {
        // $(this).addClass('active').siblings().removeClass('active');
        var that = $(this).index();
        if (that == 0) {
            $(this).addClass('active').siblings().removeClass('active');
            $('#bar_box').show().siblings().hide();
        } else if (that == 1) {
            $(this).addClass('active').siblings().removeClass('active');
            $('#bar_sec_box').show().siblings().hide();
            var area = $('#bar_box').attr('data-area');
            var year = $('#bar_box').attr('data-year');
            barSec(year, area);
        } else if (that == 2) {
            $(this).addClass('active').siblings().removeClass('active');
            $('#bar_third_box').show().siblings().hide();
        }
    });

    /**
     * Echarts 地图 以及点击地图区域数据变化
     * @method map
     * @api "openapi/sqmy/mytp/areasumbyyear.do"
     */
    function map() {
        var xDataArr = [];
        var dataIndex = null;
        var choice = 0;
        post("openapi/sqmy/mytp/areasumbyyear.do", {
            data: {
                year: year,
            },
            async: false,
            success: function(data) {
                xDataArr = data.result;
            }
        });
        var mCharts = echarts.init(document.querySelector('.container_middle .map'));
        $.get('js/huzhou.json', function(ret) {
            // ret就是中国各个省份的矢量地图数据了
            echarts.registerMap('chinaMap', ret);
            var option = {
                series: [{
                    type: 'map',
                    data: xDataArr,
                    map: 'chinaMap', //chinaMap需要和registerMap中的第一个参数保持一致
                    // roam: true, //拖动缩放
                    label: {
                        show: true, //展示标签
                        color: '#FFEA00',
                        align: 'center',
                        fontSize: fontSize(0.14),
                        fontWeight: 'bold',
                        formatter: '{b}\n{c}',
                    },
                    zoom: 1, //初始化的缩放比例
                    itemStyle: {
                        borderWidth: 1, //边框大小
                        borderColor: '#27ebf7',
                        areaColor: '#031ca3',
                    },
                    emphasis: {
                        color: '#fff',
                        align: 'center',
                    },
                }]
            };
            mCharts.setOption(option);
            mCharts.on('click', function(parms) {
                choice = 1;
                if ($("#middle_year").html() === '2021年度') {
                    name = 2021;
                }
                if ($("#middle_year").html() === '2020年度') {
                    name = 2020;
                }
                // @@点击地图区域高亮
                for (key in xDataArr) {
                    xDataArr[key].selected = false;
                }
                dataIndex = parms.dataIndex;
                xDataArr[dataIndex].selected = true;
                console.log(parms);
                mCharts.setOption(option);
                $area = parms.name;
                area = parms.name;
                // 折线图
                lineFirst(name, area);

                // 12345柱状图
                barEcharts(area, name);

                // 三服务柱状图
                barSec(name, area);

                // 社情民意柱状图
                PeopleFirst(area, name);

                // 中间模块数据
                changeCenter(name, area);
            });

            // 点击返回 地区选择区域高亮取消
            $('#return').click(function() {
                for (key in xDataArr) {
                    xDataArr[key].selected = false;
                }
                choice = 2;
                mCharts.setOption(option);
            });

            $('.container_middle .down dd').click(function() {
                var yDataArr = [];
                var index = $(this).index();
                var res = 0;
                var starttime = null;
                var endtime = null;
                var area = $('#bar_c').attr('data-area');
                if (index === 0) {
                    res = 2020;
                    starttime = "2020-01-01";
                    endtime = '2020-12-30';
                } else if (index === 1) {
                    res = 2021;
                    starttime = "2020-01-01";
                    endtime = '2021-07-30';
                }
                barEcharts(area, res);
                lineFirst(res, area);
                changeCenter(res, area);
                // 矛盾中心柱状图
                barSec(res, area);
                // 社情民意柱状图
                PeopleFirst(area, res);
                // 统战信息柱状图
                // PeopleSec(area, res);
                // 社情民意模块
                post("openapi/sqmy/mytp/areasumbyyear.do", {
                    data: {
                        year: res,
                    },
                    async: false,
                    success: function(data) {
                        yDataArr = data.result;
                    }
                });
                if (choice == 1) {
                    yDataArr[dataIndex].selected = true;
                }
                mCharts.on('click', function(parms) {
                    for (key in yDataArr) {
                        yDataArr[key].selected = false;
                    }
                    var index = parms.dataIndex;
                    yDataArr[index].selected = true;
                    mCharts.setOption(option);
                });
                option.series[0].data = yDataArr;
                mCharts.setOption(option);
                $('#return').click(function() {
                    for (key in yDataArr) {
                        yDataArr[key].selected = false;
                    }
                    mCharts.setOption(option);
                });
            });
        });
    }
    map();

    // 点击返回所有数据清空
    $('#return').click(function() {
        // 折线图
        lineFirst(2021, '');

        // 12345柱状图
        barEcharts('', 2021);

        // 三服务中心柱状图
        barSec(2021, '');

        // 社情民意柱状图
        PeopleFirst('', 2021);

        // 中间数据展示
        changeCenter(2021, '');

        $('#middle_year').html('2021年度');
    })
});