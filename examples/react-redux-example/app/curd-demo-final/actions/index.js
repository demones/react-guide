import * as personActions from './person';
import * as tabActions from './tab';

//const curdActions = assign({}, personActions, tabActions);

const curdActions = {...personActions, ...tabActions};

export default curdActions;


