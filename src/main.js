 import angular from 'angular';
 import 'angular-ui-router';
 import 'angular-touch';

 //公共的样式
 import './less/public.less';
 import './less/component.less';
 import './less/common.less';
  
 //加载滚动条指令
 require('./js/libs/ng-infinite-scroll.min');

 var app = angular.module('app', ['ui.router', 'infinite-scroll', 'ngTouch']);

 //加载组件指令
 require('./js/directive/component')(app);

 //加载工具
 require('./js/service/utils')(app);

 // 应用配置
 app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

     //路由配置
     require('./js/router')($stateProvider, $urlRouterProvider);
 }])

 // 应用初始化
 app.run(['$rootScope', 'utils', function($rootScope, utils) {

     $rootScope.$on('$stateChangeStart', function() {

        var origin = location.origin;
        
        utils.wxShare({
             title: '向您推荐【嘟嘟微诊】，便宜又高效的问诊平台',
             content: '来【嘟嘟微诊】，免费收听医生们答过的问题',
             link: `${origin}/we.php`,
             imgUrl: 'http://wxapitest.ziseyiliao.com/wz/build/imgs/dudu_logo.png'
         })
     })

     $rootScope.$on('$stateChangeSuccess', function() {

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
     })

 }])








