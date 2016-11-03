angular.module('qls')
    .controller('homeController', ['$scope', '$http', function ($scope, $http) {
        $http.get('data/events.json').success(function (res) {
            $scope.events = res;
        }).error(function () {
            console.log('Failed to load events.json');
        });
        $http.get('data/online_events.json').success(function (res) {
            $scope.onlineEvents = res;
        }).error(function () {
            console.log('Failed to load online_events.json');
        });
        $http.get('data/courses.json').success(function (res) {
            $scope.courses = res;
        }).error(function () {
            console.log('Failed to load courses.json');
        });
        $http.get('data/testimonials/testimonials.json').success(function (res) {
            $scope.testimonials = res;
        }).error(function () {
            console.log('Failed to load courses.json');
        });
        $http.get('data/clients/clients.json')
            .success(function (res) {
                $scope.clients = res;
            })
            .error(function () {
                console.log('Failed to load clients.json');
            });
        $scope.coursesList = [
            "Select a course",
            "ITIL Foundation",
            "ITIL Service Strategy",
            "ITIL Service Design",
            "ITIL Service Transition",
            "ITIL Service Operation",
            "ITIL Continual Service Improvement",
            "ITIL Service, Offering and Agreement (SOA)",
            "ITIL Planning, Protection and Optimization (PPO)",
            "ITIL Release, Control and Validation (RCV)",
            "ITIL Operational, Support and Analysis (OSA)",
            "ITIL®  Managing Across The Lifecycle",
            "CAPM",
            "PMP",
            "ACP",
            "Prince2 Foundation",
            "Prince2 Practitioner",
            "Prince2 Agile",
            "Scrum Master",
            "Managing Successful Programs",
            "Six Sigma Yellow Belt",
            "Six Sigma Green Belt",
            "Six Sigma Black Belt",
            "COBIT 5 Foundation",
            "TOGAF 9.1 Level  1 & Level 2"
        ]
        $scope.siteContact = {
            fullname: '',
            email: '',
            courseInterested: '',
            message: ''
        }
        $scope.siteContactSubmit = "Submit";
        $scope.contactSubmit = function () {
            $http.post('endpoints/send-mail.php', $scope.siteContact).success(function (res) {
                if(res == 'ok'){
                    $scope.siteContactSubmit = 'Message sent sucessfully';
                }
            }).error(function (err) {
                console.error(err)
            })
        }
    }]);