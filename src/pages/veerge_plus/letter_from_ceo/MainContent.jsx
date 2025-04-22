import {Box, Flex, Stack, Text} from '@chakra-ui/react';
import Link from 'next/link';
import React, {useRef} from 'react';

export const LetterFromCEOMainContent = ({
  veergeRights,
  accountTerms,
  accountActivation,
  termination,
  yourResponsibilities,
  feesAndTaxes,
  confidentiality,
  limitationOfLiability,
  intellectualProperty,
  betaServices,
  feedback,
  privacyPolicy,
  modifications,
  generalConditions,
}) => {
  return (
    <Stack fontFamily="Euclid Circular B" pb="86px">
      <Box>
        <Text
          textTransform={'uppercase'}
          color="#000"
          fontSize="32px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="600"
          lineHeight="normal"
          letterSpacing="3.84px"
        >
          A LETTER FROM OUR CEO
        </Text>
        <Text
          color="#606060"
          fontSize="14px"
          fontFamily="Euclid Circular B"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="normal"
          mt="15px"
        >
          Published: November 1, 2022
        </Text>
      </Box>
      <Stack spacing={'20px'} mt="30px">
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
       {`   As I expressed in the letter when I assumed the position of CEO, "This is not a
          conventional company. We do not intend to become one." In line with that, we also
          emphasized the need to constantly strive for more and pursue important and meaningful
          endeavors with the resources at our disposal. We have always believed that over time,
          companies tend to become complacent, merely making incremental changes.`}
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          However, in the technology industry, where revolutionary ideas drive significant growth,
          it is crucial to embrace discomfort in order to stay relevant. While our company is
          currently performing well, we believe we can make it even more transparent, ethical, and
          accountable.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Today, I am filled with various emotions—pride, nostalgia, and a heavy heart. But above
          all, I am overwhelmed with a deep sense of gratitude. For years, I have harbored a dream
          of establishing a unique company, one with the potential to improve lives. Therefore, we
          are embarking on a new venture called Myxellia, and I am truly thrilled to lead it as CEO.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          It feels like just yesterday when I first walked through the doors of this company as the
          product lead, marking the beginning of a remarkable journey. Not only for me but for many
          of us.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Who could have imagined the countless incredible products we have collectively built for
          other companies? Yet, these achievements do not define our true success. Now, we are
          embarking on a journey to revolutionize how millions of people access investment in real
          estate and finance, thereby positively transforming lives and communities across the
          world.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          When I reflect on what we stand for, I am reminded of how our mission, values, and guiding
          principles are about to manifest in reality. Many of you know that my intention was to
          establish a company that differentiates itself by striking a balance between profitability
          and social consciousness, compassion and rigor, and love and responsibility. We can only
          achieve this through your creativity, hard work, and the love you pour into the company,
          making it widely embraced and respected.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          As we prepare for this rebirth, I humbly urge everyone not to lose sight of what truly
          matters: our fellow partners and our customers. In every weekly leadership meeting and
          daily engineering meetings, I have always imagined two empty chairs in the room—one for a
          partner and one for a customer.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          When faced with a decision, I ask myself if the choice would make both of them proud. As a
          new company, I implore all of you to continue this tradition and let that answer guide us.
          I promise that these two chairs will serve us and the company well.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Please remember that Myxellia will thrive when our products are inclusive and accessible
          to everyone. Let us remain true to our purpose while also fostering innovation around it.
          We must never embrace the status quo. Instead, let us possess the curiosity to explore
          uncharted territories and the courage to push for reinvention. Change is inevitable, and
          the world has become more fragile since we first embarked on this journey.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          Amidst the chaos, let us strive to listen with empathy, respond with kindness, and perform
          through the lens of humanity. We must not be mere bystanders; rather, we must take
          responsibility for what we witness and hear. No person or company is perfect, so we will
          learn from mistakes and practice forgiveness for ourselves and others. And when we achieve
          our goals, let us not forget that success is most meaningful when shared.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="300">
          However, success is never a given; it must be earned every day through hard work and
          teamwork. If we strive to be the best version of ourselves and bring out the best in
          others, our dreams will manifest repeatedly, and our mission, values, and guiding
          principles will endure.These values are of utmost importance to everything we do. I will
          continue to lead as a true servant leader as this esteemed company embarks on its next
          chapter.
        </Text>
        <Text color="#000" fontSize="16px" fontStyle="normal" fontWeight="600">
          {'-Ahmed Ibraheem'}
        </Text>
      </Stack>
    </Stack>
  );
};

export default LetterFromCEOMainContent;
