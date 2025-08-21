#!/bin/bash

echo "🔄 Atualizando site WF Cirúrgicos..."

# Adicionar mudanças
git add .

# Commit automático
git commit -m "Atualização $(date '+%H:%M')"

# Push
git push

echo "✅ Pronto! Site atualizado!" 