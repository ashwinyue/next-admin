# ==================================
# issue2md Project Makefile
# ==================================

.PHONY: help init web web-dev web-build clean test lint

# Default target
.DEFAULT_GOAL := help

# ==================================
# Help
# ==================================
help: ## 显示帮助信息
	@echo "issue2md - Issue to Markdown Converter"
	@echo ""
	@echo "使用方法: make [target]"
	@echo ""
	@echo "可用命令:"
	@awk 'BEGIN {FS = ":.*##"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

# ==================================
# Initialization
# ==================================
init: ## 初始化项目依赖
	@echo "==> 初始化 Go 模块..."
	go mod download
	@echo "==> 初始化前端依赖..."
	cd web && npm install
	@echo "==> 初始化完成!"

# ==================================
# Web / Frontend
# ==================================
web-dev: ## 启动前端开发服务器
	@echo "==> 启动前端开发服务器..."
	cd web && npm run dev

web-build: ## 构建前端生产版本
	@echo "==> 构建前端..."
	cd web && npm run build

web-preview: ## 预览前端构建结果
	@echo "==> 预览前端..."
	cd web && npm run preview

web-lint: ## 检查前端代码
	@echo "==> 检查前端代码..."
	cd web && npm run lint

# ==================================
# Go / Backend
# ==================================
run: ## 运行 Go 后端服务
	@echo "==> 运行后端服务..."
	go run .

build: ## 构建 Go 可执行文件
	@echo "==> 构建后端..."
	go build -o bin/issue2md .

# ==================================
# Testing
# ==================================
test: ## 运行所有测试
	@echo "==> 运行测试..."
	go test -v ./...

test-coverage: ## 运行测试并生成覆盖率报告
	@echo "==> 运行测试覆盖率..."
	go test -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out -o coverage.html
	@echo "==> 覆盖率报告已生成: coverage.html"

# ==================================
# Linting
# ==================================
lint: ## 运行代码检查
	@echo "==> 检查 Go 代码..."
	golangci-lint run ./... || true

lint-fix: ## 自动修复代码问题
	@echo "==> 自动修复代码格式..."
	go fmt ./...
	gofmt -w .

# ==================================
# Cleaning
# ==================================
clean: ## 清理构建文件
	@echo "==> 清理构建文件..."
	rm -rf bin/
	rm -f coverage.out coverage.html
	cd web && rm -rf dist/ node_modules/.vite

deep-clean: clean ## 深度清理（包括依赖）
	@echo "==> 深度清理..."
	cd web && rm -rf node_modules/
	go clean -modcache

# ==================================
# Development
# ==================================
dev: ## 启动完整开发环境（前后端）
	@echo "==> 启动开发环境..."
	@make -j2 web-dev run

# ==================================
# Installation
# ==================================
install-tools: ## 安装开发工具
	@echo "==> 安装开发工具..."
	go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
	@echo "==> 工具安装完成!"
