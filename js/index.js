// jquery 入口函数
// 顶部通栏 的开始
$(function () {
    // 购物车 部分
    $('.buycar').mouseover(function () {
        $(this).css({
            'color': '#FF6700',
            'backgroundColor': '#fff'
        })
        $('.buy_car').stop().slideDown();
    })
    $('.buycar').mouseout(function () {
        $(this).css({
            'color': '#b0b0b0',
            'backgroundColor': '#424242',
            'zIndex': '5'
        })
        $('.buy_car').stop().slideUp();
    })
})
// 顶部通栏 的结束

// 顶部导航 的开始
nav();
function nav() {
    //ajax  
    $.ajax({
        url: 'http://192.168.70.60:9900/api/nav',
        dataType: 'json',
        success: function (data) {
            var obj1 = {
                items: data
            }
            var str1 = template("tp1", obj1);
            $(".navbar #nav_list ul").append(str1);

            var lis = document.querySelectorAll("#nav_list li");
            for (var i = 0; i < 7; i++) {
                $(lis[i]).hover(function () {
                    var key = this.type;
                    $.ajax({
                        url: 'http://192.168.70.60:9900/api/nav',
                        dataType: 'json',
                        data: { type: key },
                        success: function (data) {
                            var obj2 = {
                                items: data
                            }
                            var str2 = template("tp2", obj2);
                            $('.nav_tab').html(str2);
                        }
                    })
                    $(".nav_tab").stop().slideDown(700);
                }, function () {
                    $(".nav_tab").stop().slideUp(700);
                });
                $('.nav_tab').hover(function () {
                    $('.nav_tab').stop().slideDown(700);
                }, function () {
                    $('.nav_tab').stop().slideUp(700);
                });
            }
        }
    })

    $('.search .inp_text').focus(function () {
        $('.txt_01').css('display', 'none');
        $('.txt_02').css('display', 'none');
        $(this).css({
            'border': '1px solid #FF6700'
        })
        $('.icon-search').css('border', '1px solid #ff6700');
        $('.search>ul').css({
            'border': '1px solid #ff6700',
            'display': 'block'
        })
    })
}

// 顶部导航 的结束

// 主体轮播图部分 的开始
lunBoTu();
function lunBoTu() {
    $.ajax({
        url: 'http://192.168.70.60:9900/api/lunbo',
        dataType: "json",
        success: function (backData) {
            var str = template("tempBanner", { datas: backData });
            $(".banner").html(str);

            var num = 0
            var timer = null;
            $(".banner li").eq(0).show();

            $(".bannerWrap .pre").click(function () {
                num--;
                if (num < 0)
                    num = 4;
                $(".banner li").eq(num).fadeIn().siblings().hide();
            });
            $(".bannerWrap .next").click(function () {
                myFn();
            });

            function myFn() {
                num++;
                if (num > 4)
                    num = 0;
                $(".banner li").eq(num).fadeIn().siblings().hide();
            }
            timer = setInterval(myFn, 1500);

            $(".banner").hover(function () {
                clearInterval(timer);
            }, function () {
                timer = setInterval(myFn, 3000);
            })
        }
    });
    $.ajax({
        url: 'http://192.168.70.60:9900/api/items',
        dataType: "json",
        success: function (backData) {
            var str = template("tempMenu", { datas: backData });
            $(".menuItems").html(str);

            $(".menuItems li").hover(function () {
                var type = $(this).attr("data-type");
                $.ajax({
                    url: 'http://192.168.70.60:9900/api/items',
                    data: {
                        type: type
                    },
                    dataType: "json",
                    success: function (backData) {
                        var ulLen = Math.ceil(backData.length / 6);
                        $(".menuDetail").empty();
                        for (var i = 0; i < ulLen; i++) {
                            var ul = document.createElement("ul");
                            if (i < ulLen - 1) {
                                for (var j = 0; j < 6; j++) {
                                    var str = backData[i * 6 + j].buyStatus == "true" ? '<li><a href="' + backData[i * 6 + j].sourceUrl + '"> <img src="' + backData[i * 6 + j].imgUrl + '" alt=""> <h4>' + backData[i * 6 + j].name + '</h4> </a> <a href="' + backData[i * 6 + j].buyUrl + '">选购</a> </li>' : '<li><a href="' + backData[i * 6 + j].sourceUrl + '"> <img src="' + backData[i * 6 + j].imgUrl + '" alt=""> <h4>' + backData[i * 6 + j].name + '</h4> </a> <a  class="buyStatus" href="' + backData[i * 6 + j].buyUrl + '">选购</a> </li>';
                                    $(ul).append(str);
                                }
                            } else {
                                for (var k = 0; k < (backData.length - (ulLen - 1) * 6); k++) {
                                    var str = backData[i * 6 + k].buyStatus == "true" ? '<li><a href="' + backData[i * 6 + k].sourceUrl + '"> <img src="' + backData[i * 6 + k].imgUrl + '" alt=""> <h4>' + backData[i * 6 + k].name + '</h4> </a> <a href="' + backData[i * 6 + k].buyUrl + '">选购</a> </li>' : '<li><a href="' + backData[i * 6 + k].sourceUrl + '"> <img src="' + backData[i * 6 + k].imgUrl + '" alt=""> <h4>' + backData[i * 6 + k].name + '</h4> </a> <a href="' + backData[i * 6 + k].buyUrl + '" class="buyStatus">选购</a> </li>';
                                    $(ul).append(str);
                                }
                            }
                            $(".menuDetail").append(ul);
                        }

                    }
                });

                $(".menuDetail").stop().show();
            }, function () {
                $(".menuDetail").stop().hide();
            });

            $(".menuDetail").hover(function () {
                $(".menuDetail").stop().show();
            }, function () {
                $(".menuDetail").stop().hide();
            });

        }
    });
}
// 主体轮播图部分 的结束

