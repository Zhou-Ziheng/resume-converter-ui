import { Box, Text, Link, Container, Heading } from "@chakra-ui/react";

export default function PrivacyPolicy() {
  return (
    <Container maxW="container.md" py={8} mb={8}>
      <Heading as="h1" size="xl" mb={6}>
        Terms and Conditions
      </Heading>

      <Box marginBottom={5}>
        <Text as="b">1. Information We Collect:</Text>
        <Text>
          - When you use ATSify, we may collect personal information such as
          your name, email address, and resume files that you upload.
        </Text>
        <Text>
          - We may also collect information about your usage of the ATSify
          website and services, such as the type of browser you use, the pages
          you visit, and your IP address.
        </Text>
      </Box>

      <Box marginBottom={5}>
        <Text as="b">2. Use of Information:</Text>
        <Text>
          - We use the personal information we collect to provide and improve
          the ATSify services, including converting resumes into formats
          optimized for Applicant Tracking Systems.
        </Text>
        <Text>
          - We may also use your personal information to communicate with you,
          respond to your inquiries, and send you updates and promotional
          materials.
        </Text>
      </Box>

      <Box marginBottom={5}>
        <Text as="b">3. Sharing of Information:</Text>
        <Text>
          - We may share your personal information with third-party service
          providers who assist us in providing the ATSify services, such as
          hosting providers and analytics services.
        </Text>
        <Text>
          - We may also disclose your personal information if required to do so
          by law or if we believe that such disclosure is necessary to comply
          with legal obligations or protect our rights or the rights of others.
        </Text>
      </Box>

      <Box marginBottom={5}>
        <Text as="b">4. Data Security:</Text>
        <Text>
          - We take reasonable measures to protect the personal information we
          collect from unauthorized access, disclosure, alteration, or
          destruction.
        </Text>
        <Text>
          - However, no method of transmission over the internet or electronic
          storage is 100% secure, and we cannot guarantee the absolute security
          of your personal information.
        </Text>
      </Box>

      <Box marginBottom={5}>
        <Text as="b">5. Data Retention:</Text>
        <Text>
          - We do not store the resumes uploaded to ATSify. However, parsed data
          from resumes may be temporarily stored in the form of logs for the
          purpose of providing the ATSify services.
        </Text>
        <Text>
          - Parsed data stored in logs is kept for a limited period and is used
          solely for the purpose of improving the quality and functionality of
          the ATSify services.
        </Text>
      </Box>

      <Box marginBottom={5}>
        <Text as="b">6. Illegal Content:</Text>
        <Text>
          - You may not upload, transmit, or distribute any illegal content
          through ATSify. We reserve the right to remove any illegal content and
          to terminate the accounts of users who violate this provision.
        </Text>
      </Box>

      <Box marginBottom={5}>
        <Text as="b">7. Changes to this Privacy Policy:</Text>
        <Text>
          - We may update this Privacy Policy from time to time. Any changes
          will be posted on this page, and the updated Privacy Policy will
          become effective immediately upon posting.
        </Text>
      </Box>

      <Box>
        <Text as="b">8. Contact Us:</Text>
        <Text>
          - If you have any questions or concerns about this Privacy Policy,
          please contact us at{" "}
          <Link href="mailto:resume@pocket-sage.com" textDecoration="underline">
            resume@pocket-sage.com
          </Link>
          .
        </Text>
      </Box>
    </Container>
  );
}
