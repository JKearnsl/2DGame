
export function sleep(milliseconds) {
    if (milliseconds > 2000)
        console.warn("Пожалуйста, не используйте sleep() на долгих интервалах времени, это может привести к зависанию браузера!");
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}