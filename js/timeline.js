;(function ($, window, document) {
    let TimeAxis = function (timeList) {
        this.options = {
            data: timeList || [],
            props: {
                name: 'name',
                key: 'time',
            },
            index: 0,
            width: '200px',
            then: function () {}
        };
        this.props = this.options.props;
        this.width = this.options.width;
        this.init();
    };

    TimeAxis.prototype = {
        init: function () {
            let self = this;
            let html = '';
            let list = this.options.data || [];

            $.each(list, function (index, item) {
                html += `<li class="cx-round-box cx-round-box${index}">
					<div class="cx-time-top"></div>
					<div class="cx-time-round" data-index="${index}"></div>
					<div class="cx-time-bottom">${item[self.props.key]}</div></li>`
                if (index !== list.length - 1) {
                    html += `<li class="cx-time-line" style="width: ${self.width}"></li>`;
                }
            });
            $('#cxTime ul').empty().append(html);

            $('#cxTime ul .cx-time-round').on('click', function () {
                self.options.index = $(this).data('index');
                self.timeAxisMove(0);
            })
            this.firstLoad = true;
            this.timeAxisMove(0);

            $('#cxTime>span:first').on('click', function () {
                self.timeAxisMove(-1);
            });
            $('#cxTime>span:last').on('click', function () {
                self.timeAxisMove(1);
            })
        },

        //点击两边
        timeAxisMove: function (num) {
            let list = this.options.data || [];
            this.options.index += num;
            if (this.options.index < 0) {
                this.options.index = list.length - 1;
            }
            if (this.options.index > list.length - 1) {
                this.options.index = 0;
            }
            this.timeAxisRoll();
            this.timeAxisActive(this.options.index);
        },

        // 点击节点
        timeAxisRoll: function () {
            let list = this.options.data || [];
            let width = parseInt(this.width) + 12;
            let firstIndex = this.options.index - 1 < 0?0:this.options.index - 1;
            let roll = -(firstIndex* width);
            let widthBox = $('.cx-time-box').width();//时间轴宽度盒子总宽度
            let widthBox1 = Math.abs(list.length * width); //实际总宽度
            if(widthBox > widthBox1){
                return
            }
            let i = parseInt(widthBox/width);//显示时间轴条数

            if(this.options.index + i >= list.length){
                roll =  -((list.length - 1 - i) * width);
            }

            $('#cxTime ul li').animate({
                'left': roll + 'px'
            });
        },

        // 激活事件
        timeAxisActive: function (num) {
            // 首次加载不执行回调
            if(!this.firstLoad){
                let list = this.options.data || [];
                let data = list[this.options.index];
                this.options.then(data);
            }
            this.firstLoad = false;

            $('.cx-round-box').removeClass('cx-time-active');
            $('.cx-round-box' + num).addClass('cx-time-active');
            let selectVal = $('.cx-round-box' + num).children('.cx-time-bottom').text()
            console.log(selectVal)
        }
    };
    window.oTimeAxios = TimeAxis;
})(jQuery, window, document);