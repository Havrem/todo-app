// Tiny mock backend for development.
// Run with: npm run mock
//
// All data lives in memory. Restarting the server resets to seed data.
// When the real backend is ready, delete this file and update api/client.ts baseURL.

import cors from 'cors';
import express, { Request, Response } from 'express';
import type { Category } from '../schemas/category';
import type { List, ListItem } from '../schemas/list';

const app = express();
app.use(cors());
app.use(express.json());

// ---------- helpers ----------

let nextId = 1;
const newId = () => String(nextId++);

const tokenFor = (email: string) => `mock-token-${email}`;
const emailFromToken = (token: string | undefined): string | null =>
    token && token.startsWith('mock-token-') ? token.slice('mock-token-'.length) : null;

const getCurrentEmail = (req: Request): string | null => {
    const auth = req.headers.authorization;
    const token = auth ? auth.replace(/^Bearer\s+/i, '') : undefined;
    return emailFromToken(token);
};

const requireAuth = (req: Request, res: Response): string | null => {
    const email = getCurrentEmail(req);
    if (!email || !users.some((u) => u.email === email)) {
        res.status(401).end();
        return null;
    }
    return email;
};

const stripOwner = <T extends { owner: string }>({ owner, ...rest }: T): Omit<T, 'owner'> => rest;

// ---------- seed data ----------

type User = { email: string; password: string };
type StoredCategory = Category & { owner: string };
type StoredList = List & { owner: string };

const users: User[] = [
    { email: 'a', password: 'b' },
    { email: 'def@gmail.com', password: 'def' },
];

const shoppingId = newId();
const recipesId = newId();
const giftsId = newId();
const travelId = newId();

const categories: StoredCategory[] = [
    { id: shoppingId, name: 'Shopping', icon: 'shopping', owner: 'a' },
    { id: recipesId, name: 'Recipes', icon: 'food', owner: 'a' },
    { id: giftsId, name: 'Gifts', icon: 'gifts', owner: 'a' },
    { id: travelId, name: 'Travel', icon: 'travel', owner: 'a' },
];

const lists: StoredList[] = [
    {
        id: newId(),
        title: 'Weekly Shopping',
        categoryId: shoppingId,
        bookmarked: true,
        items: [
            { id: newId(), type: 'check', text: 'Milk', isDone: false },
            { id: newId(), type: 'check', text: 'Egg', isDone: true },
        ],
        owner: 'a',
    },
    {
        id: newId(),
        title: 'Carbonara',
        categoryId: recipesId,
        bookmarked: false,
        items: [
            { id: newId(), type: 'bullet', text: '2 tbs butter', isDone: null },
            { id: newId(), type: 'bullet', text: '500 g pasta', isDone: null },
            { id: newId(), type: 'bullet', text: '200 g bacon', isDone: null },
        ],
        owner: 'a',
    },
    {
        id: newId(),
        title: 'Wishlist',
        categoryId: giftsId,
        bookmarked: false,
        items: [
            { id: newId(), type: 'numbered', text: 'Pet', isDone: null },
            { id: newId(), type: 'numbered', text: 'Tv', isDone: null },
            { id: newId(), type: 'numbered', text: 'Candy', isDone: null },
            { id: newId(), type: 'numbered', text: 'Cash', isDone: null },
        ],
        owner: 'a',
    },
    {
        id: newId(),
        title: 'Destinations',
        categoryId: travelId,
        bookmarked: true,
        items: [
            { id: newId(), type: 'none', text: 'Rome', isDone: null },
            { id: newId(), type: 'none', text: 'Barcelona', isDone: null },
            { id: newId(), type: 'none', text: 'Paris', isDone: null },
        ],
        owner: 'a',
    },
];

// ---------- auth ----------

app.post('/auth/register', (req, res) => {
    const { email, password } = req.body as { email: string; password: string };
    if (users.some((u) => u.email === email)) {
        return res.status(409).end();
    }
    users.push({ email, password });
    res.status(201).json({ token: tokenFor(email) });
});

app.post('/auth/login', (req, res) => {
    const { email, password } = req.body as { email: string; password: string };
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return res.status(401).end();
    res.json({ token: tokenFor(user.email) });
});

// ---------- user ----------

app.get('/users/profile', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(404).end();
    res.json({ email: user.email });
});

app.patch('/users/password', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(404).end();

    const { currentPassword, newPassword } = req.body as {
        currentPassword: string;
        newPassword: string;
    };

    if (user.password !== currentPassword) {
        return res.status(403).end();
    }

    user.password = newPassword;
    res.status(204).end();
});

