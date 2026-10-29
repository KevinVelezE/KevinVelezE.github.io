export const profile: {
  name: string;
  email: string;
  githubUrl: string;
  introduction: string;
  background: string[];
} = {
  name: 'Kevin Vélez Escarria',
  email: 'velez.kevin@correounivalle.edu.co',
  githubUrl: 'https://github.com/KevinVelezE',
  introduction: 'I am a mathematician from Universidad del Valle, Colombia, interested in graduate study and mathematical research. My interests connect Fourier analysis, inverse problems and scientific computing.',
  background: [
    'Mathematician — Universidad del Valle, Colombia.',
    'Technologist in Electronics — Universidad del Valle, Colombia.',
  ],
};

type SelectedWork = {
  title: string;
  kind: 'Undergraduate thesis' | 'Extended abstract';
  description: string;
  authors: string[];
  language: 'English' | 'Spanish';
  pdfUrl?: string;
  explorer?: {
    title: string;
    description: string;
    demoUrl: string;
    sourceUrl: string;
  };
};

export const selectedWorks: SelectedWork[] = [
  {
    title: 'Filtered backprojection in tomographic reconstruction',
    kind: 'Undergraduate thesis',
    description: 'A theoretical and computational study of two-dimensional reconstruction through the Radon transform and filtered backprojection, including numerical experiments on reconstruction filters and sensitivity to noise. Supervised by Julio Delgado.',
    authors: ['Kevin Vélez Escarria'],
    language: 'Spanish',
    pdfUrl: 'https://github.com/KevinVelezE/KevinVelezE/blob/main/papers/tesis.pdf',
    explorer: {
      title: 'Interactive tomography explorer',
      description: 'Explore projections, filtered backprojection, and the tradeoff between detail and noise through reproducible browser experiments.',
      demoUrl: 'https://kevinveleze.github.io/tomography-explorer/',
      sourceUrl: 'https://github.com/KevinVelezE/tomography-explorer',
    },
  },
  {
    title: 'Filter Functions for Reconstruction Algorithms',
    kind: 'Extended abstract',
    description: 'Fourier multiplier symbols and their role in reconstruction algorithms, supported by numerical simulations and scientific figures prepared for a presentation at the Fourth Colombian Conference on Applied and Industrial Mathematics (MAPI 4), Icesi University, Cali, Colombia, June 2–5, 2026.',
    authors: ['Kevin Velez', 'Juan Lopez'],
    language: 'English',
    pdfUrl: 'https://github.com/KevinVelezE/KevinVelezE/blob/main/papers/mapi4-abstract.pdf',
  },
];
