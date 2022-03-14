// 实现下拉框点击页面任何位置都可以实现上拉
$('body').click(function() {
    $('.container_middle .down').slideUp('slow');
    $('.public .first .menu').slideUp('slow');
    $('.public .sec .menu').slideUp('slow');
    $('.talk .first .menu').slideUp('slow');
    $('.talk .sec .menu').slideUp('slow');
    $('.lay_third dl').slideUp('slow');
});

// 通过fonSize方法来实现echarts字体转换为rem
function fontSize(res) {
    let docEl = document.documentElement,
        clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 3454);
    return res * fontSize;
}



// @@@ 协商议政
// @@@ 第一个饼状图
function radEcharts() {
    var mCharts = echarts.init(document.querySelector(".talk .first .pie_box"))
        // pieData就是需要设置给饼图的数据, 数组,数组中包含一个又一个的对象, 每一个对象中, 需要有name和value
    var yDataArr = [{
        year: '2020年',
        data: [25, 25, 25, 25]
    }, {
        year: '2021年',
        data: [10, 50, 10, 30]
    }];

    var legendArr = ['协商部门   ' + yDataArr[yDataArr.length - 1].data[0] + "家", '问题反应   ' + yDataArr[yDataArr.length - 1].data[1] + "家", '协商次数   ' + yDataArr[yDataArr.length - 1].data[2] + "家", '协商成果   ' + yDataArr[yDataArr.length - 1].data[3] + "家"];


    var pieData = [{
        name: legendArr[0],
        value: yDataArr[yDataArr.length - 1].data[0],
    }, {
        name: legendArr[1],
        value: yDataArr[yDataArr.length - 1].data[1]
    }, {
        name: legendArr[2],
        value: yDataArr[yDataArr.length - 1].data[2]
    }, {
        name: legendArr[3],
        value: yDataArr[yDataArr.length - 1].data[3]
    }]
    var option = {
        legend: {
            data: legendArr,
            right: 0,
            formatter: function(name) {
                return name;
            },
            top: '30%',
            left: '60%',
            // itemGap图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
            itemGap: fontSize(0.27),
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
            center: ['30%', '60%'],
            itemStyle: {
                normal: {
                    color: function(colors) {
                        var colorList = [
                            '#F6FF00', '#0078FF', '#00B2FF', '#00FFBF'
                        ];
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

    // 根据年份进行数据变化
    $('.talk .first .menu dd').click(function() {
        for (var i = 0; i < pieData.length; i++) {
            pieData[i].value = yDataArr[$(this).index()].data[i];
        }
        legendArr = ['协商部门   ' + yDataArr[$(this).index()].data[0] + "家", '问题反应   ' + yDataArr[$(this).index()].data[1] + "家", '协商次数   ' + yDataArr[$(this).index()].data[2] + "家", '协商成果   ' + yDataArr[$(this).index()].data[3] + "家"];
        option.legend.data = legendArr;
        for (var i = 0; i < legendArr.length; i++) {
            pieData[i].name = legendArr[i];
        }
        mCharts.setOption(option);
        // 点击月份时盒子里面的内容也需要随者改变
        // that 全局变量  防止this里面指向问题
        var that = $(this).index();
        $('.talk .first .time span').html(function() {
            return yDataArr[that].year;
        });
    })
}
radEcharts();

// @@@ 第二个饼状图
function radEchartsSec() {
    var width = $('#pie_box').width();
    $('#pie_sec_box').css('width', width);
    var mCharts = echarts.init(document.querySelector(".talk .first .pie_sec_box"))
        // pieData就是需要设置给饼图的数据, 数组,数组中包含一个又一个的对象, 每一个对象中, 需要有name和value
    var yDataArr = [{
        year: '2020年',
        data: [20, 10, 10, 60]
    }, {
        year: '2021年',
        data: [40, 30, 20, 10]
    }];

    var legendArr = ['协商部门   ' + yDataArr[yDataArr.length - 1].data[0] + "家", '问题反应   ' + yDataArr[yDataArr.length - 1].data[1] + "家", '协商次数   ' + yDataArr[yDataArr.length - 1].data[2] + "家", '协商成果   ' + yDataArr[yDataArr.length - 1].data[3] + "家"];

    var pieData = [{
        name: legendArr[0],
        value: yDataArr[yDataArr.length - 1].data[0],
    }, {
        name: legendArr[1],
        value: yDataArr[yDataArr.length - 1].data[1]
    }, {
        name: legendArr[2],
        value: yDataArr[yDataArr.length - 1].data[2]
    }, {
        name: legendArr[3],
        value: yDataArr[yDataArr.length - 1].data[3]
    }]

    var option = {
        legend: {
            data: legendArr,
            right: 0,
            formatter: function(name) {
                return name;
            },
            top: '30%',
            left: '60%',
            // itemGap图例每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
            itemGap: fontSize(0.27),
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
            center: ['30%', '60%'],
            itemStyle: {
                normal: {
                    color: function(colors) {
                        var colorList = ['#cdb4db', '#ffc8dd', '#bde0fe', '#a2d2ff'];
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

    // 根据年份进行数据变化
    $('.talk .first .menu dd').click(function() {
        for (var i = 0; i < pieData.length; i++) {
            pieData[i].value = yDataArr[$(this).index()].data[i];
        }
        legendArr = ['协商部门   ' + yDataArr[$(this).index()].data[0] + "家", '问题反应   ' + yDataArr[$(this).index()].data[1] + "家", '协商次数   ' + yDataArr[$(this).index()].data[2] + "家", '协商成果   ' + yDataArr[$(this).index()].data[3] + "家"];
        option.legend.data = legendArr;
        for (var i = 0; i < legendArr.length; i++) {
            pieData[i].name = legendArr[i];
        }
        mCharts.setOption(option);
        // 点击月份时盒子里面的内容也需要随者改变
        // that 全局变量  防止this里面指向问题
        var that = $(this).index();
        $('.rad .time span').html(function() {
            return yDataArr[that].year;
        });
    })
}
radEchartsSec();

// @@@ 协商议政 模块切换
$(function() {
    $('.talk .first .choice li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).index() == 0) {
            $('#pie_box').show().siblings().hide();
        }
        if ($(this).index() == 1) {
            $('#pie_sec_box').show().siblings().hide();
        }
    });

    // 下拉
    $('.talk .first .time').click(function(e) {
        $('.talk .first .menu').slideToggle(400);
        e.stopPropagation();
    });
});

// @@@ 政协提案


// @@ 政协提案栏目切换
$(function() {
    $('.talk .sec .choice li').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).index() == 0) {
            $('#bar_first').show().siblings().hide();
        }
        if ($(this).index() == 1) {
            $('#bar_sec').show().siblings().hide();
        }
        if ($(this).index() == 2) {
            $('#bar_third').show().siblings().hide();
        }
    });
    // 下拉
    $('.talk .sec .time').click(function(e) {
        $('.talk .sec .menu').slideToggle(400);
        e.stopPropagation();
    });
});


function LaySearchOne() {
    var spc_id = 0;
    var spc_type = 0;
    var spcPage = 2;
    var intro = null;
    var url = null;
    // 关键词高亮
    var span = document.createElement('span');
    span.className = 'red';
    span.innerHTML = intro;
    // 先要事件委托
    $('.lay_detail .list').click(function() {
        // 先把所有的清除
        $("#lay_fifth #text").val('');
        intro = $("#lay_fifth #text").val();
        $('#lay_fifth .lay_one_detail .content .list').remove();
        var spcPage = 2;
        var imformArr = [];
        var codeid = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        spc_id = codeid;
        spc_type = type;
        var type = 1;
        url = $('.lay_detail .list').attr('data-url');
        console.log(url);
        post(url, {
            data: {
                type: spc_type,
                keyword: intro,
                codeid: codeid,
                size: 10,
                page: 1,
            },
            async: false,
            success: function(data) {
                informArr = data.result;
                if (informArr.length < 9) {
                    $("#lay_fifth #lay_more").html('没有更多内容了');
                } else {
                    $("#lay_fifth #lay_more").html('加载更多');
                }
            }
        });
        for (var i = 0; i < informArr.length; i++) {
            var list = document.createElement('div');
            list.className = 'list';
            list.setAttribute('title', informArr[i].content);
            // list.setAttribute('data-url', informArr[i].content);
            list.innerHTML = '<div class="page">' + informArr[i].id + '</div>' + '<div class="headline">' + informArr[i].title + '</div>' + '<div class="autor">' + informArr[i].type + '</div>' + '<div class="leader">' + informArr[i].time + '</div>'
            $("#lay_fifth .content .lists").append(list);

        };


        // 弹出层显示
        layWindow('lay_fifth', 1, '#lay_fifth');
    });

    // 点击搜索出现相关内容
    $('#lay_fifth #submit').click(function() {
        spcPage = 2;
        var index = 1;
        intro = $("#lay_fifth #text").val();
        // $("#text").val();
        var moreArr = [];
        // 先清除所有的
        $('#lay_fifth .lay_one_detail .content .list').remove();
        var moreArr = [];
        // $('.se6 .swiper-slide .list').remove();
        post(url, {
            data: {
                type: spc_type,
                keyword: intro,
                codeid: spc_id,
                size: 10,
                page: index,
            },
            beforeSend: function(XMLHttpRequest) {
                $("#lay_fifth #lay_more").html('加载中......');
            },
            async: false,
            success: function(data) {
                moreArr = data.result;
                $("#lay_fifth #lay_more").html('加载更多');
                if (moreArr.length < 10) {
                    $("#lay_fifth #lay_more").html('没有更多内容了');
                } else {
                    $("#lay_fifth #lay_more").html('加载更多');
                }
            }
        });
        var spc_more = [];
        for (var i = 0; i < moreArr.length; i++) {
            spc_more[i] = moreArr[i].content
        }
        for (var i = 0; i < moreArr.length; i++) {
            var str = spc_more[i];
            var index = str.indexOf(intro);
            spc_more[i] = str.substr(index, str.length);
        }
        for (var i = 0; i < moreArr.length; i++) {
            var list = document.createElement('div');
            list.className = 'list';
            list.setAttribute('title', moreArr[i].content);
            list.innerHTML = '<div class="page">' + informArr[i].id + '</div>' + '<div class="headline">' + informArr[i].title + '</div>' + '<div class="autor">' + informArr[i].type + '</div>' + '<div class="leader">' + informArr[i].time + '</div>'
            $("#lay_fifth .content .lists").append(list);

        }

        $('#lay_fifth .list .headline').html(function(i, oldHTML) {
            return oldHTML.replace(intro, `<span class="red">${intro}</span>`);
        });
    });

    // 点击加载更多
    $('#lay_fifth #lay_more').click(function() {
        var moreArr = [];
        intro = $("#lay_fifth #text").val().trim();
        post(url, {
            data: {
                type: spc_type,
                keyword: intro,
                codeid: spc_id,
                size: 10,
                page: spcPage,
            },
            async: false,
            beforeSend: function(XMLHttpRequest) {
                $("#lay_fifth #lay_more").html('加载中......');
            },
            success: function(data) {
                moreArr = data.result;
                console.log(moreArr);
                $("#lay_fifth #lay_more").html('加载更多');
                if (moreArr.length < 10) {
                    $("#lay_fifth #lay_more").html('没有更多内容了');
                } else {
                    $("#lay_fifth #lay_more").html('加载更多');
                }
            }
        });
        var spc_more = [];
        for (var i = 0; i < moreArr.length; i++) {
            spc_more[i] = moreArr[i].content;
        }
        for (var i = 0; i < moreArr.length; i++) {
            var str = spc_more[i];
            var index = str.indexOf(intro);
            spc_more[i] = str.substr(index, str.length);
        }
        console.log(spc_more);
        for (var i = 0; i < moreArr.length; i++) {
            var list = document.createElement('div');
            list.className = 'list';
            list.setAttribute('title', moreArr[i].content);
            list.innerHTML = '<div class="page">' + moreArr[i].id + '</div>' + '<div class="headline">' + moreArr[i].title + '</div>' + '<div class="autor">' + moreArr[i].type + '</div>' + '<div class="leader">' + moreArr[i].time + '</div>'
            $("#lay_fifth .content .lists").append(list);
        }
        // 关键词高亮
        // 关键词高亮

        $('#lay_fifth .list .headline').html(function(i, oldHTML) {
            return oldHTML.replace(intro, `<span class="red">${intro}</span>`);
        });
        // 页数加1
        spcPage++;
    });
};


// 搜索
function LaySearch() {
    var spc_id = 0;
    var spc_type = 0;
    var spcPage = 2;
    var intro = null;
    var url = null;
    // 先要事件委托
    $('.lay_detail .list').unbind('click');
    $('.lay_detail .list').click(function() {
        // 先把所有的清除
        $("#text").val('');
        intro = $("#lay_one #text").val();
        $('#lay_one .lay_one_detail .content .list').remove();
        var spcPage = 2;
        var imformArr = [];
        var codeid = $(this).attr('data-id');
        var type = $(this).attr('data-type');
        spc_id = codeid;
        spc_type = type;
        var type = 1;
        url = $('.lay_detail .list').attr('data-url');
        console.log(url);
        post(url, {
            data: {
                type: spc_type,
                keyword: intro,
                codeid: codeid,
                size: 10,
                page: 1,
            },
            async: false,
            success: function(data) {
                informArr = data.result;
                if (informArr.length < 10) {
                    $("#lay_one #lay_more").html('没有更多内容了');
                } else {
                    $("#lay_one #lay_more").html('加载更多');
                }
            }
        });

        for (var i = 0; i < informArr.length; i++) {
            var list = document.createElement('div');
            list.className = 'list';
            list.setAttribute('title', informArr[i].content);
            // list.setAttribute('data-url', informArr[i].content);
            $("#lay_one .content .lists").append(list);
            list.innerHTML = '<div class="headline">' + informArr[i].content + '</div>' + '<div class="time">' + informArr[i].time + '</div>'
        };
        // 弹出层显示
        layWindow('lay_one', 1, '#lay_one');
    });

    // 点击搜索出现相关内容
    $('#lay_one #submit').unbind('click');
    $('#lay_one #submit').click(function() {
        spcPage = 2;
        var index = 1;
        intro = $("#lay_one #text").val().trim();
        // $("#text").val();
        var moreArr = [];
        // 先清除所有的
        $('#lay_one .lay_one_detail .content .list').remove();
        var moreArr = [];
        // $('.se6 .swiper-slide .list').remove();
        post(url, {
            data: {
                type: spc_type,
                keyword: intro,
                codeid: spc_id,
                size: 10,
                page: index,
            },
            beforeSend: function(XMLHttpRequest) {
                $("#lay_one #lay_more").html('加载中......');
            },
            async: false,
            success: function(data) {
                moreArr = data.result;
                $("#lay_one #lay_more").html('加载更多');
                if (informArr.length < 10) {
                    $("#lay_one #lay_more").html('没有更多内容了');
                } else {
                    $("#lay_one #lay_more").html('加载更多');
                }
            }
        });
        var spc_more = [];
        for (var i = 0; i < moreArr.length; i++) {
            spc_more[i] = moreArr[i].content
        }
        for (var i = 0; i < moreArr.length; i++) {
            var str = spc_more[i];
            var index = str.indexOf(intro);
            spc_more[i] = str.substr(index, str.length);
        }
        for (var i = 0; i < moreArr.length; i++) {
            var list = document.createElement('div');
            list.className = 'list';
            list.setAttribute('title', moreArr[i].content);
            $("#lay_one .content .lists").append(list);
            list.innerHTML = '<div class="headline">' + spc_more[i] + '</div>' + '<div class="time">' + moreArr[i].time + '</div>'
        }
        // 关键词高亮
        var span = document.createElement('span');
        span.className = 'red';
        span.innerHTML = intro;
        $('#lay_one .list .headline').html(function(i, oldHTML) {
            return oldHTML.replace(intro, `<span class="red">${intro}</span>`);
        });
    });

    // 点击加载更多
    $("#lay_one #lay_more").unbind("click");
    $('#lay_one #lay_more').click(function() {
        var moreArr = [];
        intro = $("#text").val();
        post(url, {
            data: {
                type: spc_type,
                keyword: intro,
                codeid: spc_id,
                size: 10,
                page: spcPage,
            },
            async: false,
            beforeSend: function(XMLHttpRequest) {
                $("#lay_one #lay_more").html('加载中......');
            },
            success: function(data) {
                moreArr = data.result;
                $("#lay_one #lay_more").html('加载更多');
                if (informArr.length < 10) {
                    $("#lay_one #lay_more").html('没有更多内容了');
                } else {
                    $("#lay_one #lay_more").html('加载更多');
                }
            }
        });
        var spc_more = [];
        for (var i = 0; i < moreArr.length; i++) {
            spc_more[i] = moreArr[i].content;
        }
        for (var i = 0; i < moreArr.length; i++) {
            var str = spc_more[i];
            var index = str.indexOf(intro);
            spc_more[i] = str.substr(index, str.length);
        }
        for (var i = 0; i < moreArr.length; i++) {
            var list = document.createElement('div');
            list.className = 'list';
            list.setAttribute('title', moreArr[i].content);
            $("#lay_one .content .lists").append(list);
            list.innerHTML = '<div class="headline">' + spc_more[i] + '</div>' + '<div class="time">' + moreArr[i].time + '</div>'
        }

        // 关键词高亮
        var spc_a = "吴兴区";
        var span = document.createElement('span');
        span.className = 'red';
        span.innerHTML = intro;
        $('#lay_one .list .headline').html(function(i, oldHTML) {
            return oldHTML.replace(intro, `<span class="red">${intro}</span>`);
        });
        // 页数加1
        spcPage++;
    });
};



$('.lay_one .lay_one_detail .content .lists').delegate('.list', 'click', function() {
    layWindow('lay_content', 1, '#lay_sec');
    var that = $(this);
    $("#lay_sec .content").html(function() {
        return that.attr('title');
    });
});
$('.lay_fifth .lay_one_detail .content .lists').delegate('.list', 'click', function() {
    layWindow('lay_content', 1, '#lay_sec');
    var that = $(this);
    $("#lay_sec .content").html(function() {
        return that.attr('title');
    });
});
/**
 * bsDatavLine 折线图方法封装
 * @param {容器id} id 
 * @param {折线图x轴数据} xArr 
 * @param {折线图y轴数据} yArr 
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

/**
 * TimeShow() 处理弹出层总量 年度 月度
 * firsturl   第一个接口地址用于申请数据
 * securl     第二个接口地址用于创建属性 来调用LaySearch()方法
 */
function TimeShow(firsturl, securl) {
    $('.lay_content .lay_top ul li').eq(0).addClass('lay_active').siblings().removeClass('lay_active');
    $('#lay_total').show().siblings().hide();
    var informArr = [];
    var yearSum = 0;
    var monthSum = 0;
    var yearArr = [];
    var monthArr = [];
    var informSum = 0;
    post(firsturl, {
        data: {
            type: 1,
            size: 50,
            page: 1,
        },
        async: false,
        success: function(data) {
            for (var i = 0; i < data.result.length; i++) {
                informArr = data.result;
                // yDataArray[i] = data.result[i].sum;
                // codeArr[i] = data.result[i].codeid;
            }
        }
    });
    post(firsturl, {
        data: {
            type: 2,
            size: 50,
            page: 1,
        },
        async: false,
        success: function(data) {
            for (var i = 0; i < data.result.length; i++) {
                yearArr = data.result;
                // yDataArray[i] = data.result[i].sum;
                // codeArr[i] = data.result[i].codeid;
            }
        }
    });
    post(firsturl, {
        data: {
            type: 3,
            size: 50,
            page: 1,
        },
        async: false,
        success: function(data) {
            for (var i = 0; i < data.result.length; i++) {
                monthArr = data.result;
                // yDataArray[i] = data.result[i].sum;
                // codeArr[i] = data.result[i].codeid;
            }
        }
    });
    // console.log(informArr);
    layWindow('lay_content', 1, '#lay_content');
    $('#lay_detail .list').remove();
    $('#lay_sum').html('');
    for (var i = 0; i < informArr.length; i++) {
        informSum += informArr[i].sum;
        var list = document.createElement('div');
        list.className = 'list';
        list.setAttribute('data-id', informArr[i].codeid);
        list.setAttribute('data-type', 1);
        list.setAttribute('data-url', securl);
        $("#lay_total").append(list);
        list.innerHTML = '<div class="rad"></div>' + '<div class="intro">' + informArr[i].type + '</div>' + '<div class="num">' + informArr[i].sum + '</div>'
    };
    for (var i = 0; i < yearArr.length; i++) {
        yearSum += yearArr[i].sum;
        var list = document.createElement('div');
        list.className = 'list';
        list.setAttribute('data-id', yearArr[i].codeid);
        list.setAttribute('data-type', 2);
        list.setAttribute('data-url', securl);
        $("#lay_year").append(list);
        list.innerHTML = '<div class="rad"></div>' + '<div class="intro">' + yearArr[i].type + '</div>' + '<div class="num">' + yearArr[i].sum + '</div>'
    };
    for (var i = 0; i < monthArr.length; i++) {
        monthSum += monthArr[i].sum;
        var list = document.createElement('div');
        list.className = 'list';
        list.setAttribute('data-id', monthArr[i].codeid);
        list.setAttribute('data-type', 3);
        list.setAttribute('data-url', securl);
        $("#lay_month").append(list);
        list.innerHTML = '<div class="rad"></div>' + '<div class="intro">' + monthArr[i].type + '</div>' + '<div class="num">' + monthArr[i].sum + '</div>'
    };
    $('#lay_sum').html(informSum);
    $('#lay_top ul li').click(function() {
        $(this).addClass('lay_active').siblings().removeClass('lay_active');
        if ($(this).index() === 0) {
            $('#lay_total').show().siblings().hide();
            $('#lay_sum').html(informSum);
        }
        if ($(this).index() === 1) {
            $('#lay_year').show().siblings().hide();
            $('#lay_sum').html(yearSum);
        }
        if ($(this).index() === 2) {
            $('#lay_sum').html(monthSum);
            $('#lay_month').show().siblings().hide();
        }
    });
    LaySearch();
};

function TimeShowOne(firsturl, securl) {
    $('.lay_content .lay_top ul li').eq(0).addClass('lay_active').siblings().removeClass('lay_active');
    $('#lay_total').show().siblings().hide();
    var informArr = [];
    var yearSum = 0;
    var monthSum = 0;
    var yearArr = [];
    var monthArr = [];
    var informSum = 0;
    post(firsturl, {
        data: {
            type: 1,
            size: 50,
            page: 1,
        },
        async: false,
        success: function(data) {
            for (var i = 0; i < data.result.length; i++) {
                informArr = data.result;
                // yDataArray[i] = data.result[i].sum;
                // codeArr[i] = data.result[i].codeid;
            }
        }
    });
    post(firsturl, {
        data: {
            type: 2,
            size: 50,
            page: 1,
        },
        async: false,
        success: function(data) {
            for (var i = 0; i < data.result.length; i++) {
                yearArr = data.result;
                // yDataArray[i] = data.result[i].sum;
                // codeArr[i] = data.result[i].codeid;
            }
        }
    });
    post(firsturl, {
        data: {
            type: 3,
            size: 50,
            page: 1,
        },
        async: false,
        success: function(data) {
            for (var i = 0; i < data.result.length; i++) {
                monthArr = data.result;
                // yDataArray[i] = data.result[i].sum;
                // codeArr[i] = data.result[i].codeid;
            }
        }
    });
    // console.log(informArr);
    layWindow('lay_content', 1, '#lay_content');
    $('#lay_detail .list').remove();
    $('#lay_sum').html('');
    for (var i = 0; i < informArr.length; i++) {
        informSum += informArr[i].sum;
        var list = document.createElement('div');
        list.className = 'list';
        list.setAttribute('data-id', informArr[i].codeid);
        list.setAttribute('data-type', 1);
        list.setAttribute('data-url', securl);
        $("#lay_total").append(list);
        list.innerHTML = '<div class="rad"></div>' + '<div class="intro">' + informArr[i].type + '</div>' + '<div class="num">' + informArr[i].sum + '</div>'
    };
    for (var i = 0; i < yearArr.length; i++) {
        yearSum += yearArr[i].sum;
        var list = document.createElement('div');
        list.className = 'list';
        list.setAttribute('data-id', yearArr[i].codeid);
        list.setAttribute('data-type', 2);
        list.setAttribute('data-url', securl);
        $("#lay_year").append(list);
        list.innerHTML = '<div class="rad"></div>' + '<div class="intro">' + yearArr[i].type + '</div>' + '<div class="num">' + yearArr[i].sum + '</div>'
    };
    for (var i = 0; i < monthArr.length; i++) {
        monthSum += monthArr[i].sum;
        var list = document.createElement('div');
        list.className = 'list';
        list.setAttribute('data-id', monthArr[i].codeid);
        list.setAttribute('data-type', 3);
        list.setAttribute('data-url', securl);
        $("#lay_month").append(list);
        list.innerHTML = '<div class="rad"></div>' + '<div class="intro">' + monthArr[i].type + '</div>' + '<div class="num">' + monthArr[i].sum + '</div>'
    };
    $('#lay_sum').html(informSum);
    $('#lay_top ul li').click(function() {
        $(this).addClass('lay_active').siblings().removeClass('lay_active');
        if ($(this).index() === 0) {
            $('#lay_total').show().siblings().hide();
            $('#lay_sum').html(informSum);
        }
        if ($(this).index() === 1) {
            $('#lay_year').show().siblings().hide();
            $('#lay_sum').html(yearSum);
        }
        if ($(this).index() === 2) {
            $('#lay_sum').html(monthSum);
            $('#lay_month').show().siblings().hide();
        }
    });
    LaySearchOne();
};

$(function() {
    // 民意聚焦点击出现弹出层
    $('#focus').click(function() {
        openDialog(['680px', '700px'], './pc_list.html');
        window.localStorage.setItem('firsturl', 'openapi/sqmy/mytp/ygrxname3countbytype.do');
        window.localStorage.setItem('securl', 'openapi/sqmy/mytp/ygrxinfobytype.do');
        window.localStorage.setItem('choice', '2');
    });

    // 社会信息模块12345点击出现弹出层
    $('#inform_bar_one').click(function() {
        openDialog(['680px', '700px'], './pc_list.html');
        window.localStorage.setItem('firsturl', 'openapi/sqmy/mytp/ygrxname3countbytype.do');
        window.localStorage.setItem('securl', 'openapi/sqmy/mytp/ygrxinfobytype.do');
        window.localStorage.setItem('choice', '2');
        // TimeShow("openapi/sqmy/mytp/ygrxcountbytype.do", 'openapi/sqmy/mytp/ygrxinfobytype.do');
    });

    // 社会信息模块矛盾中心点击出现弹出层
    $('#inform_bar_two').click(function() {
        openDialog(['680px', '700px'], './pc_list.html');
        window.localStorage.setItem('firsturl', 'openapi/sqmy/mytp/mdzxcountbytype.do');
        window.localStorage.setItem('securl', 'openapi/sqmy/mytp/mdzxinfobytype.do');
        window.localStorage.setItem('choice', '1');
        // TimeShow("openapi/sqmy/mytp/mdzxcountbytype.do", 'openapi/sqmy/mytp/mdzxinfobytype.do');
    });

    // 政协信息模块社情民意点击出现弹出层
    $('#live_bar').click(function() {
        openDialog(['680px', '700px'], './pc_list_spc.html');
        window.localStorage.setItem('firsturl', 'openapi/sqmy/mytp/sqmycountbytype.do');
        window.localStorage.setItem('securl', 'openapi/sqmy/mytp/sqmyinfobytype.do');
        window.localStorage.setItem('choice', '1');
        // TimeShowOne("openapi/sqmy/mytp/sqmycountbytype.do", 'openapi/sqmy/mytp/sqmyinfobytype.do');
    });

    // 政协信息模块统战信息模块弹出层
    $('#live_bar_sec').click(function() {
        openDialog(['680px', '700px'], './pc_list.html');
        window.localStorage.setItem('firsturl', 'openapi/sqmy/mytp/tzxxcountbytype.do');
        window.localStorage.setItem('securl', 'openapi/sqmy/mytp/tzxxinfobytype.do');
        window.localStorage.setItem('choice', '1');
        // TimeShow("openapi/sqmy/mytp/tzxxcountbytype.do", 'openapi/sqmy/mytp/tzxxinfobytype.do');
    });
})