app.delete('/users/me', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;

    const userIdx = users.findIndex((u) => u.email === email);
    if (userIdx === -1) return res.status(404).end();

    // delete all the user's lists and categories too
    for (let i = lists.length - 1; i >= 0; i--) {
        if (lists[i].owner === email) lists.splice(i, 1);
    }
    for (let i = categories.length - 1; i >= 0; i--) {
        if (categories[i].owner === email) categories.splice(i, 1);
    }

    users.splice(userIdx, 1);
    res.status(204).end();
});

// ---------- categories ----------

app.get('/categories', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;
    const mine = categories.filter((c) => c.owner === email).map(stripOwner);
    res.json(mine);
});

app.post('/categories', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;
    const { name, icon } = req.body as { name: string; icon: string };
    const category: StoredCategory = {
        id: newId(),
        name,
        icon,
        owner: email,
    };
    categories.push(category);
    res.status(201).json(stripOwner(category));
});

app.patch('/categories/:id', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;
    const category = categories.find((c) => c.id === req.params.id && c.owner === email);
    if (!category) return res.status(404).end();
    const { name, icon } = req.body as Partial<{ name: string; icon: string }>;
    if (name !== undefined) category.name = name;
    if (icon !== undefined) category.icon = icon;
    res.json(stripOwner(category));
});

app.delete('/categories/:id', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;
    const idx = categories.findIndex((c) => c.id === req.params.id && c.owner === email);
    if (idx === -1) return res.status(404).end();

    // cascade: delete all lists in this category
    const categoryId = categories[idx].id;
    for (let i = lists.length - 1; i >= 0; i--) {
        if (lists[i].owner === email && lists[i].categoryId === categoryId) {
            lists.splice(i, 1);
        }
    }

    categories.splice(idx, 1);
    res.status(204).end();
});

// ---------- lists ----------

app.get('/lists', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;
    const summaries = lists
        .filter((l) => l.owner === email)
        .map(stripOwner);
    res.json(summaries);
});

app.get('/lists/:id', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;
    const list = lists.find((l) => l.id === req.params.id && l.owner === email);
    if (!list) return res.status(404).end();
    res.json(stripOwner(list));
});

app.post('/lists', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;
    const { title, categoryId } = req.body as {
        title: string;
        categoryId: string;
    };

    // category must exist and belong to the user
    const category = categories.find((c) => c.id === categoryId && c.owner === email);
    if (!category) return res.status(400).end();

    const list: StoredList = {
        id: newId(),
        title,
        categoryId,
        bookmarked: false,
        items: [],
        owner: email,
    };
    lists.push(list);
    res.status(201).json(stripOwner(list));
});

app.patch('/lists/:id', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;
    const list = lists.find((l) => l.id === req.params.id && l.owner === email);
    if (!list) return res.status(404).end();
    const { title, categoryId, bookmarked } = req.body as Partial<{
        title: string;
        categoryId: string;
        bookmarked: boolean;
    }>;

    if (categoryId !== undefined) {
        const category = categories.find((c) => c.id === categoryId && c.owner === email);
        if (!category) return res.status(400).end();
        list.categoryId = categoryId;
    }
    if (title !== undefined) list.title = title;
    if (bookmarked !== undefined) list.bookmarked = bookmarked;
    res.json(stripOwner(list));
});

app.delete('/lists/:id', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;
    const idx = lists.findIndex((l) => l.id === req.params.id && l.owner === email);
    if (idx === -1) return res.status(404).end();
    lists.splice(idx, 1);
    res.status(204).end();
});

// ---------- items ----------

app.post('/lists/:id/items', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;
    const list = lists.find((l) => l.id === req.params.id && l.owner === email);
    if (!list) return res.status(404).end();
    const { type, text } = req.body as Pick<ListItem, 'type' | 'text'>;
    const item: ListItem = {
        id: newId(),
        type,
        text,
        isDone: type === 'check' ? false : null,
    };
    list.items.push(item);
    res.status(201).json(item);
});

app.patch('/items/:id', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;
    const list = lists.find(
        (l) => l.owner === email && l.items.some((i) => i.id === req.params.id)
    );
    if (!list) return res.status(404).end();
    const item = list.items.find((i) => i.id === req.params.id)!;
    const { text, isDone } = req.body as Partial<{ text: string; isDone: boolean | null }>;
    if (text !== undefined) item.text = text;
    if (isDone !== undefined) item.isDone = isDone;
    res.json(item);
});

app.delete('/items/:id', (req, res) => {
    const email = requireAuth(req, res);
    if (!email) return;
    const list = lists.find(
        (l) => l.owner === email && l.items.some((i) => i.id === req.params.id)
    );
    if (!list) return res.status(404).end();
    const idx = list.items.findIndex((i) => i.id === req.params.id);
    list.items.splice(idx, 1);
    res.status(204).end();
});

// ---------- start ----------

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Mock server running on http://localhost:${PORT}`);
    console.log('Test users:');
    console.log('  abc@gmail.com / abc');
    console.log('  def@gmail.com / def');
});
