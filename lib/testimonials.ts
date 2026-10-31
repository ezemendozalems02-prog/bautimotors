/**
 * Entregas y testimonios reales. HOY NO HAY NINGUNO CARGADO.
 * Cargar solo casos reales, con autorización escrita de la persona para publicar
 * su nombre, su testimonio y su foto. Las fotos van en /public/entregas.
 */
export interface Delivery {
  id: string
  /** Nombre autorizado por la persona. */
  customer: string
  moto: string
  image: string
  orientation: 'vertical' | 'horizontal'
  quote?: string
}

export const deliveries: Delivery[] = []
