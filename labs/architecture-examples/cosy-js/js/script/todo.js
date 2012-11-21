(function(module) {
    _bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

    function newTodo(text) {
        return {
            complete: false,
            text: text
        };
    }

    var Todo = (function () {
        function Todo (control, todoList) {
            control.local.store('todos', todoList);
            this.control = control;
            this.todoList = todoList;

            this.onListUpdate = _bind(this.onListUpdate, this);
            this.onInput = _bind(this.onInput, this);
            this.onSelectAll = _bind(this.onSelectAll, this);
            this.onClearAll = _bind(this.onClearAll, this);

            control.watch(todoList, this.onListUpdate);
            control.onEvent('input', 'keydown', this.onInput);
            control.onEvent('select-all', 'change', this.onSelectAll);
            control.onEvent('clear-completed', 'click', this.onClearAll);
        }

        Todo.prototype.onInput = function (event) {
            if (event.event.which !== 13) {
                return;
            }
            var value = event.element.val();
            var list = this.control.get(this.todoList);
            if (value) {
                list.push(newTodo(value));
                event.element.val('');
            }
        };

        Todo.prototype.onListUpdate = function (todoList) {
            if (todoList.length) {
                this.control.roles('todos').show();
            } else {
                this.control.roles('todos').hide();
            }
            var i, left = 0, complete = 0;
            for (i = 0; i < todoList.length; ++i) {
                item = this.control.get(todoList[i]);
                if (item.complete) {
                    complete += 1;
                } else {
                    left += 1;
                }
            }
            this.control.role('num-left').text(left);
            if (left === 1) {
                this.control.role('num-left-subject').text('item');
            } else {
                this.control.role('num-left-subject').text('items');
            }
            this.control.role('num-complete').text(complete);
        };

        Todo.prototype.onSelectAll = function (event) {
            var all = event.element.attr('checked'),
                list = this.control.get(this.todoList),
                i, item;
            for (i = 0; i < list.length; ++i) {
                item = this.control.get(list[i]);
                item.complete = all;
                this.control.set(list[i], item);
            }
        };

        Todo.prototype.onClearAll = function (event) {
            var list = this.control.get(this.todoList);
            list.remove(function (item) {
                return item.complete;
            });
        };

        return Todo;
    })();

    var TodoItem = (function () {

        function TodoItem (control, item, list) {
            this.control = control;
            this.item = item;
            this.list = list;

            this.onComplete = _bind(this.onComplete, this);
            this.onDestroy = _bind(this.onDestroy, this);
            this.onEdit = _bind(this.onEdit, this);
            this.onInput = _bind(this.onInput, this);

            control.onEvent('complete', 'change', this.onComplete);
            control.onEvent('destroy', 'click', this.onDestroy);
            control.onEvent('view', 'dblclick', this.onEdit);
            control.onEvent('edit', 'keydown', this.onInput);
        }

        TodoItem.prototype.onComplete = function (event) {
            item = this.control.get(this.item);
            item.complete = (event.element.attr('checked')?true:false);
            this.control.set(this.item, item);
        };

        TodoItem.prototype.onDestroy = function (event) {
            this.list.remove(this.item);
        };

        TodoItem.prototype.onEdit = function (event) {
            this.control.element.addClass('editing');
            this.control.role('edit').focus();
        };

        TodoItem.prototype.onInput = function (event) {
            if (event.event.which !== 13) {
                return;
            }
            var value = event.element.val();
            item = this.control.get(this.item);
            item.text = value;
            this.control.set(this.item, item);
        };

        return TodoItem;
    })();

    // Export
    module.exports = {
        Todo: Todo,
        TodoItem: TodoItem
    };

})(module);
