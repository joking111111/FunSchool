var http = require('../../utils/util')
var app = getApp()
var url = 'https://route.showapi.com/341-1'

Page({
    data: {
        page: 1,
        loadingHide: false,
        hideFooter: true,
        jokeList: [],
    },

    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        var that = this
        //请求笑话列表
        http.request(url, this.data.page,
            function (dataJson) {
                // console.log( dataJson )
                that.setData({
                    jokeList: that.data.jokeList.concat(dataJson.contentlist),
                    loadingHide: true
                })
            },
            function (reason) {
                console.log(reason)
                that.setData({
                    loadingHide: true
                })
            })

    },

    /**
     * 分享
     */
    onShareAppMessage: function (res) {
        return {
            title: '分享给好友',
            path: '/pages/joke/joke',
            success: function (res) {
                // 转发成功
                wx.showToast({
                    title: '转发成功',
                    image: '/image/success.png'
                })
            },
            fail: function (res) {
                // 转发失败
                wx.showToast({
                    title: '取消转发',
                    image: '/image/failure.png'
                })
            }
        }
    },

    /**
     * 下拉刷新
     */
    refresh() {
        console.log('joke-refresh')
        wx.showToast({
            title: '已加载最新',
            icon: 'success'
        })

        // var that = this
        // this.setData({
        //     page: 1,
        //     jokeList: []
        // })
        // http.request(url, this.data.page, function (dataJson) {
        //     that.setData({
        //         jokeList: that.data.jokeList.concat(dataJson.contentlist)
        //     })
        //     wx.stopPullDownRefresh()
        // }, function (reason) {
        //     console.log(reason)
        //     wx.stopPullDownRefresh()
        // })
    },

    /**
     * 滑动到底部加载更多
     */
    loadMore() {
        console.log('joke-loadMore')
        wx.showToast({
            title: '加载更多',
            icon: 'loading'
        })

        //请求笑话列表
        var that = this
        //显示footer
        this.setData({
            hideFooter: !this.data.hideFooter
        })
        //请求笑话列表
        http.request(url, ++this.data.page,
            function (dataJson) {
                // console.log( dataJson )

                that.setData({
                    jokeList: that.data.jokeList.concat(dataJson.contentlist),
                    hideFooter: !that.data.hideFooter
                })
            },
            function (reason) {
                console.log(reason)
                that.setData({
                    hideFooter: !that.data.hideFooter
                })
            })
    },

    /**
     * 长按
     */
    longClick(event) {
        console.log('longClick')

        wx.setClipboardData({
            data: event.target.dataset.content,
            success: function (res) {
                wx.showToast({
                    title: '已复制到粘贴板',
                    icon: 'success'
                })
                // wx.getClipboardData({
                //     success: function (res) {
                //         console.log(res.data) // data
                //     }
                // })
            }
        })
    },

    /**
     * 评论区
     */
    comment(event) {
        console.log(event.target.dataset.ct)
    }
})