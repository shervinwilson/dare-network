import type { Metadata } from "next";
import { metadata as studioMetadata, viewport } from "next-sanity/studio";
import Studio from "../Studio";
import styles from "../studio.module.css";

export { viewport };

export const metadata: Metadata = {
  ...studioMetadata,
  title: "Dare Network Studio",
};

export default function StudioPage() {
  return (
    <main className={styles.studio}>
      <Studio />
    </main>
  );
}
