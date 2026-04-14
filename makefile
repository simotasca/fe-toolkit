.PHONY: blank back

include ./makeutils/*
include .env

DB_CONN = postgresql://$(DB_USER):$(DB_PASS)@localhost:$(DB_PORT)/$(DB_NAME)

blank:
	@echo "command not specified"

dev:
	$(MAKE) -j3 back front db

back:
	@cd apps/backend; \
		PORT=$(BACK_PORT) \
		DB_CONN='$(DB_CONN)' \
		LOGGER=pretty \
		MAIL_OPTIONS='$(MAIL_CONFIG)' \
		MAIL_SENDER='$(MAIL_SENDER)' \
		CMS_FRONTEND_HOST='$(CMS_FRONTEND_HOST)' \
		CMS_FRONTEND_CONFIRM_ACCOUNT_PATH='$(CMS_FRONTEND_CONFIRM_ACCOUNT_PATH)' \
		CMS_FRONTEND_RESET_PASSWORD_PATH='$(CMS_FRONTEND_RESET_PASSWORD_PATH)' \
		JWT_TOKEN_SECRET='$(JWT_TOKEN_SECRET)' \
		ADMIN_EMAIL='$(ADMIN_EMAIL)' \
		ADMIN_USERNAME='$(ADMIN_USERNAME)' \
		ADMIN_PASSWORD='$(ADMIN_PASSWORD)' \
		npm run dev | $(label_green) " api "

front:
	@cd apps/frontend; \
		npm run dev | $(label_blue) " cms "

db:
	@docker compose up db --no-log-prefix 2>&1 | $(label_yellow) " db "