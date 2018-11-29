/**
 * Created by SP0015 on 2018/11/21.
 */
require.config({
    paths: {
        mock: 'js/mock-min'
    }
});
require(['mock'], function(Mock) {

    /*第一部分与第二部分没有关系*/

    /*第一部分*/
    // Mock.mock( template )
    //数据模板
    var data = Mock.mock({
        'list|4': [{
            'id|+1': 1
        }],
        name: Mock.Random.cname(),  //随机产生一个中文的姓名
        addr: Mock.mock('@county(true)'), //随机生成一个地址
        'age|18-60': 1, //随机生成一个数字 大小在18到60
        birth: Mock.Random.date(), //随机生成一个日期
        sex: Mock.Random.integer(0, 1),//随机生成一个整数，0/1 ，根据这个来给“男” “女”
        email: Mock.mock('@EMAIL()'), //随机生成一个邮箱
        'moblie|1': ['13531544954', '13632250649', '15820292420', '15999905612'], //在数组中随机找一个
        'num1|1-100.2': 1, //1-100 中随机生成一个保留两位小数点
        'num2|100-300.2': 1,
        'classroom|1': ['精品语文班', '精品作业A班', '英语班', '语文班'],
        'from|1': ['到店咨询', '微店', '壹家教', '学习服务平台'],
        'status|1': ['意识强烈', '预报名', '意向一般', '暂无意向'],
        time: Mock.Random.date('yyyy-MM-dd'),
        mobile: /^1[0-9]{10}$/  //用正则匹配1开头的11位数字的手机号
    });
    Mock.mock(/\.json/, {    //匹配.json文件
        'list|1-10': [{      //数据模板，随机生成一个对象数组
            'id|+1': 1,   //1开始，递增
            'email': '@EMAIL',
            'regexp3': /\d{5,10}/
        }]
    });
    var data3 =Mock.mock(/\.json/, {    //匹配.json文件，可执行匹配成功的参数
        'list|1-10': [{      //数据模板
            'id|+1': 1,
            'email': '@EMAIL',
            'regexp4': /\d{5,10}/,
            'name': Mock.Random.cname(),  //随机产生一个中文的姓名
        }]
    });
    function sendData(url) {
        $.ajax('/login/loginIn.do',{tokenId:"398527188426690560"},function (res) {
            console.log(res)
        });
        // $.ajax({
        //     url: url,
        //     dataType: 'json'
        // }).done(function(data3, status, jqXHR) {
        //     //获得mock数据模板中的数据，打印到body上
        //     $('<pre>').text(JSON.stringify(data3, null,5)).appendTo('body');
        // })
    }
    sendData("hello.json");  //调用方法渲染出数据
})