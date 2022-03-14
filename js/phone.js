// 通过fonSize方法来实现echarts字体转换为rem
function fontSize(res) {
    let docEl = document.documentElement,
        clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (!clientWidth) return;
    let fontSize = 100 * (clientWidth / 1920);
    return res * fontSize;
};

$('.public_will .show').click(function(e) {
    $('.public_will dl').slideToggle(400);
    e.stopPropagation();
});

// 实现下拉框点击页面任何位置都可以实现上拉
$('body').click(function() {
    $('.public_will dl').slideUp('slow');
});

function bsDataLineSpc(id, xArr, yArr) {
    var myChart = echarts.init(document.querySelector(id));
    var option = {
            // tooltip提示框组件
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            color: ['rgba(12, 133, 255, 1)'],
            // grid直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴
            grid: {
                left: '0',
                top: '12%',
                right: '1%',
                bottom: '4%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: xArr,
                // 坐标轴刻度标签的相关设置。
                axisLabel: {
                    show: false,
                    color: '#666',
                    fontSize: fontSize(0.45),
                    margin: fontSize(0.475),
                },
                // 坐标轴刻度相关设置。
                axisTick: {
                    show: false,
                    alignWithLabel: true,
                    length: fontSize(0.225),
                    lineStyle: {
                        width: 2,
                        color: 'rgba(229, 229, 229, 1)',
                    }
                },
                // 坐标轴轴线相关设置
                axisLine: {
                    lineStyle: {
                        width: 2,
                        color: 'rgba(229, 229, 229, 1)',
                    }
                },
                //为false时不留白，从原点开始
            },
            yAxis: {
                type: 'value',
                // 坐标轴刻度标签的相关设置
                axisLabel: {
                    color: '#666',
                    fontSize: fontSize(0.45),
                    margin: fontSize(0.3),
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
                axisTick: {
                    alignWithLabel: true,
                    length: fontSize(0.15),
                    lineStyle: {
                        width: 2,
                        color: 'rgba(229, 229, 229, 1)',
                    }
                },
                boundaryGap: true,

                // 去除刻度
                // axisTick: {
                //     show: false,
                // },
                // 坐标轴在 grid 区域中的分隔线。
                splitLine: {
                    lineStyle: {
                        color: 'rgba(229, 229, 229, .6)'
                    }
                },
                // 坐标轴轴线相关设置
                axisLine: {
                    lineStyle: {
                        width: 2,
                        color: 'rgba(229, 229, 229, 1)',
                    }
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
                            color: 'rgba(12, 133, 255, 1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(255, 255, 255, 0)' // 100% 处的颜色
                        }],
                    }
                },
                label: {
                    show: true,
                    color: 'rgba(12, 133, 255, 1)',
                    fontSize: fontSize(0.45),
                }
            }]
        }
        // 把配置给实例对象
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}

function bsDataLine(id, xArr, yArr) {
    var myChart = echarts.init(document.querySelector(id));
    var option = {
            // tooltip提示框组件
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            color: ['rgba(12, 133, 255, 1)'],
            // grid直角坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴
            grid: {
                left: '0',
                top: '12%',
                right: '1%',
                bottom: '0',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                data: xArr,
                // 坐标轴刻度标签的相关设置。
                axisLabel: {
                    color: '#666',
                    fontSize: fontSize(0.45),
                    margin: fontSize(0.475),
                },
                // 坐标轴刻度相关设置。
                axisTick: {
                    alignWithLabel: true,
                    length: fontSize(0.225),
                    lineStyle: {
                        width: 2,
                        color: 'rgba(229, 229, 229, 1)',
                    }
                },
                // 坐标轴轴线相关设置
                axisLine: {
                    lineStyle: {
                        width: 2,
                        color: 'rgba(229, 229, 229, 1)',
                    }
                },
                //为false时不留白，从原点开始
            },
            yAxis: {
                type: 'value',
                // 坐标轴刻度标签的相关设置
                axisLabel: {
                    color: '#666',
                    fontSize: fontSize(0.45),
                    margin: fontSize(0.3),
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
                axisTick: {
                    alignWithLabel: true,
                    length: fontSize(0.15),
                    lineStyle: {
                        width: 2,
                        color: 'rgba(229, 229, 229, 1)',
                    }
                },
                boundaryGap: true,

                // 去除刻度
                // axisTick: {
                //     show: false,
                // },
                // 坐标轴在 grid 区域中的分隔线。
                splitLine: {
                    lineStyle: {
                        color: 'rgba(229, 229, 229, .6)'
                    }
                },
                // 坐标轴轴线相关设置
                axisLine: {
                    lineStyle: {
                        width: 2,
                        color: 'rgba(229, 229, 229, 1)',
                    }
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
                            color: 'rgba(12, 133, 255, 1)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(255, 255, 255, 0)' // 100% 处的颜色
                        }],
                    }
                },
                label: {
                    show: true,
                    color: 'rgba(12, 133, 255, 1)',
                    fontSize: fontSize(0.45),
                }
            }]
        }
        // 把配置给实例对象
    myChart.setOption(option);
    window.addEventListener("resize", function() {
        myChart.resize();
    });
}



