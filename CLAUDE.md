# inspo
這是一個前後端分離的全端專案，使用：
- 前端：Vue 3
- 後端：Django REST Framework
- 認證：JWT
- 管理後台：Django Admin

## 一、專案目標
本專案是一個「設計靈感收藏系統」，使用者可以：
### 一般使用者
- 註冊 / 登入
- 收藏設計靈感（網站 / UI / App）
- 查看收藏列表
- 編輯 / 刪除自己的收藏
- 依分類搜尋與篩選

### 管理者（Admin）
- 使用 Django Admin 管理所有資料
- 管理使用者
- 管理分類
- 管理收藏內容

## 二、技術規則
### 前端（Vue3）
- 必須使用 Vue 3 Composition API
- 使用 Vite 建立專案
- 使用 Pinia 管理狀態
- 使用 Vue Router 管理頁面
- 使用 Axios 統一 API 呼叫
- API 必須集中在 /api 資料夾
- 頁面與元件必須分離

### 後端（Django）
- 使用 Django 5+
- 使用 Django REST Framework
- 使用 Simple JWT 做登入驗證
- 使用 ViewSet + Router 架構 API
- 所有 model 必須使用 UUID 作為主鍵
- 所有 model 必須包含：
- - created_at
- - updated_at

## 三、專案架構規則
### Backend apps 結構
必須拆成以下 apps：
- users（使用者與登入）
- categories（分類）
- inspirations（收藏內容）

### Frontend 結構
必須遵守：
- /views → 頁面
- /components → 可重用元件
- /stores → Pinia 狀態
- /api → API 呼叫封裝
- /router → 路由設定

## 四、權限規則
- 使用 JWT Authentication
- 未登入使用者不能操作收藏
- 使用者只能修改 / 刪除「自己的 inspirations」
- category 為唯讀（一般使用者不可修改）

## 五、API 規則（RESTful）
所有 API 必須符合 RESTful：
### Auth
- POST /api/auth/register/
- POST /api/auth/login/
### Category
- GET /api/categories/
### Inspiration
- GET /api/inspirations/
- POST /api/inspirations/
- GET /api/inspirations/{id}/
- PUT /api/inspirations/{id}/
- DELETE /api/inspirations/{id}/

## 六、功能規格
### Inspiration（核心功能）
每個收藏包含：
- 標題（title）
- 描述（description）
- 圖片網址（image_url）
- 來源網址（source_url）
- 分類（category）
- 建立者（user）
### 使用者功能
- 註冊
- 登入
- 收藏管理（CRUD）
- 搜尋收藏
- 分類篩選

## 七、Django Admin 規則
Admin 必須支援：
### Category Admin
- 搜尋 name
- 顯示 created_at
- Inspiration Admin
- 搜尋 title / description
- filter category
- list_display 顯示 user / category / created_at
### User Admin
- 管理使用者帳號

## 八、Claude Code 行為規則（非常重要）
請遵守以下規則：
- 不要反問不必要的問題
- 如果資訊不足，請合理假設並繼續開發
- 一次產出完整可運行的程式碼
- 優先簡潔，而不是過度設計
- 確保 Django + Vue 可以直接運行
- 不要只給片段程式碼（除非特別要求）
- 保持前後端架構清晰分離

## 九、開發流程規範
標準流程如下：
- 建立 Django 專案與 apps
- 建立 models
- 建立 serializers
- 建立 viewsets
- 設定 JWT auth
- 建立 Django admin
- 建立 Vue3 專案
- 建立 router
- 建立 pinia store
- 串接 API
- 完成 CRUD 頁面

## 十、專案核心原則
- 前後端分離
- API 驅動開發
- 簡潔優先
- 可維護性優先
- 功能完整優先
- 避免過度工程化