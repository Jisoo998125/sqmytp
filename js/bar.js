function instructEcharts() {
    var dataArr = [];
    var xDataArray = [];
    var yDataArray = [];
    post("openapi/sqmy/proposaldata.do", {
        data: {
            type: 3,
            iscurrent: 1,
        },
        async: false,
        success: function(data) {
            // console.log(data);
            // console.log(data.datalist);
            dataArr = data.datalist.slice(data.datalist.length - 5);
            // console.log(dataArr);
        }
    });
    for (var i = 0; i < dataArr.length; i++) {
        xDataArray[i] = dataArr[i].name;
        yDataArray[i] = dataArr[i].count
    }

    // 数据变化
    $('.instruct .menu dd').click(function() {
        var xDataArray = [];
        var yDataArray = [];
        var index = $(this).index();
        var res = 0;
        var lastArr = []
        if (index === 0) {
            res = 0;
        } else if (index === 1) {
            res = 1;
        }
        post("openapi/sqmy/proposaldata.do", {
            data: {
                type: 3,
                iscurrent: res,
            },
            async: false,
            success: function(data) {
                // console.log(data);
                // console.log(data.datalist);
                lastArr = data.datalist.slice(data.datalist.length - 5);
                // console.log(dataArr);
            }
        });
        for (var i = 0; i < lastArr.length; i++) {
            xDataArray[i] = lastArr[i].name;
            yDataArray[i] = lastArr[i].count
        }
        option.series[0].data = yDataArray;
        myChart.setOption(option);
        // 点击月份时盒子里面的内容也需要随者改变
        // that 全局变量  防止this里面指向问题
        var that = $(this).index();
        $('.instruct .time span').html(function() {
            return $('.instruct .menu dd').eq(that).html();
        });
    })
}
instructEcharts();

function instructEcharts(color1, color2) {
    var myChart = echarts.init(document.querySelector(".instruct .ins_bar"));
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '8%',
            top: '30%',
            right: '6%',
            bottom: '0',
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
                        color: color1, // 0% 处的颜色
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
}
instructEcharts('rgba(255, 186, 130, 1)', 'rgba(255, 101, 128, 1)')