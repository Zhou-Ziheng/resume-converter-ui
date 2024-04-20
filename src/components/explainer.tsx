import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";

const ExplainerCard = ({ title, text }: { title: string; text: string }) => {
  return (
    <Container>
      <Card
        bgColor="#00000040"
        transition="background-color 0.1s ease-in-out, transform 0.1s ease-in-out"
        height="100%"
        width="224px"
        _hover={{ bg: "#00000090", transform: "scale(1.05)" }}
      >
        <CardHeader>
          <Heading size="sm">{title}</Heading>
        </CardHeader>
        <CardBody>
          <Text fontSize="sm">{text}</Text>
        </CardBody>
      </Card>
    </Container>
  );
};
export const Explainer = () => {
  return (
    <Box display={"flex"}>
      <ExplainerCard
        title="Ease of Use"
        text="With ATSify, convert your resume in any format to LaTeX, in one click"
      />
      <ExplainerCard
        title="Data Security"
        text="Rest assured that your resume is not stored on our servers at all"
      />
      <ExplainerCard
        title="Unlimited Conversions"
        text="Because magic has no limits, so does ATSify. You can convert an infinite number of resumes"
      />
    </Box>
  );
};
