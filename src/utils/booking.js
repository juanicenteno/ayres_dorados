/**
 * Generates the external booking engine URL for Ayres Dorados.
 * 
 * @param {Object} options
 * @param {string} [options.locale="es"] - The current language/locale (e.g. 'es', 'en', 'pt').
 * @param {string} [options.hotelId="3176"] - The hotel ID in the booking system (Default: 3176).
 * @param {string} [options.roomId="12899"] - Optional room ID (Default: 12899 - Doble estándar).
 * @param {string} [options.checkin=""] - Optional check-in date (YYYY-MM-DD).
 * @param {string} [options.checkout=""] - Optional check-out date (YYYY-MM-DD).
 * @param {number} [options.adults=0] - Optional number of adults.
 * @param {number} [options.children=0] - Optional number of children.
 * @returns {string} The fully qualified booking engine URL.
 */
export function getBookingUrl({
  locale = "es",
  hotelId = "3176",
  roomId = "12899",
  checkin = "",
  checkout = "",
  adults = 0,
  children = 0,
  targetHash = "buscadorHorizontal"
} = {}) {
  const params = new URLSearchParams({
    idHotel: hotelId,
    forzarLimpiar: "true"
  });

  if (roomId) {
    params.append("idHabitacion", roomId);
  }
  if (checkin) {
    params.append("fechaDesde", checkin);
  }
  if (checkout) {
    params.append("fechaHasta", checkout);
  }
  if (adults > 0) {
    params.append("adultos", adults.toString());
  }
  if (children > 0) {
    params.append("ninios", children.toString());
  }

  const lang = locale || "es";
  const hash = targetHash ? `#${targetHash.replace(/^#/, '')}` : "";

  return `https://www.todoalojamiento.com/portal/${lang}?${params.toString()}${hash}`;
}

