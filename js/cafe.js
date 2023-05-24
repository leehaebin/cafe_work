$(function(){
    //검색
    $('.search-select').click(function(e){   
        e.preventDefault();                                  //search-sbox의 diplay 값을 받아서 dp에 저장
        const dp = $('.search-sbox').css("display");        //dp값이 none일때와 block일때 구분한다.
        if(dp == "none"){                                   //none이라면 아래 화살표를 지우고 위에 화살표를 넣는다.
            $('.selectbox').find('.fa-solid')
                .removeClass('fa-angle-down')
                .addClass('fa-angle-up');
            $('.search-sbox').show();                       //search-sbox를 display block으로 바꾼다.
        }else{
            $('.selectbox').find('.fa-solid')               //none과 반대로 처리
            .removeClass('fa-angle-up')
            .addClass('fa-angle-down');
            $('.search-sbox').hide();
        }
    });

    $('.search-sbox>a').click(function(e){
        e.preventDefault();             //a태그 기능 중지
        const txt = $(this).text();
        $('.search-select').text(txt);
        $('.search-sbox').hide();
        $('.select').find('.fa-solid').removeClass('fa-angle-up').addClass('fa-angle-down');
        $('#selectbox').val(txt);
        $('#searchtext').foucs;
    });
    $('.hero li').mouseenter(function(){
        $('.hero li').removeClass('active');
        $(this).addClass('active');
    });

    //slide show
    let slide = setInterval(mySlide, 10000);
    $('.next').click(function(){
        clearInterval(slide);
        mySlide();
        slide = setInterval(mySlide, 10000);
    });

    $('.prev').click(function(){
        clearInterval(slide);
        prevEvent();
        slid = setInterval(mySlide, 10000);
    });

    myTime();
    
    //데이터 가져오기
    jQuery.ajax({
        type:"GET",
        url:"./data/data.json",
        dataType: "JSON",
        success: function(data){
            let list = '';
            for(let i =0; i < data.cafelist.length; i++){
                list += '<li><a href="#" class="d-flex align-items-center justify-content-between">';
                list += '<div class="tbox d-flex align-items-center">';
                list += '<img src="'+data.cafelist[i].img+'"alt="'+data.cafelist[i].num+'">';
                list += '<h1>'+data.cafelist[i].num+'</h1><p class="ellipise">'+data.cafelist[i].content+'</p></div>';
                list += '<div class="cfe d-flex"><p class="ellipise">'+data.cafelist[i].cafename+'</p>';
                list += '<p class="dg">'+data.cafelist[i].comment+'</p></div>';
                list += '</a></li>';
            }
            $('.clist').html(list);
        },
        error:function(xhr, status, error){
            console.log(error);
        }
    })
    
    $(window).on('scroll', function(){
        if($(window).scrollTop()>2000){
            $('.angletop').fadeIn();
        }else{
            $('.angletop').fadeOut();
        }
    });

    $('.angletop').click(function(e){
        e.preventDefault();
        $('html,body').animate({
           scrollTop: '0'
        }, 500)
     });

    

});     //jquery

function mySlide(){
    const eq0 = $('.hero .new:eq(0)');                  //최초로 보이는 new
    const eq1 = $('.hero .new:eq(1)');                  //그 뒤에 숨어있는 new
    eq1.addClass('zindex').css('opacity', 0).animate({  //animate를 통해 두 번쨰 new에 zindex를 추가하여 제일 앞에 보이게 하고 투명처리 할 후 점차 진하게 보이게한다.
        'opacity': 1
    },10, function(){                                  //animate작업이  끝아면 이전에 보였던 new의 zindex를 지우고 가장 나중으로 바꿔준다.
        eq1.find('li').eq(ranDomList()).addClass('active');
        eq0.removeClass('zindex');
        eq0.find('.li').removeClass('active');
        $('.hero').append(eq0);
    });
}

function ranDomList(){
    return Math.floor(Math.random()*4);
}

function prevEvent(){
    $('.new:first-child').removeClass("zindex");
    $('.new:last-child').addClass('zindex').clone().prependTo('.hero').end();
    $('.new:last-child').remove();
}

function myTime(){
    let dt = new Date();
    let y = dt.getFullYear();
    let m = dt.getMonth();
    let d = dt.getDate();
    let h = dt.getHours();
    let mm = dt.getMinutes();

    let mt = `${y}.${m}.${d}.<strong>${h}:${mm}</strong>`;
    $('.thetime').html(mt);
}