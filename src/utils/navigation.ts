
/**
 * Opens a route in a new browser tab
 * @param route The route to open
 */
export const openInNewTab = (route: string) => {
  // Ensure route starts with a slash
  const formattedRoute = route.startsWith('/') ? route : `/${route}`;
  
  // Get the base URL from the current window location
  const baseUrl = window.location.origin;
  
  // Combine and open in new tab
  window.open(`${baseUrl}${formattedRoute}`, '_blank');
};
