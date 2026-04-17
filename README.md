This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## Production Setup

### Стек

| Компонент | Технология |
| --------- | ---------- |
| Фреймворк | Next.js 15 (App Router, standalone) |
| CMS | PayloadCMS 3.x |
| ORM | Prisma 7 |
| БД | PostgreSQL 16 |
| Язык | TypeScript |

### Инфраструктура

| Компонент | Описание |
| --------- | -------- |
| Сервер | VDS Ubuntu 24.04, IP: 185.41.161.60 |
| Процесс-менеджер | PM2 |
| Reverse proxy | Nginx |
| БД | PostgreSQL 16 в Docker-контейнере |
| Медиафайлы | Локально: `/opt/pso/public/media/` |
| SSL | Let's Encrypt (автообновление через certbot) |
| CI/CD | GitHub Actions |

### Deploy Flow

Деплой происходит **автоматически** при пуше в ветку `master`:

```text
git push origin master
        ↓
GitHub Actions (.github/workflows/deploy.yml)
        ↓
SSH → сервер 185.41.161.60
        ↓
git pull → npm ci → npm run build → pm2 restart pso
        ↓
Сайт обновлён на https://phantom-group.ru
```

Время деплоя: ~5-7 минут (сборка Next.js).

#### Ручной деплой

```bash
ssh -i ~/.ssh/id_rsa root@185.41.161.60
cd /opt/pso
git pull origin master
npm ci
NODE_OPTIONS="--max_old_space_size=1536" npm run build #Решение проблемы с нехваткой ОЗУ во время сборки
pm2 restart pso
```

### Структура на сервере

```text
/opt/pso/
├── .env                    # переменные окружения (не в git)
├── docker-compose.yml      # PostgreSQL контейнер
├── ecosystem.config.cjs    # конфигурация PM2
├── .next/                  # сборка
├── node_modules/
└── public/
    └── media/              # медиафайлы CMS
```

### Полезные команды

```bash
pm2 status                  # статус приложения
pm2 logs pso                # логи в реальном времени
pm2 restart pso             # перезапуск

cd /opt/pso && docker compose ps     # статус БД
```

### Админ-панель

`https://phantom-group.ru/admin`