// -----------------主体容器 的开始 ------------------------

// -------智能硬件 的开始---------
noopsyche();
function noopsyche() {
    $.ajax({
        url: 'http://192.168.70.60:9900/api/hardware',
        dataType: 'json',
        success: function (data) {
            var obj5 = {
                items: data
            }
            var str5 = template('tp5', obj5);
            $('.noopsyche_content ul').html(str5);
        }
    })
}

// -------智能硬件 的结束---------

// -------搭配区域 的开始---------
match();
function match() {
    $.ajax({
        url: 'http://192.168.70.60:9900/api/product',
        dataType: 'json',
        data: {
            toptitle: 'match'
        },
        success: function (data) {
            var obj6 = {
                items: data.subs
            }
            var str6 = template('tp6', obj6);
            $('.match_top ul').html(str6);
            $.ajax({
                url: 'http://192.168.70.60:9900/api/product',
                dataType: 'json',
                data: {
                    toptitle: 'match'
                },
                success: function (data) {
                    var obj7 = {
                        items: data.leftGoods
                    }
                    var str7 = template('tp7', obj7);
                    $('.match_left_list').html(str7);
                }
            })
            $.ajax({
                url: 'http://192.168.70.60:9900/api/product',
                dataType: 'json',
                data: {
                    toptitle: 'match'
                },
                success: function (data) {
                    var obj8 = {
                        items: data.hotgoods
                    }
                    var str8 = template('tp8', obj8);
                    $('.match_right_list').html(str8);
                }
            })
        }
    })
}
// -------搭配区域 的结束---------

// -------配件区域 的开始---------
mountings();
function mountings() {
    $.ajax({
        url: 'http://192.168.70.60:9900/api/product',
        dataType: 'json',
        data: {
            toptitle: 'accessories'
        },
        success: function (data) {
            var obj9 = {
                items: data.subs
            }
            var str9 = template('tp9', obj9);
            $('#mountings .mountings_top ul').html(str9);
            $.ajax({
                url: 'http://192.168.70.60:9900/api/product',
                dataType: 'json',
                data: {
                    toptitle: 'accessories'
                },
                success: function (data) {
                    var obj10 = {
                        items: data.leftGoods
                    }
                    var str10 = template('tp10', obj10);
                    $('.mountings_left_list').html(str10);
                }
            })
            $.ajax({
                url: 'http://192.168.70.60:9900/api/product',
                dataType: 'json',
                data: {
                    toptitle: 'accessories'
                },
                success: function (data) {
                    var obj11 = {
                        items: data.hot
                    }
                    var str11 = template('tp11', obj11);
                    $('.mountings_right_list').html(str11);
                }
            })
        }
    })
}
// -------配件区域 的结束---------

// -------周边区域 的开始---------
circum();
function circum() {
    $.ajax({
        url: 'http://192.168.70.60:9900/api/product',
        dataType: 'json',
        data: {
            toptitle: 'around'
        },
        success: function (data) {
            var obj12 = {
                items: data.subs
            }
            var str12 = template('tp12', obj12);
            $('#circum .circum_top ul').html(str12);
            $.ajax({
                url: 'http://192.168.70.60:9900/api/product',
                dataType: 'json',
                data: {
                    toptitle: 'around'
                },
                success: function (data) {
                    var obj13 = {
                        items: data.leftGoods
                    }
                    var str13 = template('tp13', obj13);
                    $('.circum_left_list').html(str13);
                }
            })
            $.ajax({
                url: 'http://192.168.70.60:9900/api/product',
                dataType: 'json',
                data: {
                    toptitle: 'around'
                },
                success: function (data) {
                    var obj14 = {
                        items: data.hotcloths
                    }
                    var str14 = template('tp14', obj14);
                    $('.circum_right_list').html(str14);
                }
            })
        }
    })
}
// -------周边区域 的结束---------

// -------推荐区域 的开始---------
recommend();
function recommend() {
    $.ajax({
        url: 'http://192.168.70.60:9900/api/recommend',
        dataType: 'json',
        data: {
            page: 'num'
        },
        success: function (data) {
            var obj15 = {
                items: data
            }
            var str15 = template('tp15', obj15);
            $('.recommend_list').html(str15);
        }
    })
}

// -------推荐区域 的结束---------

// -------热评区域 的开始---------
comment();
function comment() {
    $.ajax({
        url: 'http://192.168.70.60:9900/api/hotcomment',
        dataType: 'json',
        success: function (data) {
            var obj16 = {
                items: data
            }
            var str16 = template('tp16', obj16);
            $('.comment_list').html(str16);
        }
    })
}
// -------热评区域 的结束---------

// -------内容区域 的开始---------
content();
function content() {
    $.ajax({
        url: 'http://192.168.70.60:9900/api/content',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var obj17 = {
                items: data
            }
            console.log(obj17)
            var str17 = template('tp17', obj17);
            $('.content_list').html(str17);
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 30
            });
        }
    })
}
// -------内容区域 的结束---------

// -------视频区域 的开始---------
video();
function video() {
    $.ajax({
        url: 'http://192.168.70.60:9900/api/video',
        dataType: 'json',
        success: function (data) {
            var obj22 = {
                items: data
            }
            var str22 = template('tp22', obj22);
            $('.video_list').html(str22);
        }
    })
}



// -------视频区域 的结束---------
