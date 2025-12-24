# 🔍 Guía: Registrar MedalBlog en Google Search Console

## ¿Qué es Google Search Console?

Google Search Console (GSC) es una herramienta **100% gratuita** de Google que te permite:

- Monitorear cómo Google indexa tu sitio
- Ver qué búsquedas llevan tráfico a tu blog
- Identificar errores y oportunidades de mejora
- Enviar sitemaps para mejor indexación
- Solicitar re-indexación de páginas

**IMPORTANTE:** Es completamente gratis y no requiere tarjeta de crédito.

---

## Paso 1: Acceder a Google Search Console

1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Inicia sesión con tu cuenta de Google
3. Click en "Agregar propiedad"

---

## Paso 2: Agregar tu Sitio

Tienes dos opciones:

### Opción A: Prefijo de URL (Recomendado)

1. Selecciona "Prefijo de URL"
2. Ingresa: `https://medalblog-vo3w.vercel.app/`
3. Click en "Continuar"

### Opción B: Dominio (Solo si tienes dominio personalizado)

- Requiere verificación DNS
- Más complejo pero cubre todas las variantes (www, subdominos)

---

## Paso 3: Verificar Propiedad

Google te dará varias opciones de verificación. La más fácil para Vercel:

### Método Recomendado: HTML Tag

1. Google te mostrará un meta tag como:

   ```html
   <meta name="google-site-verification" content="ABC123..." />
   ```

2. Copia todo el tag

3. En tu proyecto, abre: `app/layout.tsx`

4. Agrega el meta tag en el `<head>`:

   ```tsx
   export default function RootLayout({ children }: { children: React.ReactNode }) {
     return (
       <html>
         <head>
           <meta name="google-site-verification" content="ABC123..." />
           {/* ... resto del head */}
         </head>
         <body>{children}</body>
       </html>
     )
   }
   ```

5. Haz commit y push a GitHub:

   ```bash
   git add app/layout.tsx
   git commit -m "Add Google Search Console verification"
   git push
   ```

6. Espera que Vercel despliegue (1-2 minutos)

7. Vuelve a Google Search Console y click en "Verificar"

---

## Paso 4: Enviar Sitemap

Una vez verificado:

1. En el menú lateral, click en "Sitemaps"

2. En "Agregar un nuevo sitemap", ingresa: `sitemap.xml`

3. Click en "Enviar"

Tu sitemap ya está generado automáticamente por Next.js en:
`https://medalblog-vo3w.vercel.app/sitemap.xml`

**¡Eso es todo!** Google comenzará a indexar tu sitio en 24-48 horas.

---

## Paso 5: Configuraciones Adicionales

### Robots.txt

Tu blog ya tiene uno generado automáticamente en:
`https://medalblog-vo3w.vercel.app/robots.txt`

Verifica que funcione visitando esa URL.

### RSS Feed

También está disponible en:
`https://medalblog-vo3w.vercel.app/feed.xml`

---

## Qué Hacer Después de Registrar

### Inmediato (Día 1)

- [ ] Verificar que el sitemap se procesó correctamente
- [ ] Revisar "Cobertura" para ver páginas indexadas
- [ ] Verificar que no haya errores en "Estado de la página"

### Semanal (Primeras 4 semanas)

- [ ] Revisar "Rendimiento" para ver búsquedas y clicks
- [ ] Identificar queries con impresiones pero bajo CTR
- [ ] Solicitar indexación de posts nuevos

### Mensual (Ongoing)

- [ ] Analizar tendencias de tráfico orgánico
- [ ] Identificar oportunidades de keywords
- [ ] Optimizar posts con mejor rendimiento

---

## Métricas Importantes a Monitorear

### 1. Páginas Indexadas

**Dónde:** Cobertura → Válidas

**Objetivo:** Que todas tus páginas estén indexadas

- ~12 posts
- Páginas estáticas (about, projects, etc.)
- Páginas de tags

**Qué hacer si no indexa:**

- Solicitar indexación manualmente
- Verificar que no estén en `robots.txt`
- Esperar 1-2 semanas (es normal demora inicial)

### 2. Consultas de Búsqueda

**Dónde:** Rendimiento → Consultas

**Métricas clave:**

- **Impresiones:** Cuántas veces apareció tu link en Google
- **Clicks:** Cuántas veces clickearon
- **CTR:** % de clicks (objetivo: >5%)
- **Posición:** Posición promedio en resultados (objetivo: <20)

### 3. Errores y Avisos

