#!/bin/bash
set -e

# Railsに潜在的に存在するserver.pidを削除
rm -f /myapp/tmp/pids/server.pid

# コンテナのメインプロセス（DockerfileでCMDと設定されているもの）を実行
exec "$@"