import './my_info.less';

module.exports = ['$scope', '$state', 'questionList', ($scope, $state, questionList) => {

	$scope.questionList = questionList;

	$scope.toQuestionDetail = (questionId) => {
		
		$state.go('questionDetail', {questionId: questionId});
	}

	$scope.startAsk = () => {

		$state.go('doctorList');
	}

}]