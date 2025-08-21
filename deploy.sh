#!/bin/bash

echo "🚀 Deploy automático do site WF Cirúrgicos"
echo "=========================================="

# Adicionar todas as mudanças
echo "📁 Adicionando arquivos..."
git add .

# Fazer commit com data e hora
COMMIT_MESSAGE="Atualização automática - $(date '+%d/%m/%Y %H:%M')"
echo "💾 Fazendo commit: $COMMIT_MESSAGE"
git commit -m "$COMMIT_MESSAGE"

# Fazer push
echo "⬆️ Enviando para o GitHub..."
git push origin main

echo "✅ Deploy concluído!"
echo "🌐 Site disponível em: https://github.com/adsdentech-web/wf-certo-1" 