(function(module, localStorage, JSON) {
    _bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

    function store(name, ref) {
        control = this;
        value = localStorage.getItem(name);
        if (value) {
            list = JSON.parse(value);
            if (list && list.length) {
                control.set(ref, list);
            }
        }
        control.watch(ref, function (list) {
            var i,
                items = [];
            if (!list) {
                return;
            }
            for (i = 0; i < list.length; i++) {
                items.push(control.get(list[i]));
            }
            localStorage.setItem(name, JSON.stringify(items));
        });
    }

    // Export
    module.exports = {
        store: store
    };

})(module, window.localStorage, JSON);
