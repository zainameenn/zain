import { editorialRoute } from "../_studio/editorialRoute";

const route = editorialRoute("seo-question-generator");
export const generateMetadata = route.generateMetadata;
export default route.Page;
