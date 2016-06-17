import './doctor_detail.less';

module.exports = ['$scope', '$compile', '$sce', '$state', '$stateParams', 'utils', 'doctorDetail', 'Paging', ($scope, $compile, $sce, $state, $stateParams, utils, doctorDetail, Paging) => {


    $scope.isFromShared = !!$stateParams.isShared ? true : false;
    $scope.doctorDetail = doctorDetail;
    $scope.questionList = [];
    $scope.question = '';
    $scope.isShowVideo = false;
    $scope.wordNum = $scope.question.length;
    $scope.videoSrc = doctorDetail.video;
    $scope.trustSrc = (url) => $sce.trustAsResourceUrl(url)

    const wordTotal = $scope.wordTotal = 50;

    $scope.checkNum = () => {

        //限制数量
        let limitQuestion = () => {

            $scope.question = $scope.question.slice(0, -($scope.wordNum - wordTotal));
            $scope.wordNum = wordTotal;

            $scope.showErrorTip = true;
        }

        $scope.wordNum = $scope.question.replace(/\s/g, '').length;

        $scope.wordNum > wordTotal ? limitQuestion() : $scope.showErrorTip = false;
    }

    //提交问题
    $scope.submitQuestion = (doctorId) => {

        let question = $scope.question.replace(/[\n\r]+/g, '\n');

        question === '' ? utils.tipInfo({ content: '提问内容不能为空' }) : submit();


        function submit() {

            var promise = utils.fetch({

                url: '/we.php?a=Question&m=question',
                data: {
                    content: question,
                    doctorId: doctorId
                }
            })

            promise.then(function(data) {

                let isPay = data.content.isPay;

                !!isPay ? goPay(data) : $state.go('myInfo');
            })
        }

        function goPay(data) {

            var promise = utils.wxPay({

                url: '/we.php?a=Pay&m=wxPay',
                data: {
                    questionId: data.content.questionId
                }
            })

            promise.then(function(data) {

                utils.tipInfo({content: '支付成功,正在跳转...', callback: function() {

                    $state.go('myInfo');
                }})
            })
        }
    }

    $scope.toQuestionDetail = (questionId) => {

        $state.go('questionDetail', { questionId: questionId });
    }

    // 播放视屏
    $scope.showVideo = () => {

        var videoWrapper = require('./video_wrapper.html');


        angular.element(document.querySelector('#doctor-detail')).append($compile(videoWrapper)($scope));
    }

    $scope.removeVideo = () => {

        angular.element(document.querySelector('.video-model')).remove();
    }



    //获取医生回答的列表 

    let getDoctorAnswerList = () => {

        $scope.questionList = new Paging({

            url: '/we.php?a=Doctor&m=questionList',
            data: {
                doctorId: $stateParams.doctorId,
                p:1
            }
        })

        $scope.questionList.nextPage();
    }

    getDoctorAnswerList()


}]
