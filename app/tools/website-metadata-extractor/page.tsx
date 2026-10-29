import { editorialRoute } from "../_studio/editorialRoute";

const route = editorialRoute("website-metadata-extractor");
export const generateMetadata = route.generateMetadata;
export default route.Page;
