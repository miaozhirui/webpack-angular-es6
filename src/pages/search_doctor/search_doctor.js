import './search_doctor.less';

module.exports = ['$scope', '$state', 'utils', 'Paging', ($scope, $state, utils, Paging) => {

	$scope.keywords = '';
    $scope.isShowTextDesc = false;
    $scope.searchList = {};

    $scope.toDoctorList = () => {

        $state.go('doctorList');
    }

    $scope.toDoctorPage = (doctorId) => {

        $state.go('doctorDetail', {doctorId: doctorId})
    }

    $scope.showTextDesc = (isShow) => {

        if(typeof isShow === 'undefined') return;
        
        var desc =  isShow ? "正在加载数据..." : "没有更多数据了";
        return desc;
    }

    $scope.searchDoctor = () => {

    	var keywords = $scope.keywords.replace(/\s/, '');

    	keywords === '' ? utils.tipInfo({content: '请填写搜索内容'}) : search();

    	function search() {

            $scope.searchList = new Paging({

                url: '/we.php?a=Doctor&m=doctorList',
                data: {
                    p:1,
                    key:keywords
                }
            })

            $scope.searchList.nextPage();

    	}
    }

    // 自动获得焦点
    document.querySelector('#keyword').focus();
}]