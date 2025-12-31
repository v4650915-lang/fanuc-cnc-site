# Инструкция по загрузке на GitHub

## Шаги для загрузки проекта на GitHub

### 1. Создайте новый репозиторий на GitHub
- Перейдите на [github.com](https://github.com)
- Нажмите "New repository"
- Укажите название репозитория (например: `fanuc-cnc-site`)
- Выберите Public или Private
- **НЕ** добавляйте README, .gitignore или лицензию (они уже есть)

### 2. Инициализируйте Git в папке проекта

Откройте терминал в папке `GO GITHUB` и выполните:

```bash
# Инициализация Git репозитория
git init

# Добавление всех файлов
git add .

# Первый коммит
git commit -m "Initial commit: Fanuc CNC site"

# Добавление удаленного репозитория (замените YOUR_USERNAME и YOUR_REPO на ваши данные)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Отправка на GitHub
git branch -M main
git push -u origin main
```

### 3. Альтернативный способ через GitHub Desktop

1. Установите [GitHub Desktop](https://desktop.github.com/)
2. Откройте GitHub Desktop
3. File → Add Local Repository
4. Выберите папку `GO GITHUB`
5. Нажмите "Publish repository"
6. Следуйте инструкциям

## Важные замечания

⚠️ **API Routes на GitHub Pages:**
- **API Routes НЕ РАБОТАЮТ на GitHub Pages**, так как это статический хостинг
- Форма обратной связи не будет работать на GitHub Pages
- Для работы формы используйте:
  - **Vercel** (рекомендуется) - автоматически поддерживает API Routes
  - **Netlify** - с настройкой Netlify Functions
  - Внешние сервисы (Formspree, EmailJS и т.д.)

⚠️ **Безопасность:**
- Файл `config/socialLinks.ts` содержит API токен Telegram бота
- Рекомендуется использовать переменные окружения для токенов
- Не публикуйте токены в открытом репозитории

### Использование переменных окружения:

1. Создайте файл `.env.local` в корне проекта:
```
TELEGRAM_BOT_TOKEN=ваш_токен_бота
TELEGRAM_CHAT_ID=ваш_chat_id
```

2. Обновите `pages/api/send-message.ts` для использования переменных:
```typescript
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || 'ваш_токен';
const CHAT_ID = process.env.TELEGRAM_CHAT_ID || 'ваш_chat_id';
```

3. Добавьте `.env.local` в `.gitignore` (уже добавлен)

## Структура проекта

Все необходимые файлы уже включены:
- ✅ Исходный код (components, pages, styles)
- ✅ Конфигурационные файлы
- ✅ Изображения и статические ресурсы
- ✅ .gitignore для исключения ненужных файлов
- ✅ README.md с описанием проекта

## После загрузки

После загрузки на GitHub вы можете:
- Развернуть сайт на Vercel, Netlify или другом хостинге
- Поделиться кодом с другими разработчиками
- Внести изменения и отслеживать версии

