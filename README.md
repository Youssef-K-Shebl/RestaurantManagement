<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## 📌 Features

- **Modular architecture** for better scalability
- **MongoDB database integration** with Mongoose
- **Environment-based configuration** (`.env` support)
- **Global error handling & validation**
- **Swagger API Documentation**

---

## 📁 Project Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/) v18+**
- **[MongoDB](https://www.mongodb.com/try/download/community)**
- **Package manager:** `npm` or `yarn`

---

### Clone the Repository

```bash
git clone https://github.com/Youssef-K-Shebl/RestaurantManagement
cd RestaurantManagement
```

---

### Install Dependencies

```bash
$ npm install
```

## Compile and run the project

### Create a `.env` File

Inside the project root, create a `.env` file and define the following variables:

```env
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_database_name
NODE_ENV=development  # or production
```

---

### Running the Application

#### **For Development Mode** 🛠️

```bash
npm run start:dev
```

#### **For Production Mode** 🚀

```bash
npm run build
npm run start:prod
```

---

## 🛠 API Endpoints

### **🛒 Orders Resource**

| Method    | Endpoint              | Description            |
| --------- | --------------------- | ---------------------- |
| **GET**   | `/order`              | Get all orders         |
| **GET**   | `/order/daily-report` | Get daily sales report |
| **POST**  | `/order`              | Create a new order     |
| **GET**   | `/order/:id`          | Get order by ID        |
| **PATCH** | `/order/:id`          | Update an order        |

---

### **📦 Items Resource**

| Method   | Endpoint    | Description       |
| -------- | ----------- | ----------------- |
| **GET**  | `/item`     | Get all items     |
| **POST** | `/item`     | Create a new item |
| **GET**  | `/item/:id` | Get item by ID    |

---

## 📖 API Documentation

To explore all available API endpoints, use the built-in Swagger UI:

```
http://localhost:3000/api
```

---

## 🔹 Contributing

Feel free to submit issues and feature requests. Pull requests are welcome! 🚀

---

## 📝 License

This project is **open-source** and available under the [MIT License](LICENSE).
