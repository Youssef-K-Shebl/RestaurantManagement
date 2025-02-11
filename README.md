````markdown
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 📌 Project Overview

This project is a **Restaurant Management API** built using **NestJS** with MongoDB and Redis. It provides features like **order management**, **daily sales reporting**, and **caching** for performance optimization.

---

## 📌 Features

- **Modular architecture** for better scalability
- **MongoDB database integration** with Mongoose
- **Environment-based configuration** (`.env` support)
- **Global error handling & validation**
- **Swagger API Documentation**
- **Rdis caching for performance optimization**

## 📁 Project Setup

### **Prerequisites**

Ensure you have the following installed:

- **[Node.js](https://nodejs.org/) v18+**
- **[MongoDB](https://www.mongodb.com/try/download/community)**
- **[Docker](https://www.docker.com/get-started)** (for containerized setup)
- **[Redis](https://redis.io/docs/getting-started/)** (for caching the daily report)

---

## 🚀 **Setup with Docker**

To run the application using **Docker**, follow these steps:

1️⃣ **Clone the Repository**

```bash
git clone https://github.com/Youssef-K-Shebl/RestaurantManagement
cd RestaurantManagement
```
````

2️⃣ **Build the Docker Image**

```bash
docker build -t nestjs-app .
```

3️⃣ **Run the Docker Container with `.env`**

```bash
docker run -p 3000:3000 --env-file .env --name nestjs-container nestjs-app
```

4️⃣ **Check Running Containers**

```bash
docker ps
```

Make sure the `nestjs-container` is running.

5️⃣ **To Stop the Container**

```bash
docker stop nestjs-container
```

6️⃣ **To Remove the Container**

```bash
docker rm nestjs-container
```

7️⃣ **To Restart the Container**

```bash
docker start nestjs-container
```

---

## 🔧 **Manual Setup Without Docker**

### **Clone the Repository**

```bash
git clone https://github.com/Youssef-K-Shebl/RestaurantManagement
cd RestaurantManagement
```

### **Install Dependencies**

```bash
npm install
```

### **Create a `.env` File**

Inside the project root, create a `.env` file and define the following variables:

```env
DATABASE_USERNAME=your_db_username
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_database_name
NODE_ENV=development
REDIS_HOST=localhost
REDIS_PORT=6379
```

**Note:** Ensure `REDIS_HOST` and `REDIS_PORT` are set correctly to connect to Redis.

### **Start Redis Server**

Ensure Redis is **installed and running** before starting the app:

```bash
redis-server
```

To verify Redis is running, use:

```bash
redis-cli PING
```

Expected response:

```bash
PONG
```

### **Running the Application**

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

| Method    | Endpoint              | Description                                |
| --------- | --------------------- | ------------------------------------------ |
| **GET**   | `/order`              | Get all orders                             |
| **GET**   | `/order/daily-report` | Get daily sales report (cached with Redis) |
| **POST**  | `/order`              | Create a new order                         |
| **GET**   | `/order/:id`          | Get order by ID                            |
| **PATCH** | `/order/:id`          | Update an order                            |

---

### **📦 Items Resource**

| Method   | Endpoint    | Description       |
| -------- | ----------- | ----------------- |
| **GET**  | `/item`     | Get all items     |
| **POST** | `/item`     | Create a new item |
| **GET**  | `/item/:id` | Get item by ID    |

---

## 📖 API Documentation

To explore all available API endpoints, use the built-in **Swagger UI**:

```
http://localhost:3000/api
```

---

## 🔹 Redis Caching for Daily Sales Report

The **daily sales report** is cached in Redis to improve performance. Once generated, it is stored in Redis until **mid night**, reducing database load.

### **Check Cached Data in Redis**

To verify if the report is cached, use Redis CLI:

```bash
redis-cli GET "daily-sales-report"
```

To check expiration time:

```bash
redis-cli TTL "daily-sales-report"
```

---

## 🔹 Contributing

Feel free to submit issues and feature requests. Pull requests are welcome! 🚀

---

## 📝 License

This project is **open-source** and available under the [MIT License](LICENSE).

```

```
