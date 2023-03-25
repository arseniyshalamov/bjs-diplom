"use strict";

//Выход из личного кабинета
const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(response => {
    if (response.success) {
        location.reload();
    }
});

//Получение информации о пользователе
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
})

//Получение текущих курсов валюты
const ratesBoard = new RatesBoard();

function getRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}
getRates();
setInterval(getRates, 60000);

//Операции с деньгами
const moneyManager = new MoneyManager();
//пополнение баланса
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Баланс пополнен успешно!');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}
//конвертирование валюты
moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Баланс пополнен успешно!');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}
//перевод валюты
moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Выполнен успешный репевод аплюты!');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    })
}

//Работа с избранным
const favoritesWidget = new FavoritesWidget();
//Запрос начального списока избранного
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})
//добавление пользователя в список избранных
favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            sWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь успешно добавлен в избранное!');
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}
//удаление пользователя из избранного
favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь успешно добавлен в избранное!');
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        }
    })
}