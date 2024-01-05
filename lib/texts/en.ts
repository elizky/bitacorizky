export const en = {
  typeWritter: {
    title: 'With Bitacorizky',
    subtitle1: 'Discover a safe space to express your thoughts and emotions.',
    subtitle2: 'Record your daily experiences from anywhere in the world.',
    subtitle3: 'Save the location of your writings and observe your journey over time.',
    subtitle4: 'Keep it simple: write what you feel',
  },
  login: {
    title: 'Log in to access',
    subtitle: {
      first: 'Or you can ',
      second: 'create an account',
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
        error: 'Uh oh! Something went wrong.',
        server: 'Error sending suggestion:',
      },
      button: 'Login',
    },
  },
  register: {
    title: 'Create an account to access',
    subtitle: {
      first: 'Or you can ',
      second: 'log in with your account',
    },
    form: {
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'name@example.com',
      passwordPlaceholder: 'Password',
      toast: {
        server: 'Error sending suggestion:',
      },
      button: 'Create Account',
    },
  },
  home: {
    title: 'My Writings',
    button: 'Write',
    emptyState: {
      subtitle: 'You have no writings',
      linkTo: 'Start writing',
    },
    goTo: 'Read'
  },
  write: {
    errors: {
      contentError: 'Content is required',
      titleError: 'Title is required',
      paragraphError: 'Paragraph is required',
    },
    toast: {
      error: 'Error getting location',
      description: 'Geolocation not supported on this device',
      imageSuccess: 'The image was uploaded successfully!',
      imageServer: 'There was an error uploading the image',
      writeSuccess: 'The writing was saved successfully!',
      writeServer: 'There was an error in the connection',
      validate: 'There was an error in content validation',
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
      location: 'Error getting location',
      image: 'Element with ID not found',
    },
    downloadImage: {
      title: 'Share Writing',
      button: 'Download',
    },
  },
  navbar: {
    greeting: {
      morning: 'Good morning',
      afternoon: 'Good afternoon',
      night: 'Good night',
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
    title: 'Give us your feedback!',
    placeholder: 'Write your suggestion here',
    button: 'Send',
    toast: {
      success: 'Suggestion sent successfully!',
      error: 'Error sending suggestion:',
    },
  },
  footer: {
    createdBy: 'Created by ',
    name: 'Izky',
  },
  errorPage: {
    title: 'Oops!',
    subtitle: 'Something went wrong, try refreshing the page',
  },
  notFoundPage: {
    title: "There's nothing here",
    button: 'Back to Home',
  },
  metadata: {
    title: 'Bitacorikzy',
    template: '%s | Bitacorikzy',
    description:
      'Website to write and save your thoughts, ideas, and personal reflections. Register and start expressing your thoughts on Bitacorizky.',
    descriptionShort: 'Website to write and save your thoughts, ideas, and personal reflections',
    author: {
      name: 'Izky',
      url: 'https://izky.dev/',
    },
    keywords: ['Bitacorizky', 'Journal', 'fast writing', 'personal diary'],
    url: 'https://www.bitacorizky.com/',
  },
  validations: {
    register: {
      name: {
        min: 'Name cannot be empty',
        max: 'Maximum 25 characters',
      },
      email: {
        min: 'Email cannot be empty',
        valid: 'Email must have a valid format',
      },
      password: {
        min: 'Password must be at least 6 characters',
      },
    },
    firebaseError: {
      user: 'Firebase: Error (auth/user-not-found).',
      password: 'Firebase: Error (auth/wrong-password).',
    },
  },
  logModal: {
    title: 'Changelog',
    subtitle: 'Latest changes to Bitacorizky and announcements',
    changeLog: {
      title: 'January 2024 - First Release',
      subtitle: 'Bitacorizky is out 🚀 with its first features:',
      list: [
        'Log in with Google and Facebook or create your own user',
        'Allow saving location when writing',
        'Upload an image when writing',
        'Download an image from the writing when finished',
        'Switch between light/dark themes',
      ],
    },
  },
};
