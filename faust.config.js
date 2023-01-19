import { setConfig } from "@faustwp/core";
import templates from "./wp-templates";
import possibleTypes from "possibleTypes";

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/

export default setConfig({
  templates,
  experimentalPlugins: [],
  possibleTypes,
});
