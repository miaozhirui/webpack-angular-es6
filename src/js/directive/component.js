module.exports = (duduApp) => {

    //医生标签
    duduApp.directive('doctorTag', function() {

        return {
            restrict: 'E',
            replace: true,
            template: `<div class="component-doctor-tag"><ul class="{{class}}">
                        <li ng-repeat="doctor in doctorTag track by $index">{{doctor.specialtyName}}</li>
                        </ul></div>`,
            scope: {
                doctorTag: "="
            }
        }
    })

    //医生列表页面
    duduApp.directive('doctorList', function() {

        return {
            restrict: 'E',
            replace: true,
            template: require('./tpl/doctor_list.html'),
            scope: {
                doctorList: '=',
                toDoctorDetail: '&'
            },
            link: function(scope, ele, attr) {

                scope.handleLiClick = doctorId => {
                    scope.toDoctorDetail({ doctorId: doctorId })
                }

            }
        }
    })

    //问题列表页面
    duduApp.directive('questionList', ['$sce', 'utils', function($sce, utils) {

        return {
            restrict: 'E',
            replace: true,
            template: require('./tpl/question_list.html'),
            scope: {
                toQuestionDetail: "&",
                playVideo: "&",
                listData: '=',
                isTwinke: '=',
                isAllowPlay: '='
            },

            link: function(scope, ele, attr) {

                scope.handleLiClick = (questionId, status, e) => {
                    //如果status不等2的时候，不能到问题详情页面
                    if (status != 2) return;
                    scope.toQuestionDetail({ questionId: questionId });
                }

                scope.handlePlayVideo = (questionId) => {

                    scope.playVideo({ questionId: questionId })
                }


                var audio = document.getElementById('audioContent');

                audio && autoPlay();

                function autoPlay() {
                    // 解决部分ios audio不能自动播放的问题
                    window.addEventListener('touchstart', safariPlayAudio, false);

                    function safariPlayAudio(e) {

                        // 防止重复播放，和点击页面中其他元素而引起的播放
                        if (!scope.isAllowPlay || e.target.className !== 'doctor-reply') return;

                        audio.load();
                        audio.play();
                        scope.isAllowPlay = false;
                    }
                }

            }
        }
    }])

    //推荐给好友
    duduApp.directive('share', function() {

        return {
            restrict: 'E',
            replace: true,
            template: require('./tpl/share.html'),
            scope: true,
            link: function(scope, ele, attr) {

                scope.isShowGuide = false;

                scope.showGuide = () => {

                    scope.isShowGuide = true;
                }

                scope.hideGuide = () => {

                    scope.isShowGuide = false;
                }

            }

        }
    })

    //长按二维码关注
    duduApp.directive('qrCode', function() {

        return {
            restrict: 'E',
            replace: true,
            template: require('./tpl/qr_code.html')
        }
    })

    // 底部导航
    duduApp.directive('navBar', function() {

        return {
            restrict: 'E',
            replace: true,
            template: require('./tpl/nav_bar.html'),
            scope: true,
            link: function(scope, ele, attr) {

                scope.active = attr['active'];

            }
        }
    })




}
