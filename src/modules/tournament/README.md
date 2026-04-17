# Modulo tournament

Responsabilidad:
- Gestion administrativa del torneo para organizadores.
- Alta y seguimiento de torneos, pagos y reportes.

Paginas clave:
- `OrganizerDashboard.tsx`: panel de entrada para organizacion.
- `CreateTournament.tsx`: creacion de torneos.
- `ManageTournaments.tsx`: administracion de torneos existentes.
- `PaymentReport.tsx`: validacion y trazabilidad de pagos.
- `Tournament.tsx` y `TournamentDetail.tsx`: informacion general y detalle.

Criterios de mantenimiento:
- Evitar ambiguedad en estados administrativos (pagado, pendiente, rechazado).
- Mantener trazabilidad de acciones en reportes.
- Verificar consistencia de etiquetas en filtros, tablas y exportes.
