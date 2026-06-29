# Vowed — Wedding Planner

## Setup en 3 pasos

### 1. Supabase
1. Ve a supabase.com y crea un nuevo proyecto llamado "vowed"
2. En el proyecto, ve a **SQL Editor** y ejecuta:

```sql
-- Habilitar autenticación por email (ya está activo por defecto)

-- Tabla de perfiles
create table profiles (
  id uuid references auth.users on delete cascade,
  name1 text,
  name2 text,
  wedding_date date,
  style text,
  budget text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (id)
);

-- Row Level Security
alter table profiles enable row level security;
create policy "Users can manage their own profile"
  on profiles for all using (auth.uid() = id);
```

3. Ve a **Settings → API** y copia:
   - Project URL
   - anon public key

### 2. Variables de entorno
Crea un archivo `.env.local` en la raíz del proyecto:
```
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
```

### 3. Vercel
1. Sube el proyecto a GitHub
2. En vercel.com → New Project → importa el repo
3. En **Environment Variables** añade las mismas variables de `.env.local`
4. Deploy

## Desarrollo local
```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Stack
- Next.js 14
- Tailwind CSS
- Supabase (auth + base de datos)
- Vercel (deploy)
