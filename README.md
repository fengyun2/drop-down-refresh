### JavaScritpt H5 模拟APP页面下拉刷新(demo)

#### 主要原理:
 下拉 -> 提示松开刷新 -> 松开后 -> 开始刷新 -> 刷新成功后还原

#### 事件
 `touchstart` 事件: 当手指触摸屏幕时候出发,即使已经有一个手指放在屏幕上也会触发
 `touchmove` 事件: 当手指在屏幕上滑动的时候会连续触发,在这个事件发生期间,调用preventDefault() 方法可以阻止滚动
 `touchend` 事件: 当手指从屏幕上离开的时候触发。

#### 获取touch坐标是用 pageX,pageY
