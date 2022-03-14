/**
 * @author zhoutao
 * @module index.js
 * sqmytp index.html 下拉效果
 * sqmytp index.html 点击弹出层
 */

// 指示督办模块栏目切换效果
$('.instruct .choice li').click(function() {
    $(this).addClass('active').siblings().removeClass('active');
    if ($(this).index() == 0) {
        $('#ins_bar').show().siblings().hide();
    }
    if ($(this).index() == 1) {
        $('#ins_sec_bar').show().siblings().hide();
    }
    if ($(this).index() == 2) {
        $('#ins_third_bar').show().siblings().hide();
    }
});

// 指示督办模块月份下拉
$('.instruct .time').click(function(e) {
    $('.instruct .menu').slideToggle(400);
    e.stopPropagation();
});

// 高频民生事项第一个下拉
$('.bar .time').click(function(e) {
    $('.bar .menu').slideToggle(400);
    e.stopPropagation();
});

// 高频民生事项第二个下拉
$('.bar_one .time').click(function(e) {
    $('.bar_one .menu').slideToggle(400);
    e.stopPropagation();
});

// 协商议政模块年份下拉
$('.rad .time').click(function(e) {
    $('.rad .menu').slideToggle(400);
    e.stopPropagation();
});

// 成果采纳点击月份下拉
$('.lay_third .time').click(function(e) {
    $('.lay_third dl').slideToggle(400);
    e.stopPropagation();
});

// 实现下拉框点击页面任何位置都可以实现上拉
$('body').click(function() {
    $(".instruct .menu").slideUp("slow");
    $(".rad .menu").slideUp("slow");
    $(".name .menu").slideUp("slow");
    $('.container_middle .down').slideUp('slow');
    $('.bar .menu').slideUp('slow');
    $('.bar_one .menu').slideUp('slow');
    $('.lay_third dl').slideUp('slow');
});

// @@ 中间板块 middle

// 年度下拉
$('.container_middle .select .year').click(function(e) {
    $('.container_middle .down').slideToggle(400);
    e.stopPropagation();
});

$('.container_middle .select img').click(function(e) {
    $('.container_middle .down').slideToggle(400);
    e.stopPropagation();
});


$(function() {
    // 民意聚焦点击出现弹出层
    $('#focus').click(function() {
        openDialog(['949px', '755px'], './pc_ce.html');
        window.localStorage.setItem('firsturl', 'openapi/sqmy/mytp/ygrxname2countbytype.do');
        window.localStorage.setItem('securl', 'openapi/sqmy/mytp/ygrxinfobytype.do');
        var area = $('#bar_box').attr('data-area');
        window.localStorage.setItem('area', area);
    });

    // 社会信息模块12345点击出现弹出层
    $('.container_left .bar .bar_box').click(function() {
        openDialog(['949px', '755px'], './pc_ce.html');
        window.localStorage.setItem('firsturl', 'openapi/sqmy/mytp/ygrxname2countbytype.do');
        window.localStorage.setItem('securl', 'openapi/sqmy/mytp/ygrxinfobytype.do');
        var area = $('#bar_box').attr('data-area');
        window.localStorage.setItem('area', area);
    });

    // 社会信息模块三服务点击出现弹出层
    $('#bar_sec_box').click(function() {
        var year = $('#middle_year').html();
        var res = 0;
        if (year == '2021年度') {
            res = 2021;
        } else if (year = '2020年度') {
            res = 2020;
        }
        openDialog(['640px', '640px'], './threeServersList.html');
        var area = $('#bar_box').attr('data-area');
        window.localStorage.setItem('area', area);
        window.localStorage.setItem('year', res);
    });

    // 政协信息模块社情民意点击出现弹出层
    $('#bar_c').click(function() {
        openDialog(['640px', '640px'], './pc_list_spc.html');
        window.localStorage.setItem('firsturl', 'openapi/sqmy/mytp/sqmycountbytype.do');
        window.localStorage.setItem('securl', 'openapi/sqmy/mytp/sqmyinfobytype.do');
        window.localStorage.setItem('choice', '1');
        var area = $('#bar_box').attr('data-area');
        window.localStorage.setItem('area', area);
    });

    // 社情民意模块社情民意轮播图点击弹出层
    $('#name_content').click(function() {
        openDialog(['690px', '680px'], './pc_society_inform.html');
        var yearNum = $('#name_year').html();
        var year = yearNum.substring(0, yearNum.length - 1);
        var monthNum = $("#name_month").html();
        var month = monthNum.substring(0, monthNum.length - 1);
        window.localStorage.setItem('year', year);
        window.localStorage.setItem("month", month)
        window.localStorage.setItem('state', 0);
    });

    // 采用汇总点击弹出层
    $('#use_title').click(function() {
        openDialog(['1200px', '630px'], './pc_use.html');
    });

    // 成果采纳点击弹出层
    $('#ins_bar').click(function() {
        openDialog(['800px', '630px'], './pc_result.html');
    });

    // 协商议政模块请你来协商点击弹出层
    $('#pie_sec').click(function() {
        openDialog(['800px', '630px'], './pc_qnlxs.html');
    });

    // 协商议政模块在线协商按钮点击弹出层
    $('#zxxs-btn').click(function() {
        openDialog(['800px', '630px'], './pc_zxxs.html');
    });

    // 协商议政模块界别协商点击弹出层
    $('#pie').click(function() {
        openDialog(['800px', '630px'], './pc_jbxs.html');
    });

    // 数据点击出现柱状图
    $('#middle_sum').click(function() {
        var year = $('#middle_year').html();
        var res = 0;
        if (year == '2021年度') {
            res = 2021;
        } else if (year = '2020年度') {
            res = 2020;
        }
        var area = $('#bar_box').attr('data-area');
        window.localStorage.setItem('area', area);
        window.localStorage.setItem('year', res);
        openDialog(['800px', '630px'], './layBar.html');
    });
})