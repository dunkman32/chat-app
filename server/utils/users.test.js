const expect = require('expect');

const {Users} = require('./users');

describe('Users', function () {
    let users;

    beforeEach(function () {
       users = new Users();
       users.users = [{
           id: '1',
           name: 'Daniel',
           room: 'A'
       },{
           id: '2',
           name: 'Ann',
           room: 'B'
       },{
           id: '3',
           name: 'Tony',
           room: 'A'
       }];
    });

    it('should add new users', function () {
        let users = new Users();

        let user = {
            id: '123',
            name: 'Zura',
            room: 'A'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
        expect(users.users.length).toEqual(1);

    });

    it('should return element if id is correct', function () {
        let user = users.getUser('3');
        expect(user).toNotEqual(null);
    });

    it('should return element if id is not correct', function () {
        let user = users.getUser('123');
        expect(user).toEqual(null);
    });

    it('should remove current user', function () {
        let userId = '1';
        let user = users.removeUser(userId);

        expect(userId).toBe(user.id);
        expect(users.users.length).toBe(2);
    });

    it('should not remove current user', function () {
        let user = users.removeUser('123');

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should return names for room A', function () {
        let names = users.getUserList('A');
        expect(names).toEqual(['Daniel', 'Tony']);
    });
    it('should return names for room B', function () {
        let names = users.getUserList('B');
        expect(names).toEqual(['Ann']);
    });
});

