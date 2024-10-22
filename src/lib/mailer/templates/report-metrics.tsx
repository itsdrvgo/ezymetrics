import * as React from "react";
import Layout from "./layout";

interface Props {
    name: string;
}

export function ReportMetric({ name }: Props) {
    return (
        <Layout
            preview="Report of metrics generated"
            heading="Report of metrics generated"
        >
            <p>Hey {name},</p>

            <p>
                Your request for a report of metrics generated has been
                processed. Download the report from the attached file.
            </p>
        </Layout>
    );
}
