var vm = new Vue({
    el: '#box',
    data: {
        msg: 'Hello World!',
        info: 0,
    },
    methods: {
        get: function () {
            //发送get请求
            this.info += 1
            axios
                .get('https://www.baidu.com')
                .then(response => (
                    this.info = response
                ))
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });




        }
    }
});
