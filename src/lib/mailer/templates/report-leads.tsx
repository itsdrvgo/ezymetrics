import * as React from "react";
import Layout from "./layout";

interface Props {
    name: string;
}

export function ReportLeads({ name }: Props) {
    return (
        <Layout
            preview="Report of leads generated"
            heading="Report of leads generated"
        >
            <p>Hey {name},</p>

            <p>
                Your request for a report of leads generated has been processed.
                Download the report from the attached file.
            </p>
        </Layout>
    );
}
