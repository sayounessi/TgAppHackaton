import { Telegraf } from "telegraf";
import { Markup } from "telegraf";

const bot = new Telegraf("8154538488:AAGUhgZFVYZOEZcTAPnyBQYrUPyOjt5Mv0g");
const userData = {};
const userStates = {};

 


bot.start((ctx) => {
    ctx.reply("Здравствуйте! Как к вам можно обращаться?");
});






bot.on("text", (ctx) => {
    const userID = ctx.from.id;

    // Проверка запрашивали ли мы у пользователя имя
    if (!userData[userID]) {
        userData[userID] = { name: ctx.message.text };
        ctx.reply(`${userData[userID].name}, Выберите роль:`, Markup.inlineKeyboard([
            Markup.button.callback("Программист", "Программист"),
            Markup.button.callback("Менеджер", "Менеджер"),
            Markup.button.callback("Дизайнер", "Дизайнер"),
            Markup.button.callback("Заказчик", "Заказчик"),
            Markup.button.callback("Админ", "Админ")
        ]));
    }
        
});

// Обработка нажатия кнопок

bot.action("Заказчик", (ctx) => {
    const userID = ctx.from.id;
    ctx.reply(`${userData[userID].name}, вы выбрали 'Заказчик'`);
   
});

bot.action("Дизайнер", (ctx) => {
    const userID = ctx.from.id;
    ctx.reply("Введите ваш часовой пояс(Например, UTC+3): ")

 
});

bot.action("Админ", (ctx) => {
    const userID = ctx.from.id;
    ctx.reply(`${userData[userID].name}, вы выбрали 'Админ'`);
});

bot.action("Менеджер", (ctx) => {
    const userID = ctx.from.id;
    ctx.reply("Введите ваш часовой пояс(Например, UTC+3): ")

});


bot.action("Программист", (ctx) => {
    const userID = ctx.from.id;
    ctx.reply("Введите ваш часовой пояс (Например, UTC+3):");
    userStates[userID] = { state: 'waiting_timezone' };


});

bot.on('message:text', (ctx) => {
    const userID = ctx.from.id;
    const text = ctx.message.text;

    if (userStates[userID] && userStates[userID].state === 'waiting_timezone') {
        // Пользователь находится в процессе ввода часового пояса
        const timezone = text; // Получаем введенный часовой пояс
        ctx.reply(`Ok, ваш часовой пояс '${timezone}' сохранен.`);

        // Очищаем состояние пользователя:
        delete userStates[userID];
    } else {
        // Обрабатываем обычные текстовые сообщения (не связанные с часовым поясом)
        ctx.reply("Привет! Нажмите кнопку 'Программист', чтобы указать ваш часовой пояс.");
    }
});



bot.launch()