**Dónde:** Cobertura → Excluidas / Con errores

**Comunes:**

- "Rastreada, no indexada" → Normal al inicio
- "Encontrada, no rastreada" → Agregar a sitemap
- "404 Not Found" → Arreglar links rotos

---

## Solicitar Indexación de Posts Nuevos

Cada vez que publiques un post nuevo:

1. Ve a "Inspección de URLs" (barra superior)
2. Ingresa la URL completa: `https://medalblog-vo3w.vercel.app/blog/nombre-del-post`
3. Click en "Solicitar indexación"
4. Espera 1-7 días

Esto acelera que Google descubra tu contenido nuevo.

---

## Herramientas Complementarias (También Gratuitas)

### 1. Google Analytics 4

- **Qué hace:** Métricas detalladas de visitantes
- **Costo:** Gratis
- **Setup:** 15 minutos
- **URL:** [analytics.google.com](https://analytics.google.com)

**Alternativa (Más simple):**

- Umami (ya configurado en tu blog)
- Plausible Analytics (tiene plan gratis limitado)

### 2. Bing Webmaster Tools

- **Qué hace:** Lo mismo que GSC pero para Bing
- **Costo:** Gratis
- **Por qué:** ~5% del tráfico puede venir de Bing
- **URL:** [bing.com/webmasters](https://www.bing.com/webmasters)

**Setup similar a GSC:**

1. Puedes importar data desde GSC
2. O verificar con meta tag
3. Enviar mismo sitemap

---

## Trucos y Tips

### Acelerar Indexación

✅ Publica contenido regular (1 post/semana ideal)
✅ Comparte en redes sociales (ayuda a discovery)
✅ Genera backlinks (otros sitios linkeen a tu blog)
✅ Usa sitemap y solicita indexación manual

### Mejorar Ranking

✅ Optimiza meta descriptions (150-160 chars)
✅ Usa keywords relevantes en títulos y H2s
✅ Contenido original y de calidad (+1000 palabras)
✅ Actualiza posts antiguos periódicamente
✅ Internal linking entre posts relacionados

### Evitar Problemas

❌ No copies contenido de otros sitios
❌ No keyword stuffing (repetir keywords excesivamente)
❌ No compres backlinks baratos
❌ No uses técnicas de "black hat SEO"

---

## Timeline Realista

**Semana 1-2:** Sitio verificado, sitemap enviado

- Esperas: Google rastrea tu sitio

**Mes 1:** Primeras páginas indexadas

- Impresiones: 0-100
- Clicks: 0-10
- Posiciones: >50

**Mes 2-3:** Indexación completa

- Impresiones: 100-500
- Clicks: 10-50
- Posiciones: 20-50

**Mes 6:** Crecimiento orgánico

- Impresiones: 500-2000
- Clicks: 50-200
- Posiciones: 10-30

**Año 1:** Autoridad establecida

- Impresiones: 2000+
- Clicks: 200-500+
- Posiciones: <20 para varios keywords

**IMPORTANTE:** SEO es un juego de largo plazo. No esperes resultados en días o semanas.

---

## Checklist de Configuración Completa

- [ ] Sitio verificado en Google Search Console
- [ ] Sitemap enviado y sin errores
- [ ] Meta tag de verificación en producción
- [ ] Robots.txt accesible
- [ ] RSS feed accesible
- [ ] Structured data (JSON-LD) implementado ✅ (ya hecho)
- [ ] Meta descriptions optimizadas
- [ ] Open Graph tags configurados ✅ (ya hecho)
- [ ] (Opcional) Google Analytics configurado
- [ ] (Opcional) Bing Webmaster Tools configurado

---

## Recursos Adicionales

### Documentación Oficial

- [Guía de inicio de Search Console](https://support.google.com/webmasters/answer/9128668)
- [Optimizar contenido](https://developers.google.com/search/docs/beginner/seo-starter-guide)
- [Structured Data Guide](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

### Herramientas de Testing

- [Rich Results Test](https://search.google.com/test/rich-results) - Verificar JSON-LD
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

## Soporte

Si tienes dudas:

1. Revisa [Centro de ayuda de Search Console](https://support.google.com/webmasters)
2. Busca en [r/SEO](https://reddit.com/r/SEO)
3. Pregunta en [Stack Overflow - tag: google-search-console](https://stackoverflow.com/questions/tagged/google-search-console)

---

**¡Listo! Con esto tu blog estará completamente preparado para SEO orgánico.** 🚀

_Última actualización: 23 de diciembre de 2025_
