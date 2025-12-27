# 🔑 Configuración de Servicios Externos (Tokens y Keys)

Para que el sistema de comentarios (Giscus) y la Newsletter (Buttondown) funcionen, necesitas configurar estas variables de entorno en Vercel.

---

## 1. Configurar Giscus (Comentarios)

Giscus usa GitHub Discussions para almacenar los comentarios. Es gratis y seguro.

### Pasos:

1.  **Habilitar Discussions:**

    - Ve a tu repositorio de GitHub `medalblog`.
    - Settings -> General -> Features -> Check "Discussions".

2.  **Instalar Giscus App:**

    - Ve a [giscus.app](https://giscus.app).
    - Instala la app en tu repositorio `medalblog`.

3.  **Configurar en giscus.app:**

    - En la web de giscus, ingresa `medalcode/medalblog` (o tu usuario/repo correcto).
    - **Page ↔️ Discussion Mapping:** Selecciona "Discussion title contains page pathname".
    - **Discussion Category:** Selecciona "General" (o crea una categoría "Comments" en tu repo y úsala).
    - **Features:** Activa "Enable reaction handling".

4.  **Obtener Variables:**
    - Giscus generará un script automáticamene. **NO COPIES EL SCRIPT**.
    - Busca la sección `data-repo-id`, `data-category`, y `data-category-id`.

### Variables para Vercel (`.env`):

```bash
NEXT_PUBLIC_GISCUS_REPO="medalcode/medalblog"
NEXT_PUBLIC_GISCUS_REPOSITORY_ID="R_kgDON2ZB4g"
NEXT_PUBLIC_GISCUS_CATEGORY="General"
NEXT_PUBLIC_GISCUS_CATEGORY_ID="DIC_kwDON2ZB4s4C0RaV"
```

---

## 2. Configurar Buttondown (Newsletter)

Buttondown es la plataforma recomendada por su simplicidad y capa gratuita.

### Pasos:

1.  **Crear cuenta:**

    - Ve a [buttondown.email](https://buttondown.email) y regístrate.

2.  **Obtener API Key:**
    - Ve a Settings -> API.
    - Copia tu API Key.

### Variables para Vercel (`.env`):

```bash
BUTTONDOWN_API_KEY="[TU_API_KEY_AQUI]"
```

---

## 3. Google Analytics / Umami (Opcional pero recomendado)

Si usas Umami (ya configurado en el código base):

```bash
NEXT_UMAMI_ID="[TU_UMAMI_ID]"
NEXT_PUBLIC_UMAMI_ID="[TU_UMAMI_ID]"
```

---

## 🚀 Cómo aplicar en Vercel

1.  Ve a tu dashboard de Vercel.
2.  Selecciona el proyecto `medalblog`.
3.  Ve a **Settings -> Environment Variables**.
4.  Agrega cada una de las variables arriba mencionadas.
5.  **Redeploy:** Necesitas hacer un redeploy (o push de un cambio vacío) para que las variables surtan efecto.
