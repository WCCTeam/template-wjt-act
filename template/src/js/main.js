(function (window) {
  'use strict';
  var activity = {};
  // <%= projectCodeName['name'] %>生产环境 sdpAppId
  var sdpAppId = "<%= projectCodeName['sdpAppId'] %>";

  var headerUrl = "https://config-cfgcenter.sdp.101.com/v2.0/configs/config_type/site/format_code/website_header_footer/config_code/" + sdpAppId + "%7C%7C%7C%7C/actions/merge";
  var weiboUrl = "http://weibo.social.web.sdp.101.com";
  var loginUrl = "<%= projectCodeName['loginUrl'] %>";
  var windowHref = window.location.href;
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
  /* 获取头底部*/
  activity.getHeaderHtml = function () {
    $.ajax({
      url: headerUrl,
      type: "GET",
      success: function (res) {
        $("#header").html(res.properties.website_header);
        $("#footer").html(res.properties.website_footer);
      },
      error: function (res) {}
    });
  }
  /*返回顶部按钮*/
  activity.goTop = function () {
    $(window).scroll(function () {
      if ($(window).scrollTop() > 600) {
        $(".sidebar").addClass('on');
      } else {
        $(".sidebar").removeClass('on');
      }
    });
    $(".totop").click(function () {
      $('body,html').animate({
          scrollTop: 0
        },
        700);
      return false;
    });
  };
  /* 链接跳转登录状态判断*/
  activity.linkSelect = function () {
    SDP.UC.createByDomainName({
      env: "product"
    }).then(function (uc) {
      uc.isLogin().then(
        function (isLogin) {
          if (isLogin === true) {
            var $document = $(document);
            $document.on('click', '#btnRead', function () {
              var $this = $(this);
              $this.attr('href', 'http://fj.101.com/wjt/fj/social');
            });
          } else {
            $('#btnRead').attr('href', loginUrl + encodeURIComponent(curUrl));
            CloudAtlas.onProfileSignOff();
          }
        },
        function (err) {
          console.log('UC错误', err)
        }
      );
    });
  }

  /* 活动介绍切换*/
  activity.tabChange = function () {
    $('#tabItem').on('click', 'a', function () {
      $(this).addClass('active').siblings().removeClass('active')
      $('.content-item').eq($(this).index()).addClass('active').siblings('.content-item').removeClass('active')
    })
  }

  /*百度统计埋点*/
  activity.trackEvent = function () {
    $('.participate-btn').on('click', function () {
      var text = $(this).attr('title');
      _hmt.push(['_trackEvent', '献礼抗疫教师活动页-PC', '点击“去分享心得”', text]);
    });
  }

  window.activity = activity;

})(window);

$(function () {
  activity.getHeaderHtml();
  activity.goTop();
  activity.tabChange();
  activity.trackEvent();
});
