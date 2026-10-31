# Tu Moto Ya

Plataforma comercial de motos con foco en la consulta de financiación. Next.js 16, React 19, Tailwind 4 y Framer Motion.

```bash
pnpm install
pnpm dev        # desarrollo
pnpm test       # cálculo, planes y buscador
pnpm typecheck
pnpm build
```

Definí `NEXT_PUBLIC_SITE_URL` con el dominio definitivo: lo usan el SEO, el sitemap y los enlaces de WhatsApp.

## Dónde se cambia cada cosa

| Qué | Archivo |
| --- | --- |
| Marca, teléfono, dirección, navegación | `lib/site.ts` |
| Inventario (agregar un objeto publica la moto) | `lib/motos.ts` |
| Fotos de las motos | `public/motos/` |
| Planes reales (habilitan el Modo B) | `lib/financing-plans.ts` |
| Preguntas frecuentes | `lib/faq.ts` |
| Entregas y testimonios autorizados | `lib/testimonials.ts` |
| Mensajes de WhatsApp | `lib/whatsapp.ts` |
| Logo oficial | `components/brand/logo.tsx`, `public/icon.svg` |
| Ilustraciones de campaña | `scripts/render-art.mjs` |
| Prompts para fotos de campaña | `docs/prompts-imagenes.md` |

## Reglas del proyecto

- No se publican tasas, cuotas, entidades, stock ni testimonios sin confirmar.
- Los formularios no guardan datos: arman un mensaje que la persona envía por WhatsApp.
- No se piden DNI, fotos de documentos ni datos bancarios en la web.
- Un plan vencido o incompleto se oculta solo.
