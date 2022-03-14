/**
 * @author zhoutao 
 * @starttime 2022/02/17
 * @changetime 2022/02/17
 * @title pie.js
 * @aim 柱状图方法封装 折线图方法封装 界别协商模块功能 请你来协商模块功能
 * @todo 民意事项模块
 */

/**
 * Echarts 柱状图方法封装
 * @method bsDatavBar
 * @param {Array} legendArr 图例的数据数组
 * @param {Array} pieData 系列数据中的数据内容数组
 * @param {string} id 容器id
 * @param {Array} color 容器颜色一般为一个数组
 */
function bsDatavPie(pieData, id, color) {
    var mCharts = echarts.init(document.querySelector(id))
        // pieData就是需要设置给饼图的数据, 数组,数组中包含一个又一个的对象, 每一个对象中, 需要有name和value
    var option = {
        legend: {
            show: false,
            // data: legendArr,
            right: 0,
            formatter: function(name) {
                return name;
            },
            top: '20%',
            right: '0%',
            // itemGap图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
            itemGap: fontSize(0.17),
            // orient图例列表的布局朝向
            orient: 'vertical',
            textStyle: {
                color: '#fff',
                fontSize: fontSize(0.16),
            }
        },
        series: [{
            type: 'pie',
            data: pieData,
            label: {
                show: false,
            },
            radius: ['40%', '75%'], //第0个元素代表的是内圆的半径 第一个元素外圆的半径
            top: 0,
            left: 0,
            center: ['50%', '60%'],
            itemStyle: {
                normal: {
                    color: function(colors) {
                        var colorList = color;
                        return colorList[colors.dataIndex]
                    }
                }
            }
        }]
    }
    mCharts.setOption(option);
    window.addEventListener("resize", function() {
        mCharts.resize();
    });
};

/**
 * Echarts 折线图方法封装
 * @method bsDatavLineSpc
 * @param {string} id  Echarts图表容器
 * @param {Array} xArr x轴数据
 * @param {Array} yArr y轴数据
 * @param {Array} colors 图表主要颜色
 */
function bsDatavLineSpc(id, xArr, yArr, colors) {
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
                top: '20%',
                right: '6%',
                bottom: '6%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: xArr,
                boundaryGap: false,
                // 坐标轴刻度标签的相关设置。
                axisLabel: {
                    show: false,
                    color: '#6791DC',
                    fontWeight: 'bold',
                    fontSize: fontSize(0.14),
                    margin: fontSize(0.16),
                },
                // 坐标轴刻度相关设置。
                axisTick: {
                    show: false,
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

/**
 * 界别协商模块数据展示
 * @method jbxscircle
 * @param {int} year 
 */
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
                $('#pie').append("<p>建设中</p>");
                return false;
            } else {
                $('#pie p').remove();
            }
            for (var i = 0; i < data.resulttype.length; i++) {
                xdataArr[i] = data.resulttype[i].name;
                ydataArr[i] = data.resulttype[i].value;
            }
        }
    });
    bsDatavLineSpc(".rad .pie", xdataArr, ydataArr);
}

/**
 * 请你来协商模块数据展示
 * @method qnlxsrad
 * @param {int} year
 */
function qnlxsrad(year) {
    var xdataArr = [];
    var width = $('#pie').width();
    $('#pie_sec').css('width', width);
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
            spccolor.push("#fff");
        }
    }
    var mCharts = echarts.init(document.querySelector('.rad .pie_sec'))
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
    jbxscircle(2021);

    qnlxsrad(2021);

    $('.rad .menu dd').click(function() {
        var res = $(this).html();
        $('.rad .time span').html(res);
        var year = res.substring(0, res.length - 1);
        jbxscircle(year);
        qnlxsrad(year);
    });

    // 协商议政模块栏目切换效果
    $('.rad .choice li').click(function() {
        if ($(this).index() == 0) {
            $('#pie').show().siblings().hide();
            $(this).addClass('active').siblings().removeClass('active');
        } else if ($(this).index() == 1) {
            $('#pie_sec').show().siblings().hide();
            $(this).addClass('active').siblings().removeClass('active');
        } else if ($(this).index() == 2) {
            $('#pie_third').show().siblings().hide();
            $(this).addClass('active').siblings().removeClass('active');
        }
    });
});