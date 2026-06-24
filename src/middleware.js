// src/middleware.js
export const onRequest = async (context, next) => {
  // 1. Definir qué rutas proteger (todo lo que empiece por /admin)
  const isProtected = context.url.pathname.startsWith('/admin/');

  if (isProtected) {
    // 2. Obtener la cabecera de autenticación que envía el navegador
    const authHeader = context.request.headers.get('authorization');

    if (authHeader) {
      // 3. Decodificar usuario:password (vienen en base64 "Basic cmFuZG9t...")
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = atob(base64Credentials); // Decodifica base64
      const [username, password] = credentials.split(':');

      // 4. VERIFICACIÓN: Comparar con tus variables de entorno
      // Ojo: import.meta.env funciona diferente dependiendo de tu adaptador (Node/Vercel)
      // Si usas 'server' output, esto es lo estándar:
      const validUser = import.meta.env.ADMIN_USER; 
      const validPass = import.meta.env.ADMIN_PASSWORD;

      if (username === validUser && password === validPass) {
        // ¡Login correcto! Deja pasar al usuario a la página
        return next();
      }
    }

    // 5. Si no hay cabecera o la clave es incorrecta, RECHAZAR y pedir login
    return new Response('Acceso denegado: Credenciales incorrectas', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Área Privada de Comerciales"',
      },
    });
  }

  // Si no es ruta protegida, dejar pasar normal
  return next();
};