#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_ROOT"

PORT="${PORT:-1108}"

echo "=========================================="
echo "   交互式课程平台 - 本地预览"
echo "=========================================="
echo ""

PYTHON_CMD=""
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ 错误: 未找到 Python。请安装 Python 3。"
    exit 1
fi

PYTHON_VERSION=$($PYTHON_CMD --version 2>&1)
echo "🐍 Python 版本: $PYTHON_VERSION"
echo "📁 项目目录: $PROJECT_ROOT"
echo "📍 端口: $PORT"
echo ""

if command -v lsof &> /dev/null; then
    if lsof -i :$PORT > /dev/null 2>&1; then
        echo "⚠️  端口 $PORT 正在使用中"
        echo ""
        echo "正在终止占用端口的进程..."
        pkill -f "http.server.*$PORT" 2>/dev/null || true
        PID=$(lsof -ti :$PORT)
        if [ -n "$PID" ]; then
            kill -9 $PID 2>/dev/null || true
        fi
        sleep 2
        echo "✅ 已清理端口"
        echo ""
    fi
fi

echo "🚀 正在启动本地服务器..."
echo ""

$PYTHON_CMD -m http.server $PORT &
SERVER_PID=$!

sleep 2

if ! kill -0 $SERVER_PID 2>/dev/null; then
    echo "❌ 服务器启动失败"
    exit 1
fi

echo "✅ 服务器已启动 (PID: $SERVER_PID)"
echo ""
echo "📖 在浏览器中打开:"
echo "   http://localhost:$PORT"
echo ""
echo "🎯 课程入口:"
echo "   http://localhost:$PORT/public/courses/math/math-grade-7/"
echo ""
echo "⏹️  按 Ctrl+C 停止服务器"
echo ""
echo "=========================================="
echo ""

wait $SERVER_PID
