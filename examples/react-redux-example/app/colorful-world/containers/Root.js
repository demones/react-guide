import RootProd from './Root.prod';
import RootDev from './Root.dev';

export default process.env.NODE_ENV === 'production' ? RootProd : RootDev;
