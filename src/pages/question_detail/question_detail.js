import './question_detail.less';

module.exports = ['$scope', '$state', '$stateParams', 'utils', 'questionDetail', ($scope, $state, $stateParams, utils, questionDetail) => {

    $scope.isFromShared = !!$stateParams.isShared ? true : false;
    $scope.questionDetail = questionDetail;
    $scope.question = [questionDetail];
    $scope.isAllowPlay = true;

    $scope.toDoctorList = (doctorId) => {

        $state.go('doctorDetail', { doctorId: doctorId });
    }

    $scope.playVideo = (questionId) => {

        var audio = document.getElementById('audioContent');
        var isload = angular.element(audio).attr('isload');
        $scope.isTwinke = true;

        if (isload) return;


        var promise = utils.fetch({

            url: '/we.php?a=Question&m=listenQuestion',
            data: {
                questionId: questionId
            }
        })

        promise.then(function(data) {

            audio.src = data.content.voices;

        }).then(function() {

            audio.addEventListener('ended', function() {

                $scope.$apply(function() {

                    $scope.isAllowPlay = true;
                    $scope.isTwinke = false;
                })

            })

        }).then(function() {

            angular.element(audio).attr('isload', true);

        })
    }


}]
