//top nav

var yanzhengma = -Math.random();
var count = 10;
function openYanzheng(value){
    layer.open({
        type:1,
        title:'请输入短信验证码',
        area:['300px','170px'],
        content:'<input type="text" id="yanzhen" onkeyup="yanzhen('+value+')"/><div class="tishi"></div>'
    })
    //开始计时  
    
    $(".tishi").html("短信验证码已发送至+86"+value+"<br/>" + count + "秒后可重新发送");  
    var timer = setInterval(function(){  
    count--;
    $(".tishi").html("短信验证码已发送至+86"+value+"<br/>" + count + "秒后可重新发送"); 
    if (count<=0) {
        $('.zhuceBtn').attr('data-allowed','allowed')
        clearInterval(timer);
        $(".tishi").html("<a href=''>重新发送验证码</a>");
    }
    },1000);
}
jQuery(document).ready(function () {
    
    var qcloud = {};
    $('[_t_nav]').hover(function () {
        var _nav = $(this).attr('_t_nav');
        clearTimeout(qcloud[_nav + '_timer']);
        qcloud[_nav + '_timer'] = setTimeout(function () {
            $('[_t_nav]').each(function () {
                $(this)[_nav == $(this).attr('_t_nav') ? 'addClass' : 'removeClass']('curr');
            });
            $('#' + _nav).stop(true, true).slideDown(200);
        }, 150);
    }, function () {
        var _nav = $(this).attr('_t_nav');
        clearTimeout(qcloud[_nav + '_timer']);
        qcloud[_nav + '_timer'] = setTimeout(function () {
            $('[_t_nav]').removeClass('curr');
            $('#' + _nav).stop(true, true).slideUp(200);
        }, 150);
    });
    //内页tab
    $('#maintab > li').click(function(){
        var mtab = $(this).index();
        $(this).addClass('curr').siblings().removeClass('curr');
        $('.mainbox').eq(mtab).show().siblings('.mainbox').hide();
    });
    $('.submain a').click(function(){
        if($(this).attr('href').split('#')[0] ===window.location.pathname){
            location.reload();
        } 
    })
    $('#number').keyup(function(e){
        var value = e.target.value;
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        $('.warning').remove();
        if(value&&reg.test(value)){
           $('.zhuceBtn').attr('data-allowed','allowed')
        }else{
            $('.zhuceBtn').attr('data-allowed','')
        }
    })
    $('#zhuce').click(function(){
        var value = $('#number').val();
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if($('.zhuceBtn').attr('data-allowed')==='allowed'){
            // if(value==='17318077256'){
            //     $('.warning').remove();
            //     $('#number').after("<span class='warning'>17318077256 该账号已注册！</span>")
            // }else{
                $('.zhuceBtn').attr('data-allowed','')
                window.fetch('http://192.168.10.233:9402/api',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:btoa(JSON.stringify({
                        cmdId:264,
                        version:0,
                        content:{
                        phone:value,
                        isReg:true
                       }
                    }))
                }).then(function(res){
                    return res.text()
                }).then(function(data){
                    var resp = JSON.parse(atob(data));
                    console.log(resp,typeof resp);
                    
                    if(resp.status===0){
                        openYanzheng(value)
                    }else{
                        alert(resp.msg)
                    }
                }).catch(function(e){
                    console.log(e.message,e);
                    
                })

            // }
        }
        
    })
});

    var isLogin = sessionStorage.getItem('user');
    if(!isLogin){
        $('.touxiang').html('<a href="./zhuce.html"><img src="./images/unlogin.png" alt=""></a>')
    }
    $('.touxiang').click(function(){
        if(isLogin){
            $('.touxiang>ul').toggle()
        }
    })
    function yanzhen(phone){
      if($('#yanzhen').val().length===6){
          console.log($('#yanzhen').val());
                window.fetch('http://192.168.10.233:9402/api',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:btoa(JSON.stringify({
                        cmdId:260,
                        version:0,
                        content:{
                            channelId :0,
                            phone :phone,
                            validCode:$('#yanzhen').val(),
                            gameId:0
                       }
                    }))
                }).then(function(res){
                    return res.text()
                }).then(function(data){
                    var resp = JSON.parse(atob(data));
                    console.log(resp,typeof resp);
                    
                    if(resp.status===0){
                       
                    }else{
                        alert(resp.msg)
                    }
                }).catch(function(e){
                    console.log(e.message,e);
                    
                })
      }
    }
