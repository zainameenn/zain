import { editorialRoute } from "../_studio/editorialRoute";

const route = editorialRoute("sitemap-url-status-checker");
export const generateMetadata = route.generateMetadata;
export default route.Page;
