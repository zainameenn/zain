import { editorialRoute } from "../_studio/editorialRoute";

const route = editorialRoute("keyword-difficulty-checker");
export const generateMetadata = route.generateMetadata;
export default route.Page;
