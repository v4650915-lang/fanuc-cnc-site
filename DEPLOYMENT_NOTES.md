# Заметки о деплое на GitHub Pages

## ⚠️ Ограничения GitHub Pages

GitHub Pages поддерживает только **статический экспорт** Next.js. Это означает:

### Что НЕ работает:
- ❌ API Routes (`pages/api/*`) - не включаются в статический экспорт
- ❌ Server-side rendering (SSR)
- ❌ Server Components
- ❌ Динамические маршруты с серверной логикой

### Что работает:
- ✅ Статические страницы
- ✅ Client-side rendering
- ✅ Изображения и статические ресурсы
- ✅ Все компоненты React

## Решение для формы обратной связи

### Вариант 1: Vercel (рекомендуется)
1. Загрузите проект на [Vercel](https://vercel.com)
2. Vercel автоматически поддерживает API Routes
3. Настройте переменные окружения:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`

### Вариант 2: Netlify Functions
1. Загрузите проект на [Netlify](https://netlify.com)
2. Настройте Netlify Functions для API routes
3. Создайте файл `netlify/functions/send-message.ts`

### Вариант 3: Внешний сервис
Используйте сервисы типа:
- [Formspree](https://formspree.io)
- [EmailJS](https://www.emailjs.com)
- [Web3Forms](https://web3forms.com)

## Текущая конфигурация

Проект настроен для GitHub Pages:
- `basePath: '/fanuc-cnc-site'` - путь к репозиторию
- `output: 'export'` - статический экспорт
- Все пути к изображениям включают basePath

## Проверка перед деплоем

✅ Все пути к изображениям начинаются с `/fanuc-cnc-site`
✅ `next.config.js` настроен для статического экспорта
✅ `.gitignore` исключает `node_modules` и `.next`
✅ Все зависимости указаны в `package.json`

