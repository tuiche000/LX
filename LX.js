/**
 * Created by lx on 2017/7/10.
 */
var d = document;
/*
    Ajax对象
    url:文件地址
    suc:响应成功回调函数
    err:响应失败回调函数
 */
function Ajax(url,suc,err){
    //创建XMLHttpRequest对象
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //请求
    xmlhttp.open('POST',url + "?t=" + new Date().getTime(),true);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4)
        {
            if(xmlhttp.status==200){
                res = xmlhttp.responseText;
                suc(res);
            }else {
                if(err){
                    err(xmlhttp.status);
                }
            }
        }
    }
};

/*
    下拉框
 */

function DropDown(){
    var sj = $(".sanjiao");
    var input = $("#input");
    var ul = $("#ul");
    var li = ul.find('li');
    sj.click(function(){
        ul.slideToggle(0);
        li.removeClass('active')
    });
    input.on('input',function(){
        var v = $(this).val();
        var patt = new RegExp(v);
        for(var i=0; i<li.length; i++){
            var val = li.eq(i).text();
            console.log(val);
            if(patt.test(val)){
                li.eq(i).show().siblings().hide();
                if(v == null || v== ""){
                    li.show();
                }
            }
        }
    });


    var index1;
    //键盘按下
    input[0].onkeydown=function(e){
        var key = e || event;
        if(key.keyCode == 40){
            if(!index1 && index1!=0){
                index1= -1;
            }
            if(index1 < li.length-1){
                index1++;
            }
            console.log(index1);

            li.eq(index1).addClass('active').siblings().removeClass('active');
        }
        if(key.keyCode == 38){
            if(index1 > 0){
                index1--;
            }
            console.log(index1);

            li.eq(index1).addClass('active').siblings().removeClass('active');
        }
        if(key.keyCode == 13){
            var val = $(".active").text();
            console.log(val)
            console.log(input.text())
            input.val(val);
        }
    }



}

