# Inspo — 設計靈感收藏系統

## 啟動後端

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser  # 建立 Admin 帳號
python manage.py runserver
```

後端 API 運行於 http://localhost:8000

## 啟動前端

```bash
cd frontend
npm install
npm run dev
```

前端運行於 http://localhost:5173

## 新增分類（透過 Admin）

開啟 http://localhost:8000/admin → 登入 → Categories → 新增分類

## API 端點

| 方法 | 路徑 | 說明 |
|------|------|------|
| POST | /api/auth/register/ | 註冊 |
| POST | /api/auth/login/ | 登入（回傳 JWT） |
| POST | /api/auth/refresh/ | 刷新 Token |
| GET | /api/categories/ | 取得所有分類 |
| GET | /api/inspirations/ | 取得所有收藏 |
| POST | /api/inspirations/ | 新增收藏（需登入） |
| GET | /api/inspirations/{id}/ | 取得單筆 |
| PUT | /api/inspirations/{id}/ | 更新（限本人） |
| DELETE | /api/inspirations/{id}/ | 刪除（限本人） |

## 查詢參數

- `?search=keyword` — 搜尋標題或描述
- `?category={uuid}` — 依分類篩選
- `?mine=true` — 只看自己的收藏
- `?page=2` — 分頁（每頁 12 筆）
