// Using native fetch
// Actually, node 18+ has native fetch. I'll use that.

async function verify() {
    const baseUrl = 'http://localhost:3000/api/expenses';

    console.log('1. Creating an expense...');
    const newExpense = {
        description: 'Test Expense',
        amount: 123.45,
        category: 'Test'
    };

    try {
        const createRes = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newExpense)
        });

        if (!createRes.ok) throw new Error(`Create failed: ${createRes.statusText}`);
        const created = await createRes.json();
        console.log('Created:', created);

        console.log('2. Fetching expenses...');
        const listRes = await fetch(baseUrl);
        if (!listRes.ok) throw new Error(`List failed: ${listRes.statusText}`);
        const list = await listRes.json();
        console.log('Fetched list:', list);

        const found = list.find(e => e.id === created.id);
        if (found) {
            console.log('SUCCESS: Created expense found in list.');
        } else {
            console.error('FAILURE: Created expense NOT found in list.');
        }

    } catch (err) {
        console.error('Verification failed:', err);
    }
}

verify();
