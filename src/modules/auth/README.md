# Modulo auth

Responsabilidad:
- Gestionar acceso de usuarios (inicio, registro, recuperacion).
- Presentar la landing publica de TECHCUP.

Paginas clave:
- `LandingPage.tsx`: portada y mensaje institucional.
- `Login.tsx`: autenticacion y flujo de recuperacion.
- `Register.tsx`: alta de usuario y validaciones de formulario.

Criterios de mantenimiento:
- Mantener mensajes claros y consistentes en espanol.
- Evitar logica de negocio compleja en UI; delegar a servicios cuando existan.
- Priorizar accesibilidad en formularios (labels, errores, foco).
