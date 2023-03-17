<div align="center">
	<img src="./logo.png" alt="logo" width="168" height="168"/>
	<h1>nameSpace</h1>
	<p>Открытая облачная платформа</p>
</div>

[![Netlify Status](https://api.netlify.com/api/v1/badges/88c25c65-c79d-47af-9151-4b726aceb4a7/deploy-status)](https://app.netlify.com/sites/namespace-client/deploys)

## О проекте

nameSpace - открытая облачная платформа для локальной сети. Она позволяет запустить свой сервер
и передавать файлы между устройствами, подключёнными к одной сети.

## Установка

**Важно!** Для корректной работы сервиса, необходимо установить, настроить и запустить
[сервер](https://github.com/shelepuginivan/namespace-server)

Склонируйте репозиторий

```shell
git clone https://github.com/shelepuginivan/namespace-client.git
cd namespace-client
npm ci
```

Запустить проект локально (dev-сервер)

```shell
npm run dev
```

Собрать проект

```shell
npm run build
```

Собранный проект появится в директории `./dist`.

Клиент можно поставить на хостинг (Netlify, Vercel и др.)

**Обратите внимание**, что для корректной работы облачного клиента необходим протокол `http`, `https` требует настройки
SSL-сертификата на стороне сервера. Это правило не относится к локальному хосту (`localhost` или `127.0.0.1`).
