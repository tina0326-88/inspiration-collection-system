BACKEND_DIR = backend
FRONTEND_DIR = frontend
VENV = $(BACKEND_DIR)/venv
PYTHON = $(VENV)/bin/python
PIP = $(VENV)/bin/pip

.PHONY: install migrate backend frontend dev superuser

# 安裝所有依賴
install:
	python3 -m venv $(VENV)
	$(PIP) install -r $(BACKEND_DIR)/requirements.txt
	cd $(FRONTEND_DIR) && npm install

# 執行 Django migrations
migrate:
	$(PYTHON) $(BACKEND_DIR)/manage.py migrate

# 建立 superuser
superuser:
	$(PYTHON) $(BACKEND_DIR)/manage.py createsuperuser

# 只啟動後端
backend:
	$(PYTHON) $(BACKEND_DIR)/manage.py runserver

# 只啟動前端
frontend:
	cd $(FRONTEND_DIR) && npm run dev

# 同時啟動前後端
dev:
	@echo "啟動後端 http://127.0.0.1:8000"
	@echo "啟動前端 http://localhost:5173"
	@$(PYTHON) $(BACKEND_DIR)/manage.py runserver & \
	cd $(FRONTEND_DIR) && npm run dev
