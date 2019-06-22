var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            if (data.allItems[type].length > 0)
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            else
                ID = 0;
            if (type === 'exp')
                newItem = new Expense(ID, des, val);
            else if (type === 'inc')
                newItem = new Income(ID, des, val);

            data.allItems[type].push(newItem);
            return newItem;
        },
        testing: function () {
            console.log(data);
        }
    };


})();





var UIController = (function () {
    var DStrings = {
        expenseType: '.add__type',
        expenseDescription: '.add__description',
        expenseValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    };
    return {
        getInput: function () {
            return {
                expType: document.querySelector(DStrings.expenseType).value,
                expDescription: document.querySelector(DStrings.expenseDescription).value,
                expValue: document.querySelector(DStrings.expenseValue).value
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;

            if (type === 'inc') {
                element = DStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div>' +
                    '<div class="right clearfix"><div class="item__value">%value%</div>' +
                    '<div class="item__delete"><button class="item__delete--btn">' +
                    '<i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            else if (type === 'exp') {
                element = DStrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div>' +
                    '<div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div>' +
                    '<div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '</div></div></div>';
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);

        },

        clearFields: function () {
            document.querySelector(DStrings.expenseDescription).value = "";
            document.querySelector(DStrings.expenseValue).value = "";

        },

        // clearFields: function () {
        //     var fields, fieldArr;
        //     fields = document.querySelectorAll(DStrings.expenseDescription + ', ' + DStrings.expenseValue);
        //     fieldArr = Array.prototype.slice.call(fields);

        //     fieldArr.forEach(function (current, index, array) {
        //         current.value = "";
        //     });
        // },

        getDStrings: function () {
            return DStrings;
        }
    };

})();





var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListners = function () {
        var DOM = UICtrl.getDStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13)
                ctrlAddItem();

        });

    };


    var ctrlAddItem = function () {

        var input = UICtrl.getInput();

        var newItems = budgetCtrl.addItem(input.expType, input.expDescription, input.expValue);
        UICtrl.addListItem(newItems, input.expType);

        UICtrl.clearFields();
    };

    return {
        init: function () {
            console.log('Application has Started');
            setupEventListners();
        }
    };


})(budgetController, UIController);

controller.init();