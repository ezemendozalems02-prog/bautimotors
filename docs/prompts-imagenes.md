# Prompts de dirección de arte

En este entorno no hay generador de imágenes. El hero y el OG actuales son ilustraciones por código (`scripts/render-art.mjs`). Estos prompts sirven para generar las piezas fotorrealistas.

Reglas: una imagen generada nunca se publica como foto de una unidad en venta. Sin logos de fabricantes, patentes, texto ni personas reconocibles. Las fotos de stock y de entregas tienen que ser reales.

**Estilo base (agregar a todos):** cinematic advertising photography, deep black background, electric blue rim lighting (#1769E8, #3985FF), architectural concrete surfaces, controlled metallic reflections, wet floor reflection, strong negative space, shallow depth of field, 85mm lens, high dynamic range, no text, no logos, no license plate.

| # | Pieza | Formato | Destino | Prompt |
|---|---|---|---|---|
| 1 | Hero moto deportiva azul | 21:9 y 9:16 | `public/images/hero-desktop.webp`, `hero-mobile.webp` | Unbranded blue sport motorcycle, three-quarter front view, placed on the right third, empty dark space on the left for a headline |
| 2 | Hero alternativo urbano | 21:9 | `public/images/hero-urbana.webp` | Unbranded small urban commuter motorcycle at night, underground parking architecture, blue light strips |
| 3 | Financiación | 4:5 | `public/images/financiacion.webp` | Close-up of motorcycle keys on a dark metal surface, blue reflection, shallow focus |
| 4 | Campaña 110 cc | 16:9 | `public/images/campania-110.webp` | Unbranded 110cc underbone motorcycle, side profile, city at blue hour |
| 5 | Campaña street | 16:9 | `public/images/campania-street.webp` | Unbranded naked street motorcycle, low angle, concrete tunnel, blue light |
| 6 | Campaña trail | 16:9 | `public/images/campania-trail.webp` | Unbranded dual-sport motorcycle, gravel road at dusk, blue sky gradient, dust in rim light |
| 7 | Entrega (conceptual) | 3:2 | Solo como concepto, no como cliente real | Hands receiving motorcycle keys, faces out of frame, dark showroom |
| 8 | Detalles mecánicos | 1:1 (serie de 4) | `public/images/detalle-*.webp` | Macro of a brake disc / chain / instrument cluster / LED headlight, blue reflections |
| 9 | Banners | 3:1 | `public/images/banner-*.webp` | Abstract speed light trails in blue over black with a motorcycle silhouette on one side |
| 10 | Apoyo de fichas | 16:9 | `public/images/apoyo-*.webp` | Empty dark studio cyclorama with blue floor glow, for compositing product photos |

Exportar en WebP calidad 80, máximo 2400 px de ancho.
