function changeNum(id, newNum) {
    newNum = parseInt(newNum);
    $("#" + id).attr("data-value", newNum);
    var num = parseInt($("#" + id).html());
    var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
    $("#" + id).animateNumber({
        number: newNum,
        numberStep: comma_separator_number_step
    });
}
// 社情民意图谱中间板块信息显示
function changeCenter(year, area) {
    // 1234市民热线
    post("/openapi/sqmy/mytp/ygrxsumbyyear.do", {
        data: {
            year: year,
            area: area,
        },
        async: false,
        success: function(data) {
            changeNum("num1", data.result);
        }
    });

    // 社会矛盾纠纷调处调解中心
    post("/openapi/sqmy/mytp/mdzxsumbyyear.do", {
        data: {
            year: year,
            area: area,
        },
        async: false,
        success: function(data) {
            changeNum("num2", data.result);
        }
    });

    // 政协工作平台
    post("/openapi/sqmy/mytp/zxgzsumbyyear.do", {
        data: {
            year: year,
            area: area,
        },
        async: false,
        success: function(data) {
            changeNum("num3", data.result);
        }
    });

    // 政协信息平台
    post("/openapi/sqmy/mytp/zxxxsumbyyear.do", {
        data: {
            year: year,
            area: area,
        },
        async: false,
        success: function(data) {
            changeNum("num4", data.result);
        }
    });
    changeNum("middle_sum", parseInt($("#num1").attr("data-value")) + parseInt($("#num2").attr("data-value")) + parseInt($("#num3").attr("data-value")) + parseInt($("#num4").attr("data-value")));
}
changeCenter(2021, '');

$(function() {
    // 中间板块点击年份切换数据
    $('.container_middle .down dd').click(function() {
        var index = $(this).index();
        var res = 0;
        if (index === 0) {
            res = 2020;
        } else if (index === 1) {
            res = 2021;
        }
        changeCenter(res, '');

        $('.container_middle .year').html(function() {
            return $('.container_middle .down dd').eq(index).html();
        });
    })
});

function SocInform(starttime, endtime) {
    var informArr = [];
    // 把盒子里面的内容全都删除然后重新添加
    $('.se4 .swiper-wrapper').children().remove();
    post("openapi/sqmy/mytp/sqmydata.do", {
        data: {
            starttime: starttime,
            endtime: endtime,
            state: 0,
            page: 1,
            size: 20,
        },
        async: false,
        success: function(data) {
            informArr = data.datalist;
            if (informArr.length < 10) {
                $('#lay_four #lay_more').html('没有更多了');
            } else {
                $('#lay_four #lay_more').html('加载更多');
            }
        }
    });
    for (var i = 0; i < informArr.length; i++) {
        if (i % 5 === 0) {
            var slide = document.createElement('div');
            slide.className = 'swiper-slide';
            $("#name_content dl .swiper-wrapper").append(slide);
        }
        var dd = document.createElement('dd');
        dd.innerHTML = '<div class="page">' + informArr[i].iid + '</div><div class="caption">' + informArr[i].name + '</div><div class="sector">' + informArr[i].inputuser + '</div><div class="author">' + informArr[i].typename + '</div>';
        slide.append(dd);
    }
}
SocInform('2021-08-01', '2021-08-30');

function useInform(starttime, endtime) {
    var nInformArr = [];
    // 先把盒子里面的内容全都删除然后重新添加
    $('.se5 .swiper-wrapper').children().remove();
    post("openapi/sqmy/mytp/sqmydata.do", {
        data: {
            starttime: starttime,
            endtime: endtime,
            state: 1,
            page: 1,
            size: 20,
        },
        async: false,
        success: function(data) {
            nInformArr = data.datalist;
            if (nInformArr.length < 10) {
                $('#lay_four #lay_more').html('没有更多了');
            } else {
                $('#lay_four #lay_more').html('加载更多');
            }
        }
    });
    for (var i = 0; i < nInformArr.length; i++) {
        if (i % 5 === 0) {
            var slide = document.createElement('div');
            slide.className = 'swiper-slide';
            $("#use_content dl .swiper-wrapper").append(slide);
        }
        var dd = document.createElement('dd');
        dd.innerHTML = '<div class="page">' + nInformArr[i].iid + '</div><div class="caption">' + nInformArr[i].name + '</div><div class="sector">' + nInformArr[i].inputuser + '</div><div class="author">' + nInformArr[i].typename + '</div>';
        slide.append(dd);
    }
}
useInform('2021-08-01', '2021-08-30');