/**
 * bsDatavBar()柱状图方法
 * 参数说明
 * @param {容器id} id
 * @param {柱状图x轴数据} xDataArray 
 * @param {柱状图y轴数据} yDataArray 
 * @param {柱子0% 处的颜色} color1 
 * @param {柱子100% 处的颜色} color2 
 * @param {距离顶部的距离} top
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
            left: '0',
            top: top,
            right: '1%',
            bottom: '0%',
            containLabel: true,
        },
        xAxis: [{
            type: 'category',
            data: xDataArray,
            // 坐标轴刻度标签的相关设置
            axisLabel: {
                color: '#666',
                interval: 0,
                fontSize: fontSize(0.45),
                margin: fontSize(0.5),
            },
            // 坐标轴刻度相关设置
            axisTick: {
                // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。
                alignWithLabel: true,
                length: fontSize(0.225),
                lineStyle: {
                    width: 2,
                    color: 'rgba(229, 229, 229, 1)',
                }
            },
            axisLine: {
                lineStyle: {
                    width: 2,
                    color: 'rgba(229, 229, 229, 1)',
                }
            },
        }],
        yAxis: [{
            type: 'value',
            axisTick: {
                // 类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐。
                alignWithLabel: true,
                length: fontSize(0.225),
                lineStyle: {
                    width: 2,
                    color: 'rgba(229, 229, 229, 1)',
                }
            },
            // 坐标轴刻度标签的相关设置
            axisLabel: {
                color: '#666',
                fontSize: fontSize(0.45),
                margin: fontSize(0.225),
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
                    color: 'rgba(229, 229, 229, .6)'
                }
            },
            axisLine: {
                lineStyle: {
                    width: 2,
                    color: 'rgba(229, 229, 229, 1)',
                }
            },
        }],
        series: [{
            data: yDataArray,
            name: '直接访问',
            type: 'bar',
            barWidth: '30%',
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





$('.consult .nav li').click(function() {
    if ($(this).index() === 0) {
        $("#rad_first").show();
        $("#rad_sec").hide();
        $(this).addClass('active').siblings().removeClass('active');
    } else if ($(this).index() === 1) {
        $("#rad_first").hide();
        $("#rad_sec").show();
        $(this).addClass('active').siblings().removeClass('active');
    } else if ($(this).index() === 2) {
        alert('开发中,敬请期待')
    }
});


function TimeShow(firsturl, securl) {
    $('.lay_content .lay_top ul li').eq(0).addClass('lay_active').siblings().removeClass('lay_active');
    $('#lay_total').show().siblings().hide();
    var informArr = [];
    var yearSum = 0;
    var monthSum = 0;
    var yearArr = [];
    var monthArr = [];
    var informSum = 0;
    var area = $('#bar_box').attr('data-area');
    var year = $('#bar_box').attr('data-year');
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

// 名义聚焦点击跳转页面
// $('#focus').click(function() {
//     window.location.href = './phone_list.html';
//     window.localStorage.setItem('firsturl', 'openapi/sqmy/mytp/ygrxcountbytype.do');
//     window.localStorage.setItem('securl', 'openapi/sqmy/mytp/ygrxinfobytype.do');
// });

// 12345点击跳转页面
// $('#bar_box').click(function() {
//     window.location.href = './phone_list.html';
//     window.localStorage.setItem('firsturl', 'openapi/sqmy/mytp/ygrxcountbytype.do');
//     window.localStorage.setItem('securl', 'openapi/sqmy/mytp/ygrxinfobytype.do');
// });

// 三服务点击跳转页面
$('#bar_sec_box').click(function() {
    window.location.href = './phone_threelist.html';
});

// 统战信息点击跳转页面
$('.inform .month li').click(function() {
    var index = $(this).index();
    if (index == 1) {
        window.location.href = './phone_tzxxinfo.html';
    }
});

// 社情民意点击跳转页面
$('#inform_box').click(function() {
    window.location.href = './phone_list_spc.html';
    window.localStorage.setItem('firsturl', 'openapi/sqmy/mytp/sqmycountbytype.do');
    window.localStorage.setItem('securl', 'openapi/sqmy/mytp/sqmyinfobytype.do');
});

// 采用汇总点击跳转页面
$('.social .nav li').click(function() {
    var index = $(this).index();
    if (index == 1) {
        window.location.href = './phone_cyhzinfo.html';
    }
});

// 统战信息点击跳转页面
// $('#inform_sec_box').click(function() {
//     window.location.href = './phone_list.html';
//     window.localStorage.setItem('firsturl', 'openapi/sqmy/mytp/tzxxcountbytype.do');
//     window.localStorage.setItem('securl', 'openapi/sqmy/mytp/tzxxinfobytype.do');
// });

// 社情民意模块轮播图点击跳转页面
$('#soc_first').click(function() {
    var yearNum = $('#social-year-content').html();
    var year = yearNum.substring(0, yearNum.length - 1);
    var monthNum = $("#time_content").html();
    var month = monthNum.substring(0, monthNum.length - 1);

    window.location.href = './phone_societyinform.html';
    window.localStorage.setItem('year', year);
    window.localStorage.setItem("month", month);
    window.localStorage.setItem('state', 0);
});

// 界别协商点击跳转页面
$("#rad_first").click(function() {
    window.location.href = './phone_jbxsinfo.html';
});

// 请你来协商点击跳转页面
$('#rad_sec').click(function() {
    window.location.href = './phone_qnlxsinfo.html';
});

// 成果采纳点击跳转页面
$('#abstract_line').click(function() {
    window.location.href = './phone_cgcninfo.html';
});

// 12345点击跳转页面
$('#bar_box').click(function() {
    window.location.href = './phone_onelist.html';
});

// 点击跳转定时器柱状图
$('#spc_num').click(function() {
    var year = $('#center_year').html().slice(0, 4);
    window.location.href = './phone_layBar.html';
    window.localStorage.setItem('year', year);
})