import { List } from '@/schemas/list';

let nextId = 1;
export const newId = () => String(nextId++);

export const users: Array<{ email: string; password: string }> = [
    { email: 'abc@gmail.com', password: 'abc' },
    { email: 'def@gmail.com', password: 'def' },
];

export const lists: Array<List & { owner: string }> = [
    {
        id: newId(),
        title: 'Weekly Shopping',
        category: 'Shopping',
        icon: 'bag',
        items: [
            { id: newId(), type: 'check', text: 'Milk', isDone: false },
            { id: newId(), type: 'check', text: 'Egg', isDone: true },
        ],
        owner: 'abc@gmail.com',
    },
    {
        id: newId(),
        title: 'Carbonara',
        category: 'Recipes',
        icon: 'food',
        items: [
            { id: newId(), type: 'bullet', text: '2 tbs butter', isDone: null },
            { id: newId(), type: 'bullet', text: '500 g pasta', isDone: null },
            { id: newId(), type: 'bullet', text: '200 g bacon', isDone: null },
        ],
        owner: 'abc@gmail.com',
    },
    {
        id: newId(),
        title: 'Wishlist',
        category: 'Gifts',
        icon: 'gift',
        items: [
            { id: newId(), type: 'numbered', text: 'Pet', isDone: null },
            { id: newId(), type: 'numbered', text: 'Tv', isDone: null },
            { id: newId(), type: 'numbered', text: 'Candy', isDone: null },
            { id: newId(), type: 'numbered', text: 'Cash', isDone: null },
        ],
        owner: 'abc@gmail.com',
    },
    {
        id: newId(),
        title: 'Destinations',
        category: 'Travel',
        icon: 'airplane',
        items: [
            { id: newId(), type: 'none', text: 'Rome', isDone: null },
            { id: newId(), type: 'none', text: 'Barcelona', isDone: null },
            { id: newId(), type: 'none', text: 'Paris', isDone: null },
        ],
        owner: 'abc@gmail.com',
    },
];
