(function (window) {
  'use strict';
  var activityM = {};
  // <%= projectCodeName['name'] %>生产环境 sdpAppId
  var sdpAppId = "<%= projectCodeName['sdpAppId'] %>";
  var unInstallRedirect = "<%= projectCodeName['unInstallRedirect'] %>";
  // 云图
  new CloudAtlas({
    appKey: '<%= projectCodeName['cloudAppKey'] %>',
    appVer: '0.0.1',
    channelId: 'default',
    isLog: false, //设置日志打印开关
    env: 'PRODUCTION',
    isHttps: false,
    limitNumber: 5
  });
  CloudAtlas.onOpen();

  /* 链接跳转登录状态判断*/
  activityM.linkSelect = function () {
    var isNDIM = navigator.userAgent.indexOf("SmartCanWebView") !== -1;
    var jssdk_script_tag = document.createElement("script");
    var jssdk_script_root = document.getElementsByTagName("script")[0];
    if (isNDIM) {
      jssdk_script_tag.src = "//101.com/JsBridge.js";
      jssdk_script_root.parentNode.insertBefore(
        jssdk_script_tag,
        jssdk_script_root
      );
      window.bridgeReady = function () {
        var uc = Bridge.require("sdp.uc").promise();
        var userId = uc.getCurrentUserId();
        CloudAtlas.onProfileSignIn(userId.toString());
      };

      // 【去阅读打卡】跳转微博组件
      var topic = encodeURIComponent('#阅读达人#');
      $('#btnRead').attr('href', 'cmp://com.nd.social.weibo/weiboCompose?content=' + topic);

      // 【去抽奖】跳转抽奖组件
      $('#btnGift').attr('href', 'cmp://com.nd.social.lottery/main');

      // 【去兑换礼物】跳转商城组件
      $('#btnChange').attr('href', 'cmp://com.nd.social.socialshop/goodsList');

    } else {
      $('.footbtn').on('click', function () {
        window.location = unInstallRedirect;
      })
    }
  }

  /* 更多弹窗*/
  activityM.modal = function () {
    $('.close').on('click', function () {
      $('.pop-layer').hide();
      $('.body-layer').removeClass('disable')
    })
    $('#btn-top').on('click', function () {
      $('.pop-layer').show();
      $('.body-layer').addClass('disable');
      var contentText = $('.brief-body').html();
      $('.pop-con h2').html('活动介绍');
      $('.pop-con .text-box').html(contentText);
    });

    $('.partice-more').on('click', function () {
      $('.pop-layer').show();
      $('.body-layer').addClass('disable');
      var contentText = $(this).parents('.info').find('p').text();
      var title = $(this).parents('.info').find('h4').text();
      $('.pop-con h2').html(title);
      $('.pop-con .text-box').html(contentText)
    })
  }

  /* 活动介绍切换*/
  activityM.tabChange = function () {
    $('#tabItem').on('click', 'a', function () {
      $(this).addClass('active').siblings().removeClass('active')
      $('.content-item').eq($(this).index()).addClass('active').siblings('.content-item').removeClass('active')
    })
  }

  window.activityM = activityM;

})(window);

$(function () {
  activityM.linkSelect();
  activityM.modal();
  activityM.tabChange();
  activityM.trackEvent()
});
