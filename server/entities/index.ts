import Employee from "./Employee";
import Sale from "./Sale";
import Location from "./Location";

export {default as Sale} from './Sale';
export {default as Location} from './Location';
export {default as Employee} from './Employee';

export const APP_ENTITIES = [Sale, Location, Employee]
