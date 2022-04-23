import generateIndex from './generators/generateIndex.hbs';
import generateRoutes from './generators/generateRoutes.hbs';
import generateTsConfig from './generators/generateTsConfig.hbs';
import { AppRouteParsed } from './parseAppRoutes';

export const generateAppCode = (routes: AppRouteParsed[] ) => {
  return {
    index: generateIndex(),
    routes: generateRoutes({routes}),
    tsconfig: generateTsConfig()
  }
}