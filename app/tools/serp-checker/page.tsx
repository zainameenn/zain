import { editorialRoute } from "../_studio/editorialRoute";

const route = editorialRoute("serp-checker");
export const generateMetadata = route.generateMetadata;
export default route.Page;
