export async function validatePromo(body) {
    const response = await fetch('/promocode', {
        method: 'POST',
        body: JSON.stringify(body)
    });
    return await response.json();
}

export async function checkout(body) {
    const response = await fetch('/checkout', {
        method: 'POST',
        body: JSON.stringify(body)
    });
    return await response.json();
}