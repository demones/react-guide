import storeProd from './configureStore.prod';
import storeDev from './configureStore.dev';

export default process.env.NODE_ENV === 'production' ? storeProd : storeDev;
