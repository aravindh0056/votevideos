/* Controllers */

function VideoListCtrl($scope, $http) {
  $scope.videos = [];
  var map = {};
  $http.get('/list').success(function(data) {
      var videos;
      if(data && data.videos) {
        videos = data.videos.sort(compare);
        //when filter is used, the index of each element is lost. So we use a map here.
        for(var i=0;i<videos.length;i++) {
          map[videos[i].title] = i;
        }
      }
      
      $scope.videos = videos;
    });

  function compare(a,b) {
    if (a.votes.total < b.votes.total)
       return 1;
    if (a.votes.total > b.votes.total)
      return -1;
    return 0;
  }

  $scope.upVote = function (key) {
    if(!$scope.videos[map[key]].liked &&
          !$scope.videos[map[key]].unLiked) {
        $scope.videos[map[key]].liked = true;
    } else if($scope.videos[map[key]].unLiked){      
        $scope.videos[map[key]].liked = true;
        $scope.videos[map[key]].unLiked = false;
    } else if($scope.videos[map[key]].liked) {
        $scope.videos[map[key]].liked = false;
    }
  }

  $scope.downVote = function (key) {
    if(!$scope.videos[map[key]].liked &&
          !$scope.videos[map[key]].unLiked) {
        $scope.videos[map[key]].unLiked = true;
    } else if($scope.videos[map[key]].liked){      
        $scope.videos[map[key]].liked = false;
        $scope.videos[map[key]].unLiked = true;
    } else if($scope.videos[map[key]].unLiked) {
        $scope.videos[map[key]].unLiked = false;
    }
  }
}

