/**
 * A simple javascript utility for joining classNames together
 * @param {string[]} classes A list of classNames
 * @returns A combined string of classNames
 */
function classNames(classes) {
  return classes.filter(Boolean).join(" ");
}

export default classNames;
