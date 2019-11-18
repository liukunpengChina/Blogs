import MVVM from './mvvm';

const app = new MVVM({
    el: '#root',
    data: {
        name: 'test'
    },
    methods: {
        changeName() {
            this.name = 'aaa';
        }
    }
});
