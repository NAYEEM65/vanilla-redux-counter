// select dom elements
const addCounter = document.getElementById('addCounter');
const resetCounter = document.getElementById('resetCounter');

//Action Identifiers
const INCREMENT = 'increment';
const DECREMENT = 'decrement';
const ADD_COUNTER = 'newCounter';
const RESET_COUNTER = 'resetCounter';

//Action Creators
const increment = (value, id) => {
    return {
        type: INCREMENT,
        payload: value,
        id: id,
    };
};
const decrement = (value, id) => {
    return {
        type: DECREMENT,
        payload: value,
        id: id,
    };
};
const addCounterButton = () => {
    return {
        type: ADD_COUNTER,
        payload: {
            id: store.getState().length + 1,
            value: store.getState().length + Math.floor(Math.random() * 5),
        },
    };
};
const reset = (value) => {
    return {
        type: RESET_COUNTER,
        payload: value,
    };
};
// initial State
const initialState = [
    {
        id: 1,
        value: 0,
    },
];
// create reduce function
function counterReducer(state = initialState, action) {
    if (action.type === INCREMENT) {
        state.map((item) => {
            if (item.id === action.id) {
                item.value = item.value + action.payload;
            }
        });
        return state;
    }
    if (action.type === DECREMENT) {
        state.map((item) => {
            if (item.id === action.id) {
                item.value = item.value - action.payload;
            }
        });
        return state;
    }
    if (action.type === ADD_COUNTER) {
        state.push(action.payload);
    }
    if (action.type === RESET_COUNTER) {
        state.map((item) => {
            item.value = 0;
        });
        return state;
    } else {
        return state;
    }
}
// create redux store
const store = Redux.createStore(counterReducer);

//Component container for Counter
const render = () => {
    const state = store.getState();
    counterArea.innerHTML = '';
    state.forEach((item) => {
        const div = document.createElement('div');
        //CREATE ELEMENT
        let sectionContainer = document.createElement('DIV');
        let sectionMain = document.createElement('DIV');
        let counterSection = document.createElement('DIV');
        let btnContainer = document.createElement('DIV');
        let incrementBtn = document.createElement('BUTTON');
        let decrementBtn = document.createElement('BUTTON');
        //button handlers
        incrementBtn.onclick = function () {
            increments(item.id);
        };
        decrementBtn.onclick = function () {
            decrements(item.id);
        };
        //ADD CLASSES
        sectionContainer.classList.add('mx-auto', 'max-w-md', 'mt-10', 'space-y-5');
        sectionMain.classList.add(
            'p-4',
            'h-auto',
            'flex',
            'flex-col',
            'items-center',
            'justify-center',
            'space-y-5',
            'bg-white',
            'rounded',
            'shadow',
        );
        counterSection.classList.add('text-2xl', 'font-semibold');
        btnContainer.classList.add('flex', 'space-x-3');
        incrementBtn.classList.add(
            'bg-indigo-400',
            'text-white',
            'px-3',
            'py-2',
            'rounded',
            'shadow',
        );
        decrementBtn.classList.add('bg-red-400', 'text-white', 'px-3', 'py-2', 'rounded', 'shadow');
        //insert Text
        counterSection.innerText = item.value;
        incrementBtn.innerText = 'increment by ' + item.id;
        decrementBtn.innerText = 'decrement by ' + item.id;
        //append elements
        counterArea.appendChild(sectionContainer);
        sectionContainer.appendChild(sectionMain);
        sectionMain.appendChild(counterSection);
        sectionMain.appendChild(btnContainer);
        btnContainer.appendChild(incrementBtn);
        btnContainer.appendChild(decrementBtn);
        counterArea.appendChild(div);
    });
};
render();
store.subscribe(render);

// button click listeners
const increments = (id) => {
    store.dispatch(increment(id, id));
};
const decrements = (id) => {
    store.dispatch(decrement(id, id));
};

addCounter.addEventListener('click', () => {
    store.dispatch(addCounterButton());
});
resetCounter.addEventListener('click', () => {
    store.dispatch(reset(0));
});
