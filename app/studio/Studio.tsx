"use client";

import { NextStudio, NextStudioLayout } from "next-sanity/studio";
import config from "../../studio/sanity.config";

export default function Studio() {
  return (
    <NextStudioLayout>
      <NextStudio config={config} />
    </NextStudioLayout>
  );
}
