import { Container, Text, Box, Heading, Link } from "@chakra-ui/react";

export default function TermsAndConditions() {
  return (
    <Container maxW="container.md" py={8} mb={8}>
      <Heading as="h1" size="xl" mb={6}>
        Terms and Conditions
      </Heading>

      <Box mb={4}>
        <Text as="b">1. Acceptance of Terms</Text>: By accessing or using the
        ATSify website or services, you agree to be bound by these Terms and
        Conditions, our Privacy Policy, and any additional terms and conditions
        that may apply to specific features or services.
      </Box>

      <Box mb={4}>
        <Text as="b">2. Description of Service</Text>: ATSify provides a service
        that allows users to upload their resumes in various formats (such as
        PDF, DOC, DOCX) to be converted into formats optimized for Applicant
        Tracking Systems (ATS).
      </Box>

      <Box mb={4}>
        <Text as="b">3. Use of Service</Text>: You agree to use the ATSify
        service only for lawful purposes and in accordance with these Terms and
        Conditions. You may not use the service to upload any content that is
        illegal, obscene, defamatory, or violates any third-party rights.
      </Box>

      <Box mb={4}>
        <Text as="b">4. User Accounts</Text>: You may be required to create a
        user account to access certain features of the ATSify service. You are
        responsible for maintaining the confidentiality of your account
        credentials and for any activity that occurs under your account.
      </Box>

      <Box mb={4}>
        <Text as="b">5. Privacy</Text>: Your privacy is important to us. Please
        review our Privacy Policy to understand how we collect, use, and
        disclose your personal information.
      </Box>

      <Box mb={4}>
        <Text as="b">6. Intellectual Property</Text>: All content and materials
        provided through the ATSify service, including the converted resumes,
        are owned by ATSify or its licensors and are protected by copyright and
        other intellectual property laws.
      </Box>

      <Box mb={4}>
        <Text as="b">7. Illegal Content</Text>: You may not upload, transmit, or
        distribute any content that is illegal, including but not limited to
        content that infringes upon copyrights, trademarks, or other
        intellectual property rights, or that violates any applicable laws or
        regulations. ATSify reserves the right to remove any illegal content and
        to terminate the accounts of users who violate this provision.
      </Box>

      <Box mb={4}>
        <Text as="b">8. Disclaimer of Warranties</Text>: The ATSify service is
        provided on an &quot;as is&quot; and &quot;as available&quot; basis,
        without any warranties of any kind, either express or implied. ATSify
        makes no representations or warranties regarding the accuracy,
        reliability, or completeness of the service or any content or materials
        provided through the service.
      </Box>

      <Box mb={4}>
        <Text as="b">9. Limitation of Liability</Text>: To the fullest extent
        permitted by law, ATSify shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages arising out of
        or relating to your use of the service or any content or materials
        provided through the service.
      </Box>

      <Box mb={4}>
        <Text as="b">10. Indemnification</Text>: You agree to indemnify and hold
        harmless ATSify, its officers, directors, employees, agents, and
        affiliates from and against any and all claims, liabilities, damages,
        losses, costs, or expenses arising out of or relating to your use of the
        service or any violation of these Terms and Conditions.
      </Box>

      <Box mb={4}>
        <Text as="b">11. Changes to Terms and Conditions</Text>: ATSify reserves
        the right to modify or revise these Terms and Conditions at any time,
        with or without notice. Your continued use of the service following any
        such changes constitutes your acceptance of the revised Terms and
        Conditions.
      </Box>

      <Box mb={4}>
        <Text as="b">12. Governing Law</Text>: These Terms and Conditions shall
        be governed by and construed in accordance with the laws of Canada,
        without regard to its conflict of laws principles.
      </Box>

      <Box mb={4}>
        <Text as="b">13. Contact Information</Text>: If you have any questions
        or concerns about these Terms and Conditions, please contact us at{" "}
        <Link href="mailto:resume@pocket-sage.com" textDecoration="underline">
          resume@pocket-sage.com
        </Link>
        .
      </Box>
    </Container>
  );
}
