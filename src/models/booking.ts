// Знакомый контракт карточки из практики 2–2. Его используют клиент и сервер.
export type BookingStatus = 'new' | 'confirmed'
export interface Booking {
  id: string
  name: string
  seats: number
  status: BookingStatus
  source: 'web'
}
export interface NewBooking { name: string; seats: number }

export function initialBookings(): Booking[] {
  return [
    { id: 'b1', name: 'Анна', seats: 1, status: 'confirmed', source: 'web' },
    { id: 'b2', name: 'Иван', seats: 1, status: 'new', source: 'web' },
  ]
}

// Готово: тип TypeScript не проверяет JSON. Эта проверка защищает чтение файла.
export function isBookingArray(value: unknown): value is Booking[] {
  if (!Array.isArray(value)) return false
  const ids = new Set<string>()
  return value.every((item: unknown) => {
    if (typeof item !== 'object' || item === null) return false
    const row = item as Record<string, unknown>
    if (typeof row.id !== 'string' || !row.id || ids.has(row.id)) return false
    ids.add(row.id)
    return typeof row.name === 'string' && row.name.trim() !== '' &&
      typeof row.seats === 'number' && Number.isInteger(row.seats) &&
      row.seats >= 1 && row.seats <= 5 &&
      (row.status === 'new' || row.status === 'confirmed') && row.source === 'web'
  })
}
