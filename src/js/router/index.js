module.exports = function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/doctorList')
    $stateProvider

    //医生列表页
        .state('doctorList', {

        url: '/doctorList',
        template: require('../../pages/doctor_list/doctor_list.html'),
        controller: require('../../pages/doctor_list/doctor_list')
    })

    //医生详情页面
    .state('doctorDetail', {

        url: '/doctorDetail?doctorId&isShared',
        template: require('../../pages/doctor_detail/doctor_detail.html'),
        controller: require('../../pages/doctor_detail/doctor_detail'),
        resolve: {
            doctorDetail: ['$q', '$stateParams', 'utils', function($q, $stateParams, utils) {

                var defer = $q.defer();

                var promise = utils.fetch({

                    url: '/we.php?a=Doctor&m=doctorInfo',
                    data: {
                        doctorId: $stateParams.doctorId
                    }
                })

                promise.then(function(data) {

                    var origin = location.origin + '/we.php?source=doctor&';
                    var link = `${origin}doctorId=${data.content.doctorId}&isShared=true`;

                    defer.resolve(data.content);

                    utils.wxShare({

                        title: `向您推荐${data.content.doctorName}医生，来自${data.content.hospitalName}${data.content.departmentName}`,
                        content: '来【嘟嘟微诊】，免费收听Ta答过的问题',
                        link: link,
                        imgUrl: 'http://wxapitest.ziseyiliao.com/wz/build/imgs/dudu_logo.png'
                    })

                })

                return defer.promise;
            }]
        }

    })

    //搜索医生
    .state('searchDoctor', {

        url: '/searchDoctor',
        template: require('../../pages/search_doctor/search_doctor.html'),
        controller: require('../../pages/search_doctor/search_doctor')
    })

    //我的(问题列表)
    .state('myInfo', {

        url: '/myInfo',
        template: require('../../pages/my_info/my_info.html'),
        controller: require('../../pages/my_info/my_info'),
        resolve: {
            questionList: ['$q', 'utils', function($q, utils) {
                var defer = $q.defer();

                var promise = utils.fetch({

                    url: '/we.php?a=User&m=questionList',
                })

                promise.then(function(data) {

                    defer.resolve(data.content);
                })

                return defer.promise;
            }]
        }
    })

    //问题详情
    .state('questionDetail', {

        url: '/questionDetail?questionId&isShared',
        template: require('../../pages/question_detail/question_detail.html'),
        controller: require('../../pages/question_detail/question_detail'),
        resolve: {
            questionDetail: ['$q', '$stateParams', 'utils', function($q, $stateParams, utils) {

                var defer = $q.defer();

                var promise = utils.fetch({

                    url: '/we.php?a=Question&m=questionInfo',
                    data: {
                        questionId: $stateParams.questionId
                    }
                })

                promise.then(function(data) {

                    var origin = location.origin + '/we.php?source=question&';
                    var link = `${origin}questionId=${data.content.questionId}&isShared=true`

                    defer.resolve(data.content);

                    utils.wxShare({

                        title: `${data.content.doctorName}医生回答了：${data.content.describe}`,
                        content: '来【嘟嘟微诊】，免费收听医生们答过的问题',
                        link: link,
                        imgUrl: 'http://wxapitest.ziseyiliao.com/wz/build/imgs/dudu_logo.png'
                    })
                })

                return defer.promise;
            }]
        }
    })
}
