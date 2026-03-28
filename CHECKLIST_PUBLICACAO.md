# Checklist de Publicacao (Vite -> Hospedagem comum)

1. Confirmar `base: "./"` no `vite.config.ts`.
2. Rodar `npm install` (só na primeira vez ou se mudar dependencias).
3. Rodar `npm run build`.
4. Apagar tudo dentro de `public_html`.
5. Subir **somente** o conteudo de `dist` (arquivos soltos + pasta `assets/`).
6. Abrir o site e testar no navegador.
7. Se der branco: abrir F12 -> Console/Network e verificar erros.
