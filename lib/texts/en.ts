export const en = {
  typeWritter: {
    title: 'Con Bitacorizky',
    subtitle1: 'Descubre un espacio seguro para expresar tus pensamientos y emociones.',
    subtitle2: 'Registra tus experiencias diarias desde cualquier lugar del mundo.',
    subtitle3: 'Guarda la ubicación de tus escritos y observa tu viaje a lo largo del tiempo.',
    subtitle4: 'Haz lo simple: escribe lo que sientes',
  },
  login: {
    title: 'Log in para poder acceder',
    subtitle: {
      first: 'O puedes ',
      second: 'crearte una cuenta',
    },
    form: {
      subtitle: 'Or continue with',
      emailPlaceholder: 'name@example.com',
      passwordPlaceholder: 'Password',
      provider: {
        google: 'Google',
        facebook: 'Facebook',
      },
      toast: {
        error: 'Uh oh! Algo salió mal.',
        server: 'Error al enviar la sugerencia:',
      },
      button: 'Login',
    },
  },
  register: {
    title: ' Crea una cuenta para poder acceder',
    subtitle: {
      first: 'O puedes ',
      second: 'loguearte con tu cuenta',
    },
    form: {
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'name@example.com',
      passwordPlaceholder: 'Password',
      toast: {
        server: 'Error al enviar la sugerencia:',
      },
      button: 'Crear Cuenta',
    },
  },
  home: {
    title: 'Mis Escritos',
    button: 'Write',
    emptyState: {
      subtitle: 'No tienes escritos',
      linkTo: 'Comenza a escribir',
    },
  },
  write: {
    errors: {
      contentError: 'El contenido es requerido',
      titleError: 'El título es requerido',
      paragraphError: 'El párrafo es requerido',
    },
    toast: {
      error: 'Error al obtener la ubicación',
      description: 'Geolocalización no soportada en este dispositivo',
      imageSuccess: '¡La imagen se cargó correctamente!',
      imageServer: 'Hubo un error al cargar la imagen',
      writeSuccess: '¡El escrito se guardó correctamente!',
      writeServer: 'Hubo error en la conexion',
      validate: 'Hubo error en la validación del contenido',
    },
    button: 'Save',
    tiptap: {
      title: 'Title',
      paragraph: 'Write what you feel',
    },
  },
  writes: {
    near: 'Near ',
    tooltip: 'Share',
    error: {
      location: 'Error al obtener la ubicación',
      image: 'No se encontró el elemento con el ID',
    },
    downloadImage: {
      title: 'Compartir Escrito',
      button: 'Descargar',
    },
  },
  navbar: {
    greeting: {
      morning: 'Good días',
      afternoon: 'Good tardes',
      nigth: 'Good noches',
    },
    dropdown: {
      theme: {
        light: 'Light',
        dark: 'Dark',
      },
      feedback: 'Feedback',
      logout: 'Logout',
    },
  },
  feedback: {
    title: 'Danos tu opinión!',
    placeholder: 'Escribe tu sugerencia aquí',
    button: 'Send',
    toast: {
      success: '¡Sugerencia enviada exitosamente!',
      error: 'Error al enviar la sugerencia:',
    },
  },
  footer: {
    createdBy: 'Created by ',
    name: 'Izky',
  },
  errorPage: {
    title: 'Ops!',
    subtitle: 'Algo salio mal,prueba refrescando la pagina',
  },
  notFoundPage: {
    title: 'Acá no hay nada',
    button: 'Volver a Inicio',
  },
  metadata: {
    title: 'Bitacorikzy',
    template: '%s | Bitacorikzy',
    description:
      'Sitio web para escribir y guardar tus pensamientos, ideas y reflexiones personales. Regístrate y comienza a plasmar tus pensamientos en Bitacorizky.',
    descriptionShort:
      'Sitio web para escribir y guardar tus pensamientos, ideas y reflexiones personales',
    author: {
      name: 'Izky',
      url: 'https://izky.dev/',
    },
    keywords: ['Bitacorizky', 'Bitacora', 'fast writting', 'personal diary'],
    url: 'https://www.bitacorizky.com/',
  },
  validations: {
    register: {
      name: {
        min: 'El nombre no puede estar vacío',
        max: 'Maximo 25 caracteres',
      },
      email: {
        min: 'El email no puede estar vacío',
        valid: 'El email debe tener un formato válido',
      },
      password: {
        min: 'La contraseña debe tener al menos 6 caracteres',
      },
    },
    firebaseError: {
      user: 'Firebase: Error (auth/user-not-found).',
      password: 'Firebase: Error (auth/wrong-password).',
    },
  },
  logModal: {
    title: 'Changelog',
    subtitle: 'Últimos cambios de Bitacorizky y anuncios',
    changeLog: {
      title: 'Enero 2024 - First Release',
      subtitle: 'Salió Bitacorizky con sus primeras features:',
      list: [
        'Loguearte con Google y Facebook o crear tu propio usuario',
        'Permitir guardar la ubicacion cuando escribis',
        'Poder subir una imagen cuando escribis',
        'Poder descargar una imagen del escrito cuando lo terminas',
        'Cambiar tema claro/oscuro',
      ],
    },
  },
};
