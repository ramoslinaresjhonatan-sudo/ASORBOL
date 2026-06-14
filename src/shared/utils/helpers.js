/**
 * Normaliza un arreglo de IDs o de objetos con .id a un arreglo plano de IDs.
 * Los serializadores DRF pueden devolver IDs primitivos u objetos; esto maneja ambos.
 */
export const normalizeIds = (arr) =>
  (arr || []).map(item => (typeof item === 'object' ? item.id : item))
