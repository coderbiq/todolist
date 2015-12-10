(function(angular, undefined) {'use strict';

angular
    .module('todoList', [])
    .value('tasks', [])
    .controller('createCtrl', CreateCtrl)
    .controller('listCtrl', ListCtrl)
    .service('taskManager', TaskManager)
;

function CreateCtrl($scope, taskManager) {
    $scope.colorOptions = taskManager.colorOptions();
    $scope.newTask = {
        color: 'info',
        content: ''
    };
    $scope.create = create;

    function create() {
        var task = angular.copy($scope.newTask);
        task.isColse = false;
        taskManager.add(task);
        $scope.newTask.content = '';
    }
}

function ListCtrl($scope, taskManager) {
    $scope.tasks = taskManager.tasks;
}

function TaskManager($window, tasks) {
    var taskManager = {
        colorOptions: getAllColorOptions,
        add         : addTask,
        tasks       : []
    };

    getAll();
    return taskManager;

    function getAllColorOptions() {
        return [
            {name:'信息', code: 'info'},
            {name:'危险', code: 'danger'}
        ];
    }

    function getAll() {
        taskManager.tasks = [];
        if(!angular.isUndefined($window.localStorage['tasks'])) {
            taskManager.tasks = angular.fromJson($window.localStorage['tasks']);
        }
        return taskManager.tasks;
    }

    function addTask(taskData) {
        if(angular.isUndefined(taskData.content)) {
            throw '任务内容不能为空';
        }
        if(taskData.color != 'info' && taskData.color != 'danger') {
            throw '任务颜色错误';
        }
        var tasks = getAll();
        tasks.push(taskData);
        $window.localStorage['tasks'] = angular.toJson(tasks);
    }
}
})(window.angular);
