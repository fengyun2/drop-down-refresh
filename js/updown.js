/*
 * @Author: fengyun2
 * @Date:   2016-03-21 16:50:02
 * @Last Modified by:   fengyun2
 * @Last Modified time: 2016-03-21 17:36:24
 */


/**
 * 主要原理:
 * 下拉 -> 提示松开刷新 -> 松开后 -> 开始刷新 -> 刷新成功后还原
 *
 * touchstart事件: 当手指触摸屏幕时候出发,即使已经有一个手指放在屏幕上也会触发
 * touchmove事件: 当手指在屏幕上滑动的时候会连续触发,在这个事件发生期间,调用preventDefault() 方法可以阻止滚动
 * touchend事件: 当手指从屏幕上离开的时候触发。
 * @return {[type]} [description]
 */
window.onload = function () {
//第一步，下拉
    function downRefreshStep1(dist) {	// dist下滑的距离,用以拉长背景模拟拉伸效果
        //拉长背景以模拟拉伸效果
        var down = document.getElementById("down");
        var refresh = document.getElementById("refresh");
        refresh.style.display = "none";
        down.style.display = "block";
        down.style.height = (parseInt("20px") - dist) + "px";
    }

    //第二步，下拉完成，释放后开始刷新
    function downRefreshStep2() {
        var down = document.getElementById("down");
        var refresh = document.getElementById("refresh");
        down.style.display = "none";
        down.style.height = "20px";
        refresh.style.display = "block";
    }

    //第三步，刷新完成关闭提示区
    function downRefreshStep3() {
        var down = document.getElementById("down");
        var refresh = document.getElementById("refresh");
        down.style.display = "none";
        refresh.style.display = "none";
    }

    /**
     * @param  {[type]} objId objId表示事件绑定对象，即：执行下拉刷新的对象
     * @param  {[type]} way   way -> x表示水平方向的操作,y表示垂直方向的操作
     * @return {[type]}       [description]
     */
    function downRefresh(objId, way) {
        var _content = document.getElementById(objId);
        var _start = 0;
        var _end = 0;
        _content.addEventListener("touchstart", touchStart, false);
        _content.addEventListener("touchmove", touchMove, false);
        _content.addEventListener("touchend", touchEnd, false);

        //touchstart事件监听
        function touchStart(event) {
            var touch = event.targetTouches[0];
            if (way == "x") {
                _start = touch.pageX;
            } else {
                _start = touch.pageY;
            }
        }

        //touchmove事件监听
        function touchMove(event) {
            var touch = event.targetTouches[0];
            if (way == "x") {
                _end = (_start - touch.pageX);
            } else {
                _end = (_start - touch.pageY);
                //页面下拉(下滑才执行操作)，进入第一步，提示：正在下拉，释放后刷新
                if (_end < 0) {
                    downRefreshStep1(_end);
                }
            }
        }

        //touchend事件监听
        function touchEnd(event) {
            if (_end > 0) {
                console.log("左滑或上滑" + _end);
            } else {
                console.log("右滑或下滑" + _end);
                //下拉结束，进入第二步：正在刷新 ...
                downRefreshStep2();

                //模拟刷新成功，进入第三步，关闭提示区
                setTimeout(function () {
                    downRefreshStep3();
                }, 2500);
            }
        }
    }

//调用downRefresh方法，执行下滑刷新
    downRefresh("content", "y");

};
