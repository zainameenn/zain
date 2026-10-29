import { editorialRoute } from "../_studio/editorialRoute";

const route = editorialRoute("broken-link-checker");
export const generateMetadata = route.generateMetadata;
export default route.Page;
