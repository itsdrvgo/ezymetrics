import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface Props {
    children?: React.ReactNode;
    preview: string;
    heading: string;
}

export default function Layout({ preview, heading, children }: Props) {
    return (
        <Html>
            <Preview>{preview}</Preview>

            <Tailwind>
                <Head />
                <Body className="font-sans">
                    <Container className="max-w-3xl bg-gray-200 p-5 py-8 md:p-10">
                        <div className="mb-10 bg-white p-5 md:p-10 md:py-8">
                            <Heading
                                as="h1"
                                className="mt-0 text-2xl md:text-3xl"
                            >
                                {heading}
                            </Heading>

                            <div>{children}</div>
                        </div>

                        <div>
                            <Heading as="h4" className="my-0 mb-1">
                                Need Support?
                            </Heading>
                            <p className="my-0 text-sm text-gray-800">
                                Feel free to email us if you have any questions,
                                comments or concerns. We&apos;re here to help!
                            </p>
                        </div>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
