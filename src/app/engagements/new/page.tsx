import type { Metadata } from "next";

import { EnquiryScopeWorkspace } from "@/components/enquiry-scope-workspace";

export const metadata: Metadata = { title: "Scope a partner enquiry" };

export default function NewEnquiryPage() {
  return <EnquiryScopeWorkspace />;
}
