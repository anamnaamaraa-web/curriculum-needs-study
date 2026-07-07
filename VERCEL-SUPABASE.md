# Vercel + Supabase тохиргоо

Энэ төсөл Vercel дээр `server.mjs` Node.js server entrypoint байдлаар ажиллана. Vercel-ийн Node.js runtime нь project root дээрх `server.mjs` файлыг илрүүлж, `server.listen()` дуудлагыг Vercel Function болгон route хийдэг.

## 1. GitHub дээр байх ёстой файлууд

```text
server.mjs
index.html
app.js
styles.css
package.json
supabase-schema.sql
```

## 2. Supabase table үүсгэх

Supabase Dashboard → SQL Editor хэсэгт `supabase-schema.sql` файлын SQL-г нэг удаа ажиллуулна.

Үүсэх table:

```text
public.app_state
```

## 3. Vercel Environment Variables

Vercel → Project → Settings → Environment Variables хэсэгт дараахыг нэмнэ.

```text
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SECRET_KEY=sb_secret_...
SUPABASE_STATE_TABLE=app_state
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-5.5
PUBLIC_BASE_URL=https://your-vercel-domain.vercel.app
```

`SUPABASE_SECRET_KEY` байхгүй бол дата Supabase-д хадгалагдахгүй. Supabase integration зөвхөн public anon key өгсөн байж магадгүй тул service role/secret key-г server-side environment болгон гараар нэмнэ.

## 4. Deploy дараах шалгалт

Доорх хаягийг нээнэ.

```text
https://your-vercel-domain.vercel.app/api/health
```

Зөв бол:

```json
{
  "storage": {
    "mode": "supabase",
    "configured": true,
    "writable": true,
    "exists": true
  }
}
```

Хэрэв ингэж гарвал Supabase URL байгаа ч secret key дутуу байна:

```json
{
  "storage": {
    "mode": "server-file",
    "supabase": {
      "urlConfigured": true,
      "serviceKeyConfigured": false
    }
  }
}
```

## 5. Анхаарах зүйл

- `SUPABASE_SECRET_KEY` болон `OPENAI_API_KEY`-г GitHub файлд бичихгүй.
- Эдгээрийг зөвхөн Vercel Environment Variables дээр хадгална.
- Vercel дээр file storage түр зуурын шинжтэй тул shared дата заавал Supabase-д хадгалагдах ёстой.
