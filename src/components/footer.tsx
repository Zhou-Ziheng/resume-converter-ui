"use client";

import {
  Text,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";

const Footer = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <footer style={{ position: "absolute", bottom: 0, width: "100%" }}>
      <Box margin="4" display="flex" flexDirection="column">
        <Text fontSize="sm" color="#FFFFFF77" textAlign="center">
          © 2024 ATSify
        </Text>
        <Text fontSize="xs" color="#FFFFFF77" textAlign="center">
          By using ATSify, you agree to our{" "}
          <u onClick={() => setIsTermsOpen(true)}>Terms of Service</u> and{" "}
          <u onClick={() => setIsPrivacyOpen(true)}>Privacy Policy</u>
        </Text>
      </Box>
      <Drawer
        placement="bottom"
        onClose={() => setIsTermsOpen(false)}
        isOpen={isTermsOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader marginLeft={5} marginTop={5} marginRight={5}>
            Terms and Conditions
          </DrawerHeader>
          <DrawerBody display="flex" flexDirection="column" gap={2} margin={5}>
            <Text>
              1. <b>Acceptance of Terms</b>: By accessing or using the ATSify
              website or services, you agree to be bound by these Terms and
              Conditions, our Privacy Policy, and any additional terms and
              conditions that may apply to specific features or services.
            </Text>

            <Text>
              2. <b>Description of Service</b>: ATSify provides a service that
              allows users to upload their resumes in various formats (such as
              PDF, DOC, DOCX) to be converted into formats optimized for
              Applicant Tracking Systems (ATS).
            </Text>

            <Text>
              3. <b>Use of Service</b>: You agree to use the ATSify service only
              for lawful purposes and in accordance with these Terms and
              Conditions. You may not use the service to upload any content that
              is illegal, obscene, defamatory, or violates any third-party
              rights.
            </Text>

            <Text>
              4. <b>User Accounts</b>: You may be required to create a user
              account to access certain features of the ATSify service. You are
              responsible for maintaining the confidentiality of your account
              credentials and for any activity that occurs under your account.
            </Text>

            <Text>
              5. <b>Privacy</b>: Your privacy is important to us. Please review
              our Privacy Policy to understand how we collect, use, and disclose
              your personal information.
            </Text>

            <Text>
              6. <b>Intellectual Property</b>: All content and materials
              provided through the ATSify service, including the converted
              resumes, are owned by ATSify or its licensors and are protected by
              copyright and other intellectual property laws.
            </Text>

            <Text>
              7. <b>Illegal Content</b>: You may not upload, transmit, or
              distribute any content that is illegal, including but not limited
              to content that infringes upon copyrights, trademarks, or other
              intellectual property rights, or that violates any applicable laws
              or regulations. ATSify reserves the right to remove any illegal
              content and to terminate the accounts of users who violate this
              provision.
            </Text>

            <Text>
              8. <b>Disclaimer of Warranties</b>: The ATSify service is provided
              on an &quot;as is&quot; and &quot;as available&quot; basis,
              without any warranties of any kind, either express or implied.
              ATSify makes no representations or warranties regarding the
              accuracy, reliability, or completeness of the service or any
              content or materials provided through the service.
            </Text>

            <Text>
              9. <b>Limitation of Liability</b>: To the fullest extent permitted
              by law, ATSify shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of or
              relating to your use of the service or any content or materials
              provided through the service.
            </Text>

            <Text>
              10. <b>Indemnification</b>: You agree to indemnify and hold
              harmless ATSify, its officers, directors, employees, agents, and
              affiliates from and against any and all claims, liabilities,
              damages, losses, costs, or expenses arising out of or relating to
              your use of the service or any violation of these Terms and
              Conditions.
            </Text>

            <Text>
              11. <b>Changes to Terms and Conditions</b>: ATSify reserves the
              right to modify or revise these Terms and Conditions at any time,
              with or without notice. Your continued use of the service
              following any such changes constitutes your acceptance of the
              revised Terms and Conditions.
            </Text>

            <Text>
              12. <b>Governing Law</b>: These Terms and Conditions shall be
              governed by and construed in accordance with the laws of Canada,
              without regard to its conflict of laws principles.
            </Text>

            <Text>
              13. <b>Contact Information</b>: If you have any questions or
              concerns about these Terms and Conditions, please contact us at{" "}
              <a href="mailto:resume@pocket-sage.com">resume@pocket-sage.com</a>
            </Text>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Drawer
        placement="bottom"
        onClose={() => setIsPrivacyOpen(false)}
        isOpen={isPrivacyOpen}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader marginLeft={5} marginTop={5} marginRight={5}>
            Privacy Policy
          </DrawerHeader>
          <DrawerBody display="flex" flexDirection="column" gap={2} margin={5}>
            <Box>
              <Text>
                1. <b>Information We Collect</b>:
              </Text>
              <Text>
                {" "}
                - When you use ATSify, we may collect personal information such
                as your name, email address, and resume files that you upload.
              </Text>
              <Text>
                {" "}
                - We may also collect information about your usage of the ATSify
                website and services, such as the type of browser you use, the
                pages you visit, and your IP address.
              </Text>
            </Box>
            <Box>
              <Text>
                2. <b>Use of Information</b>:
              </Text>
              <Text>
                {" "}
                - We use the personal information we collect to provide and
                improve the ATSify services, including converting resumes into
                formats optimized for Applicant Tracking Systems.
              </Text>
              <Text>
                {" "}
                - We may also use your personal information to communicate with
                you, respond to your inquiries, and send you updates and
                promotional materials.
              </Text>
            </Box>
            <Box>
              <Text>
                3. <b>Sharing of Information</b>:
              </Text>
              <Text>
                {" "}
                - We may share your personal information with third-party
                service providers who assist us in providing the ATSify
                services, such as hosting providers and analytics services.
              </Text>
              <Text>
                {" "}
                - We may also disclose your personal information if required to
                do so by law or if we believe that such disclosure is necessary
                to comply with legal obligations or protect our rights or the
                rights of others.
              </Text>
            </Box>
            <Box>
              <Text>
                4. <b>Data Security</b>:
              </Text>
              <Text>
                {" "}
                - We take reasonable measures to protect the personal
                information we collect from unauthorized access, disclosure,
                alteration, or destruction.
              </Text>
              <Text>
                {" "}
                - However, no method of transmission over the internet or
                electronic storage is 100% secure, and we cannot guarantee the
                absolute security of your personal information.
              </Text>
            </Box>
            <Box>
              <Text>
                5. <b>Data Retention</b>:
              </Text>
              <Text>
                {" "}
                - We do not store the resumes uploaded to ATSify. However,
                parsed data from resumes may be temporarily stored in the form
                of logs for the purpose of providing the ATSify services.
              </Text>
              <Text>
                {" "}
                - Parsed data stored in logs is kept for a limited period and is
                used solely for the purpose of improving the quality and
                functionality of the ATSify services.
              </Text>
            </Box>
            <Box>
              <Text>
                6. <b>Illegal Content</b>:
              </Text>
              <Text>
                {" "}
                - You may not upload, transmit, or distribute any illegal
                content through ATSify. We reserve the right to remove any
                illegal content and to terminate the accounts of users who
                violate this provision.
              </Text>
            </Box>
            <Box>
              <Text>
                7. <b>Changes to this Privacy Policy</b>:
              </Text>
              <Text>
                {" "}
                - We may update this Privacy Policy from time to time. Any
                changes will be posted on this page, and the updated Privacy
                Policy will become effective immediately upon posting.
              </Text>
            </Box>
            <Box>
              <Text>
                8. <b>Contact Us</b>:
              </Text>
              <Text>
                {" "}
                - If you have any questions or concerns about this Privacy
                Policy, please contact us at{" "}
                <a href="mailto:resume@pocket-sage.com">
                  resume@pocket-sage.com
                </a>
                .
              </Text>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </footer>
  );
};

export default Footer;
