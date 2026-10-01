# Misión TurboMente: ranking global

El ranking es compartido entre dispositivos cuando todos abren la aplicación desde el **mismo servidor HTTPS**. La PWA por sí sola no puede sincronizar jugadores, y abrir `index.html` directamente como `file://` solo permite jugar sin consultar la clasificación.

## Ejecutar el servidor

Necesitas Node.js 20 o posterior. Desde esta carpeta, inicia el sitio y el servicio de puntajes:

```sh
npm start
```

Se abre en `http://localhost:3000`. El ranking se guarda en `data/leaderboard.json`; configura `TURBOMENTE_DATA_DIR` para elegir otra carpeta persistente y `PORT` para cambiar el puerto. No hay dependencias externas, cuentas, pagos ni llamadas a servicios de terceros.

Para que compitan amigos en otros lugares, publica esta carpeta en un solo servidor Node.js con HTTPS y almacenamiento persistente para esa carpeta. **Todos deben utilizar exactamente la misma dirección y la misma instancia**: el archivo JSON no coordina varias instancias. En plataformas con disco temporal, desconectar el servidor o cambiar de instancia puede borrar la clasificación. Mantén una copia de seguridad del archivo de datos; no tiene una opción automática de exportación o borrado desde la app.

## Apodos y privacidad

El registro se limita a un apodo de 3–16 caracteres: letras ASCII, números y `_`. Se comparan sin distinguir mayúsculas, por lo que cada apodo solo se puede registrar una vez en esa instalación del ranking. No se piden nombre real, edad, correo, teléfono, ubicación ni contraseña. Los apodos y puntajes se publican en una lista accesible para los demás jugadores; pide autorización familiar y no reutilices un nombre de usuario personal. No se guardan direcciones IP ni horarios de juego. El servidor mantiene una clave aleatoria por apodo para impedir que otros jugadores suplanten ese perfil; la clave solo se almacena en el dispositivo que hizo el registro. Si se borra el almacenamiento del navegador, se pierde el acceso de escritura a ese apodo: no hay recuperación por correo ni cambio de apodo automático. Los puntajes se almacenan hasta que la familia que administra el servidor borre el archivo del ranking.

El servicio no almacena direcciones IP, pero el proveedor de alojamiento o el proxy HTTPS podría guardar registros de conexión por separado. Revisa su configuración y política de retención antes de abrir la clasificación al público.

El puntaje global es la suma de la mejor puntuación local de cada ruta completada. Este es un prototipo amistoso, **no un sistema antitrampas**: el servidor limita puntajes improbables, pero no puede verificar desde qué cliente se completó una partida. No uses la clasificación para premios, dinero ni competiciones oficiales.
