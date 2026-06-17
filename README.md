# 設計靈感收藏系統 Inspiration Collection System

[![Claude Code](https://img.shields.io/badge/Claude%20Code-AI%20Development-6c5ce7?style=for-the-badge&logo=anthropic&logoColor=white)](https://claude.ai) [![Vue.js](https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/) [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/) [![Django](https://img.shields.io/badge/Django-092e20?style=for-the-badge&logo=django&logoColor=white)](https://www.djangoproject.com/) [![Django REST Framework](https://img.shields.io/badge/Django%20REST%20Framework-ff1709?style=for-the-badge&logo=django&logoColor=white)](https://www.django-rest-framework.org/) [![SimpleJWT](https://img.shields.io/badge/JWT-SimpleJWT-F7DF1E?style=for-the-badge&logo=jsonwebtokens&logoColor=black)](https://django-rest-framework-simplejwt.readthedocs.io/)

本專案目標是模擬實務開發流程，並結合 AI 開發工具（Claude Code）來提升開發效率。

## 專案簡介

本專案是一個運用Claude Code製作的前後端分離架構， **設計靈感收藏系統（Inspiration Collection System）**，讓使用者可以收藏各類型的設計靈感作品，並進行分類與管理，可支援擴展多使用者資料管理模式。

## 專案特色

- 前後端分離架構
- RESTful API 設計
- JWT 安全驗證
- 模組化 Vue3 設計

## 核心功能

- 使用者註冊 / 登入（JWT）
- 收藏設計靈感（圖片 / 網站）
- 個人收藏 CRUD
- 分類管理（Category）
- 搜尋與篩選功能

## Claude Code 開發輔助工具

本專案部分開發流程中使用 **Claude Code（AI 開發輔助工具）** 協助進行：

- 系統架構設計輔助
- API 架構整理
- README 文件優化
- 前後端專案結構規劃

## 技術架構

### Frontend

- Vue 3（Composition API）
- Vite
- Vue Router
- Pinia
- Axios

### Backend

- Django 5+
- Django REST Framework
- Simple JWT
- ViewSet + Router 架構
- UUID Primary Key

## 系統架構圖

<img width="1181" height="1844" alt="mermaid-diagram" src="https://github.com/user-attachments/assets/6b42c861-9d7c-48f2-9881-ec65b5f48876" />

## 資料模型

<img width="801" height="550" alt="inspiration-collection-system" src="https://github.com/user-attachments/assets/ce895341-2b25-4405-850f-090aae235292" />

### User（使用者）

| 欄位名稱   | 型別         | 說明                     |
| ---------- | ------------ | ------------------------ |
| id         | UUID         | 使用者唯一識別碼（主鍵） |
| username   | VARCHAR(150) | 使用者名稱               |
| email      | VARCHAR(255) | 電子郵件                 |
| password   | VARCHAR(255) | 加密後密碼               |
| created_at | DATETIME     | 建立時間                 |
| updated_at | DATETIME     | 最後更新時間             |

### Category（分類）

| 欄位名稱   | 型別         | 說明                   |
| ---------- | ------------ | ---------------------- |
| id         | UUID         | 分類唯一識別碼（主鍵） |
| name       | VARCHAR(100) | 分類名稱               |
| created_at | DATETIME     | 建立時間               |
| updated_at | DATETIME     | 最後更新時間           |

### Inspiration（收藏內容）

| 欄位名稱    | 型別               | 說明                       |
| ----------- | ------------------ | -------------------------- |
| id          | UUID               | 收藏內容唯一識別碼（主鍵） |
| title       | VARCHAR(255)       | 收藏標題                   |
| description | TEXT               | 收藏描述                   |
| image_url   | URL / VARCHAR(500) | 靈感圖片網址               |
| source_url  | URL / VARCHAR(500) | 原始來源網址               |
| user_id     | UUID (FK)          | 建立者（關聯 User）        |
| category_id | UUID (FK)          | 分類（關聯 Category）      |
| created_at  | DATETIME           | 建立時間                   |
| updated_at  | DATETIME           | 最後更新時間               |

## 權限設計

| API                | 是否需要登入 |
| ------------------ | ------------ |
| Register           | 否           |
| Login              | 否           |
| Get Categories     | 否           |
| Get Inspirations   | 是           |
| Create Inspiration | 是           |
| Update Inspiration | 是（僅本人） |
| Delete Inspiration | 是（僅本人） |

## API 設計（RESTful）

| 模組        | Method | Endpoint                  | 說明         |
| ----------- | ------ | ------------------------- | ------------ |
| Auth        | POST   | `/api/auth/register/`     | 使用者註冊   |
| Auth        | POST   | `/api/auth/login/`        | 使用者登入   |
| Category    | GET    | `/api/categories/`        | 取得分類列表 |
| Inspiration | GET    | `/api/inspirations/`      | 取得收藏列表 |
| Inspiration | POST   | `/api/inspirations/`      | 新增收藏     |
| Inspiration | GET    | `/api/inspirations/{id}/` | 取得單筆收藏 |
| Inspiration | PUT    | `/api/inspirations/{id}/` | 更新收藏     |
| Inspiration | DELETE | `/api/inspirations/{id}/` | 刪除收藏     |

## 專案架構

```
.
├── frontend
├── backend
├── CLAUDE.md
├── Makefile
└── README.md
```

### Frontend

```
frontend
├── node_modules
├── src
│   ├── api
│   │   ├── auth.js
│   │   ├── axios.js
│   │   ├── categories.js
│   │   └── inspirations.js
│   ├── assets
│   │   └── main.css
│   ├── components
│   │   ├── CategoryFilter.vue
│   │   ├── InspirationCard.vue
│   │   └── NavBar.vue
│   ├── router
│   │   └── index.js
│   ├── stores
│   │   ├── auth.js
│   │   └── inspirations.js
│   ├── views
│   │   ├── InspirationDetailView.vue
│   │   ├── InspirationFormView.vue
│   │   ├── InspirationListView.vue
│   │   ├── LoginView.vue
│   │   └── RegisterView.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```

### Backend

```
backend
├── categories
│   ├── __pycache__
│   ├── migrations
│   ├── __init__.py
│   ├── admin.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
├── config
│   ├── __pycache__
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── inspirations
│   ├── __pycache__
│   ├── migrations
│   ├── __init__.py
│   ├── admin.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
├── users
│   ├── __pycache__
│   ├── migrations
│   ├── __init__.py
│   ├── admin.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
├── venv
│   ├── bin
│   ├── include
│   ├── lib
│   └── pyvenv.cfg
├── db.sqlite3
├── manage.py
└── requirements.txt
```

## 開發流程

1. 先撰寫 CLAUDE.md 專案需求
2. 使用 Claude Code 生成後端 Django 架構
3. 使用 Claude Code 生成Vue3 前端結構
4. 逐步修正 API 與 UI
5. 最後整合前後端

## 前端頁面示意圖

### 作品收藏列表
<img width="1329" height="723" alt="截圖 2026-06-17 上午10 04 29" src="https://github.com/user-attachments/assets/03148372-148f-4b07-81ac-c84dcd97ae9b" />

### 新增收藏作品
<img width="1308" height="849" alt="截圖 2026-06-17 上午10 05 33" src="https://github.com/user-attachments/assets/d54d8121-72a3-446b-9d96-a9f8c8cca816" />

### 編輯收藏作品
<img width="1316" height="849" alt="截圖 2026-06-17 上午10 05 09" src="https://github.com/user-attachments/assets/5d703261-4553-4417-a99f-f3cc55c881c8" />

## 未來優化

- AI 推薦系統
- 標籤系統（Tags）
- 公開靈感社群
- 收藏按讚系統
- Chrome extension 收藏工具

## 版權聲明

此專案僅供個人學習與紀錄使用，無授權任何學習教材用途與商業用途。

## 致謝

感謝所有為這個專案提供建議和協助的人。
