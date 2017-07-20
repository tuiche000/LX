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
    li.click(function(){
        var val = $(this).text();
        input.val(val);
    })

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

/*
 验证码
 id:元素的ID
 len:验证码长度
 Val:input的值
 */
function captcha(id,len){
    this.checkCode = d.getElementById(id);
    this.codeLenght = len; //验证码的长度
    this.codeData =
        [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'

        ]   //所有候选组成验证码的字符，当然也可以用中文的
}
captcha.prototype.createCode = function(){

    this.code ="";
    for(var i = 0; i<this.codeLenght; i++){
        this.charNum = this.codeData[Math.floor(Math.random() * this.codeData.length)];
        this.code += this.charNum;
    }
    if(this.checkCode){
        this.checkCode.className = "code";
        this.checkCode.innerHTML = this.code;
    }
}
captcha.prototype.checkCaptcha = function(val){
    this.inputCode = d.getElementById(val).value;
    console.log(this.inputCode.toUpperCase())
    console.log(this.code.toUpperCase())
    if(this.inputCode.length <= 0){
        alert('请输入验证码');
        return false;
    }
    if((this.inputCode.toUpperCase()) != (this.code.toUpperCase())){
        alert('输入验证码有误')
        this.createCode();
        this.inputCode.value="";
        return false;
    }
    alert('验证码正确');

};