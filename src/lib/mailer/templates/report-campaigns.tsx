import * as React from "react";
import Layout from "./layout";

interface Props {
    name: string;
}

export function ReportCampaigns({ name }: Props) {
    return (
        <Layout
            preview="Report of campaigns generated"
            heading="Report of campaigns generated"
        >
            <p>Hey {name},</p>

            <p>
                Your request for a report of campaigns generated has been
                processed. Download the report from the attached file.
            </p>
        </Layout>
    );
}
