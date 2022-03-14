$(function() {
    var area = null;
    var year = 2021;
    var name = 0;
    // 民生事项年度统计 折线图
    function lineFirst(area) {
        var xArr = [];
        var yArr = [];
        post("openapi/sqmy/mytp/yearcount.do", {
            async: false,
            data: {
                area: area,
            },
            success: function(data) {
                for (var i = 0; i < data.result.length; i++) {
                    xArr[i] = data.result[i].year;
                    yArr[i] = data.result[i].sum;
                }
            }
        });
        var id = "#soc_line";
        bsDatavLine(id, xArr, yArr);
    }
    lineFirst('');
    // 地图板块
    // area 地名
    // 12345市民热线
    function barEcharts(area, year) {
        var width = $('.inform .father').width();
        $('#inform_bar_one').css('width', width);
        $('#inform_bar_one').attr('data-area', area);
        $('#inform_bar_one').attr('data-year', year);
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
                    // codeArr[i] = data.result[i].codeid;
                }
            }
        });
        // console.log(codeArr);
        var myChart = echarts.init(document.querySelector("#inform_bar_one"));
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

    // 矛盾中心
    function barSec(area, year) {
        var width = $('.inform .father').width();
        $('#inform_bar_two').css('width', width);
        $('#inform_bar_two').attr('data-area', area);
        $('#inform_bar_two').attr('data-year', year);
        var xDataArray = [];
        var yDataArray = [];
        var dataArr = [];
        // codeid
        var codeArr = [];
        // 2021年
        post("openapi/sqmy/mytp/mdzxthisyearbycode.do", {
            data: {
                type: 1,
                size: 5,
                page: 1,
                year: year,
                area: area,
            },
            async: false,
            success: function(data) {
                // dataArr = data.result.slice(data.result.length - 5);
                for (var i = 0; i < data.result.length; i++) {
                    xDataArray[i] = data.result[i].type;
                    yDataArray[i] = data.result[i].count;
                }
            }
        });
        var id = "#inform_bar_two";
        var color1 = 'rgba(0, 61, 186, 1)';
        var color2 = 'rgba(8, 255, 255, 1)';
        var top = '20%';
        bsDatavBar(id, xDataArray, yDataArray, color1, color2, top);
    };

    function map() {
        var xDataArr = [];
        var dataIndex = null;
        post("openapi/sqmy/mytp/areasumbyyear.do", {
            data: {
                year: year,
            },
            async: false,
            success: function(data) {
                xDataArr = data.result;
            }
        });
        // xDataArr[4].selected = true;
        var mCharts = echarts.init(document.querySelector('.container_middle .map'));
        $.get('js/huzhounew.json', function(ret) {
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
            $('.container_middle .down dd').click(function() {
                var yDataArr = [];
                var index = $(this).index();
                var res = 0;
                var starttime = null;
                var endtime = null;
                var area = $('#inform_bar_one').attr('data-area');
                console.log(area);
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
                // 折线图
                lineFirst(area);
                // 中间区域数据
                changeCenter(res, area);
                // 矛盾中心柱状图
                barSec(area, res);
                // 社情民意柱状图
                PeopleFirst(area, res);
                // 统战信息柱状图
                PeopleSec(area, res);
                // 成果采纳
                ResLine(res, area);
                // 社情民意模块
                SocInform(starttime, endtime);
                // 采用汇总模块
                useInform(starttime, endtime);
                post("openapi/sqmy/mytp/areasumbyyear.do", {
                    data: {
                        year: res,
                    },
                    async: false,
                    success: function(data) {
                        yDataArr = data.result;
                    }
                });
                // for (key in yDataArr) {
                //     yDataArr[key].selected = false;
                // }
                yDataArr[dataIndex].selected = true;
                $('#return').click(function() {
                    for (key in yDataArr) {
                        yDataArr[key].selected = false;
                    }
                    mCharts.setOption(option);
                });
                mCharts.on('click', function(parms) {
                    for (key in yDataArr) {
                        yDataArr[key].selected = false;
                    }
                    var index = parms.dataIndex;
                    // xDataArr[0].selected = false;
                    yDataArr[index].selected = true;
                    mCharts.setOption(option);
                });
                option.series[0].data = yDataArr;
                mCharts.setOption(option);
            });
            $('#return').click(function() {
                for (key in xDataArr) {
                    xDataArr[key].selected = false;
                }
                mCharts.setOption(option);
            })
            mCharts.on('click', function(parms) {
                var name = 0;
                console.log($("#middle_year").html());
                if ($("#middle_year").html() === '2021年度') {
                    name = 2021;
                }
                if ($("#middle_year").html() === '2020年度') {
                    name = 2020;
                }
                console.log(name);
                // @@点击地图区域高亮
                for (key in xDataArr) {
                    xDataArr[key].selected = false;
                }
                dataIndex = parms.dataIndex;
                xDataArr[dataIndex].selected = true;
                mCharts.setOption(option);
                console.log(parms.name);
                $area = parms.name;
                area = parms.name;
                // 折线图
                lineFirst(area);
                // 12345柱状图
                barEcharts(area, name);
                // 矛盾中心柱状图
                barSec(area, name);
                // 社情民意柱状图
                PeopleFirst(area, name);
                // 统战信息柱状图
                PeopleSec(area, name);
                // 成果采纳
                ResLine(name, area);
                changeCenter(name, area);
            });
        });
    }
    map();
    // 点击返回所有数据清空
    $('#return').click(function() {
        // 折线图
        lineFirst('');
        // 12345柱状图
        barEcharts('', 2021);
        // 矛盾中心柱状图
        barSec('', 2021);
        // 社情民意柱状图
        PeopleFirst('', 2021);
        // 统战信息柱状图
        PeopleSec('', 2021);
        // 成果采纳
        ResLine(2021, '');
        // middle数据展示
        changeCenter(2021, '');
        $('#middle_year').html('2021年度');
    });
    // 社会信息模块栏目切换
    $('.inform ul li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        var that = $(this).index();
        if (that == 0) {
            $('#inform_bar_one').show().siblings().hide();
        }
        if (that == 1) {
            $('#inform_bar_two').show().siblings().hide();
            var area = $('#inform_bar_one').attr('data-area');
            var year = $('#inform_bar_one').attr('data-year');
            barSec(area, year);
        }
    })

    // 中间年度点击下拉
    $('#select').click(function(e) {
        $('.container_middle .down').slideToggle(400);
        e.stopPropagation();
    })
});
// $(function() {
//     $('#focus').click(function() {
//         TimeShow("openapi/sqmy/mytp/ygrxcountbytype.do", 'openapi/sqmy/mytp/ygrxinfobytype.do');
//     });
//     // 社会信息模块12345点击出现弹出层
//     $('#inform_bar_one').click(function() {
//         TimeShow("openapi/sqmy/mytp/ygrxcountbytype.do", 'openapi/sqmy/mytp/ygrxinfobytype.do');
//     });
//     // 社会信息模块矛盾中心点击出现弹出层
//     $('#inform_bar_two').click(function() {
//         TimeShow("openapi/sqmy/mytp/mdzxcountbytype.do", 'openapi/sqmy/mytp/mdzxinfobytype.do');
//     })
// })