$(function() {
    $('.public .first .choice .time').click(function(e) {
        $('.public .first .menu').slideToggle(400);
        e.stopPropagation();
    });
    $('.public .sec .choice .time').click(function(e) {
        $('.public .sec .menu').slideToggle(400);
        e.stopPropagation();
    });

    $('#public .first .menu dd').click(function() {
        var index = $(this).index();
        var starttime = null;
        var endtime = null;
        if (index === 0) {
            starttime = '2021-08-01';
            endtime = '2021-08-30';
        } else if (index === 1) {
            starttime = '2020-08-01';
            endtime = '2021-07-30';
        }
        SocInform(starttime, endtime);
        var index = $(this).index()
        $('#public .first .choice .time span').html(function() {
            return $('#public .first .menu dd').eq(index).html();
        })
    });

    $('#public .sec .menu dd').click(function() {
        var index = $(this).index();
        var starttime = null;
        var endtime = null;
        if (index === 0) {
            starttime = '2021-08-01';
            endtime = '2021-08-30';
        } else if (index === 1) {
            starttime = '2020-08-01';
            endtime = '2021-07-30';
        }
        useInform(starttime, endtime);
        var index = $(this).index()
        $('#public .sec .choice .time span').html(function() {
            return $('#public .first .menu dd').eq(index).html();
        })
    });
});
$(function() {
    /**
     * spcPage 页数
     * intro   输入框里面的内容
     * starttime  开始时间
     * endtime    结束时间
     * state  0/1 ajax申请的数据不同
     */
    var spcPage = 2;
    var intro = null;
    var starttime = null;
    var endtime = null;
    var month = null;
    var res = 0;
    var state = 1;

    function titular(starttime, endtime, state, page, intro) {
        post("openapi/sqmy/mytp/sqmydata.do", {
            data: {
                starttime: starttime,
                endtime: endtime,
                state: state,
                page: page,
                size: 10,
                keyword: intro
            },
            async: false,
            success: function(data) {
                informArr = data.datalist;
                // 需要判断内容的长度 如果请求的数据小于10了就代表没有更多数据了  需要显示没有更多
                if (informArr.length < 10) {
                    $('#lay_four #lay_more').html('没有更多了');
                } else {
                    $('#lay_four #lay_more').html('加载更多');
                }
                console.log(informArr.length);
            }
        });
        for (var i = 0; i < informArr.length; i++) {
            var list = document.createElement('div');
            list.className = 'list';
            list.setAttribute('title', informArr[i].name);
            $("#lay_four .content .lists").append(list);
            list.innerHTML = '<div class="page">' + informArr[i].iid + '</div>' + '<div class="headline">' + informArr[i].name + '</div>' + '<div class="autor">' + informArr[i].inputuser + '</div>' + '<div class="leader">' + informArr[i].typename + '</div>'
        };
    };

    // 社情民意点击出现弹出层
    $('#name_content').click(function() {
        // 社情民意接口的申请数据为0
        state = 0;
        // 先把输入框里的内容清空
        $('#lay_four #text').val('');
        // 把信息也全都删除
        $('#lay_four .lay_one_detail .content .list').remove();
        intro = $('#lay_four #text').val();
        console.log(intro);
        if ($("#middle_year").html() === '2021年度') {
            if ($('.public .first .choice .time span').html() == '年度') {
                starttime = '2021-01-01';
                endtime = '2021-08-01';
            } else if ($('.public .first .choice .time span').html() == '月度') {
                starttime = '2021-01-30';
                endtime = '2021-06-01';
            }
        } else if ($("#middle_year").html() === '2020年度') {
            if ($('.public .first .choice .time span').html() == '年度') {
                starttime = '2020-01-01';
                endtime = '2020-12-30';
            } else if ($('.public .first .choice .time span').html() == '月度') {
                starttime = '2020-07-01';
                endtime = '2020-07-30';
            }

        }
        titular(starttime, endtime, state, 1, intro);
        layWindow('lay_third', 1, '#lay_four');
    });


    // 采用汇总点击出现弹出层
    $('#use_content').click(function() {
        // 采用汇总接口的申请数据为1
        state = 1;
        // 先把输入框里的内容清空
        $('#lay_four #text').val('');
        // 把信息也全都删除
        $('#lay_four .lay_one_detail .content .list').remove();
        intro = $('#lay_four #text').val();
        console.log(intro);
        if ($("#middle_year").html() === '2021年度') {
            if ($('.public .sec .choice .time span').html() == '年度') {
                starttime = '2021-01-01';
                endtime = '2021-08-01';
            } else if ($('.public .sec .choice .time span').html() == '月度') {
                starttime = '2021-01-30';
                endtime = '2021-06-01';
            }
        } else if ($("#middle_year").html() === '2020年度') {
            if ($('.public .sec .choice .time span').html() == '年度') {
                starttime = '2020-01-01';
                endtime = '2020-12-30';
            } else if ($('.public .sec .choice .time span').html() == '月度') {
                starttime = '2020-07-01';
                endtime = '2020-07-30';
            }
        }
        titular(starttime, endtime, state, 1, intro);
        layWindow('lay_third', 1, '#lay_four');
    });

    // 点击搜索出现相关内容
    $('#lay_four #submit').click(function() {
        spcPage = 2;
        var index = 1;
        intro = $("#lay_four #text").val().trim();
        // $("#text").val();
        var moreArr = [];
        // 先清除所有的
        $('#lay_four .lay_one_detail .content .list').remove();
        titular(starttime, endtime, state, index, intro);
        // 判断如果它的内容长度少于
        // 关键词高亮
        var span = document.createElement('span');
        span.className = 'red';
        span.innerHTML = intro;
        $('#lay_four .list .headline').html(function(i, oldHTML) {
            return oldHTML.replace(intro, `<span class="red">${intro}</span>`);
        });
    });

    // 点击加载更多
    $('#lay_four #lay_more').click(function() {
        titular(starttime, endtime, state, spcPage, intro);
        // 关键词高亮
        var span = document.createElement('span');
        span.className = 'red';
        span.innerHTML = intro;
        $('#lay_four .list .headline').html(function(i, oldHTML) {
            return oldHTML.replace(intro, `<span class="red">${intro}</span>`);
        });
        spcPage++;
    });
});
// 社情民意模块列表页点击出现详细信息
$('#lay_four .lists').delegate('.list', 'click', function() {
    layWindow('lay_content', 1, '#lay_sec');
    var that = $(this);
    $("#lay_sec .content").html(function() {
        return that.attr('title');
    });
});