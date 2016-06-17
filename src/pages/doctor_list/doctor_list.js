import './doctor_list.less';

module.exports = ['$scope', '$state', 'utils', 'Paging', ($scope, $state, utils, Paging)=>{

    $scope.doctorList = new Paging({

        url:  '/we.php?a=Doctor&m=doctorList',
        data: {
            p: 1
        }
    })
   
    $scope.toDoctorDetail = (doctorId) => {
    	
        $state.go('doctorDetail', {doctorId: doctorId});
    }

    $scope.toSearch = () => {

        $state.go('searchDoctor');
    }

}]