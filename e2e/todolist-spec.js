describe('L3 MIAGE todo list', () => {
    it('should add a todo', function() {
        browser.get('http://localhost:8080/');

        // element( by.model('todoList.todoText') ).sendKeys('write first protractor test');
        element(by.css('form input.new-todo')).click();
        // element(by.css('form input.new-todo')).val( "hello" ).trigger


        var todoList = element.all(by.css('ul.todo-list item-chose'));


        expect(todoList.count()).toEqual(3);
    });
});
