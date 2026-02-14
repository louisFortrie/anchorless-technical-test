import type { Route } from "./+types/home";
import {HomePage} from "../Components/HomePage";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Anchorless file uploader" },
    { name: "description", content: "Upload your files to anchorless" },
  ];
}

export default function Home() {
  return <HomePage />;
}
