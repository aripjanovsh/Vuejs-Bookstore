import {isEmpty} from "../utils/helpers";


export default class BookStoreServices {
    ID_LAST = 4;

    booksData = [
        {
            id: 1,
            title: 'Vue.js in Action',
            author: 'Benjamin Listwon, Erik Hanchett',
            price: 45,
            inStock: 5
        },
        {
            id: 2,
            title: 'Vue.js 2 Cookbook',
            author: 'Andrea Passaglia',
            price: 20,
            inStock: 5
        },
        {
            id: 3,
            title: 'Vue.js: Up and Running: Building Accessible and Performant Web Apps',
            author: 'Callum Macrae',
            price: 22,
            inStock: 5
        },
        {
            id: 4,
            title: 'Learning Vue.js 2',
            author: 'Olga Filipova',
            price: 35,
            inStock: 5
        },
    ];

    userData = [
        {
            id: 1,
            login: 'Admin',
            password: 'Admin',
            isAdmin: true
        },
        {
            id: 1,
            login: 'User',
            password: 'User',
            isAdmin: false
        },
    ]

    getBooks() {
        //imitation real server request
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.8) { //set error 20%
                    reject(new Error('Something bad happened'));
                } else {
                    resolve(this.booksData);
                }
            }, 700);
        });
    }

    storeBook(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const errors = this._validateBook(data);
                if (isEmpty(errors)) {
                    data.id = ++this.ID_LAST;
                    resolve(data);
                } else {
                    reject(errors);
                }
            }, 1000);
        });
    }

    login(data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const result = this._validateUser(data);

                if (result.success) {
                    resolve(result);
                } else {
                    reject(result);
                }


            }, 700);
        });
    }

    logout() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 700);
        });
    }

    _validateBook(data) {
        let errors = {};
        if (isEmpty(data.title)) {
            errors.title = 'Title field is required';
        }
        if (isEmpty(data.author)) {
            errors.author = 'Author field is required';
        }
        if (isEmpty(data.price)) {
            errors.price = 'Price field is required';
        }
        if (isEmpty(data.inStock)) {
            errors.inStock = 'In Stock field is required';
        }

        return errors;
    }


    _validateUser(data) {
        const {login = '', password = ''} = data;
        let errors = {};
        if (isEmpty(login)) {
            errors.login = 'Login field is required'
        }
        if (isEmpty(password)) {
            errors.password = 'Password field is required'
        }

        if (password.length && login.length) {
            const user = this.userData.find((user) => user.login.toLowerCase() === data.login.toLowerCase());

            if (user) {
                if (user.password.toLowerCase() === data.password.toLowerCase()) {
                    return {
                        success: true,
                        data: user
                    }
                } else {
                    errors.password = 'Login or password incorrect'
                }
            } else {
                errors.password = 'User does not exist'
            }
        }

        return {
            success: false,
            data: errors
        }
    }
}